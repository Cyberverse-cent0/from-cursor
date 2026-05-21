#!/bin/bash

# Production Backend Health Monitor and Alert System
# This script monitors the backend service and sends alerts

set -e

# Configuration
SERVICE_NAME="stephenasatsa-backend"
PROJECT_PATH="/home/codecrafter/it-works-now-research-hub-implementation/apps/website/backend"
LOG_DIR="/var/log/stephenasatsa-backend"
HEALTH_LOG="$LOG_DIR/health-monitor.log"
ALERT_LOG="$LOG_DIR/alerts.log"
WEBHOOK_URL=""  # Configure for Slack/Discord notifications
EMAIL_RECIPIENT="admin@stephenasatsa.com"  # Configure email recipient
MAX_RESTART_ATTEMPTS=3
RESTART_COOLDOWN=300  # 5 minutes

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $HEALTH_LOG
}

# Function to log alerts
log_alert() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ALERT: $1" >> $ALERT_LOG
}

# Function to send alerts
send_alert() {
    local message="$1"
    local severity="$2"
    
    log_alert "$message"
    
    # Send email alert (configure mail command)
    if command -v mail &> /dev/null && [ -n "$EMAIL_RECIPIENT" ]; then
        echo "$message" | mail -s "[$severity] Backend Alert: $SERVICE_NAME" "$EMAIL_RECIPIENT"
    fi
    
    # Send webhook alert (configure for Slack/Discord)
    if [ -n "$WEBHOOK_URL" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\"}" \
            "$WEBHOOK_URL" 2>/dev/null || true
    fi
}

# Function to check service status
check_service_status() {
    if systemctl is-active --quiet $SERVICE_NAME; then
        log_message "Service is running"
        return 0
    else
        log_message "Service is not running"
        return 1
    fi
}

# Function to check health endpoint
check_health_endpoint() {
    local response
    response=$(curl -s -w "%{http_code}" -o /tmp/health_response.json http://localhost:5001/api/admin/health 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        log_message "Health endpoint responding correctly"
        return 0
    else
        log_message "Health endpoint failed with status: $response"
        return 1
    fi
}

# Function to check database connectivity
check_database() {
    if [ -f "$PROJECT_PATH/data/users.db" ]; then
        # Try to read from database
        if sudo -u www-data $PROJECT_PATH/venv/bin/python -c "
import sys
sys.path.append('$PROJECT_PATH')
try:
    from admin_session_manager import UserDatabase
    db = UserDatabase('$PROJECT_PATH/data/users.db')
    # Simple connectivity test
    conn = db._get_connection()
    db._return_connection(conn)
    print('Database connected')
except Exception as e:
    print(f'Database error: {e}')
    sys.exit(1)
" 2>/dev/null; then
            log_message "Database connectivity OK"
            return 0
        else
            log_message "Database connectivity failed"
            return 1
        fi
    else
        log_message "Database file not found"
        return 1
    fi
}

# Function to check system resources
check_system_resources() {
    local issues=0
    
    # Check memory usage
    local mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$mem_usage" -gt 90 ]; then
        log_message "High memory usage: ${mem_usage}%"
        issues=$((issues + 1))
    fi
    
    # Check disk space
    local disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 85 ]; then
        log_message "High disk usage: ${disk_usage}%"
        issues=$((issues + 1))
    fi
    
    # Check CPU load
    local load_avg=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
    if (( $(echo "$load_avg > 2.0" | bc -l) )); then
        log_message "High CPU load: $load_avg"
        issues=$((issues + 1))
    fi
    
    if [ $issues -eq 0 ]; then
        log_message "System resources OK"
        return 0
    else
        log_message "System resource issues detected: $issues"
        return 1
    fi
}

# Function to restart service
restart_service() {
    local restart_count_file="/tmp/${SERVICE_NAME}_restart_count"
    local last_restart_file="/tmp/${SERVICE_NAME}_last_restart"
    
    # Check cooldown period
    if [ -f "$last_restart_file" ]; then
        local last_restart=$(cat "$last_restart_file")
        local current_time=$(date +%s)
        if [ $((current_time - last_restart)) -lt $RESTART_COOLDOWN ]; then
            log_message "Restart cooldown active, skipping restart"
            return 1
        fi
    fi
    
    # Check restart count
    local restart_count=0
    if [ -f "$restart_count_file" ]; then
        restart_count=$(cat "$restart_count_file")
    fi
    
    if [ $restart_count -ge $MAX_RESTART_ATTEMPTS ]; then
        send_alert "Maximum restart attempts ($MAX_RESTART_ATTEMPTS) reached for $SERVICE_NAME. Manual intervention required." "CRITICAL"
        return 1
    fi
    
    log_message "Attempting to restart service (attempt $((restart_count + 1))/$MAX_RESTART_ATTEMPTS)"
    systemctl restart $SERVICE_NAME
    
    # Update counters
    echo $((restart_count + 1)) > "$restart_count_file"
    echo $(date +%s) > "$last_restart_file"
    
    # Wait for service to start
    sleep 10
    
    if systemctl is-active --quiet $SERVICE_NAME; then
        log_message "Service restarted successfully"
        # Reset counter on successful restart
        rm -f "$restart_count_file"
        return 0
    else
        log_message "Service restart failed"
        return 1
    fi
}

# Function to check log file sizes
check_log_sizes() {
    local log_size_limit=104857600  # 100MB
    
    for log_file in "$LOG_DIR"/*.log; do
        if [ -f "$log_file" ]; then
            local size=$(stat -f%z "$log_file" 2>/dev/null || stat -c%s "$log_file" 2>/dev/null || echo 0)
            if [ "$size" -gt $log_size_limit ]; then
                log_message "Log file $(basename "$log_file") is large: ${size} bytes"
                # Rotate log file
                mv "$log_file" "${log_file}.old"
                touch "$log_file"
                chown www-data:www-data "$log_file"
                log_message "Log file rotated: $(basename "$log_file")"
            fi
        fi
    done
}

# Main monitoring function
run_health_check() {
    local issues=0
    
    print_info "Running comprehensive health check for $SERVICE_NAME"
    
    # Check service status
    if ! check_service_status; then
        issues=$((issues + 1))
        if ! restart_service; then
            send_alert "Service $SERVICE_NAME failed to restart after multiple attempts" "CRITICAL"
        fi
    fi
    
    # Check health endpoint
    if ! check_health_endpoint; then
        issues=$((issues + 1))
        if systemctl is-active --quiet $SERVICE_NAME; then
            log_message "Service running but health endpoint failed, attempting restart"
            restart_service
        fi
    fi
    
    # Check database
    if ! check_database; then
        issues=$((issues + 1))
        send_alert "Database connectivity issues detected for $SERVICE_NAME" "WARNING"
    fi
    
    # Check system resources
    if ! check_system_resources; then
        issues=$((issues + 1))
        send_alert "System resource issues detected (high memory/disk/CPU)" "WARNING"
    fi
    
    # Check log sizes
    check_log_sizes
    
    # Generate health report
    local status="HEALTHY"
    if [ $issues -gt 0 ]; then
        status="ISSUES DETECTED"
    fi
    
    log_message "Health check completed: $status (issues: $issues)"
    
    return $issues
}

# Function to generate daily report
generate_daily_report() {
    local report_date=$(date +%Y-%m-%d)
    local report_file="$LOG_DIR/daily-report-$report_date.log"
    
    echo "Daily Health Report - $report_date" > "$report_file"
    echo "=================================" >> "$report_file"
    echo "" >> "$report_file"
    
    # Service status
    echo "Service Status: $(systemctl is-active $SERVICE_NAME)" >> "$report_file"
    echo "Service Uptime: $(systemctl show $SERVICE_NAME -p ActiveEnterTime --value)" >> "$report_file"
    echo "" >> "$report_file"
    
    # System resources
    echo "System Resources:" >> "$report_file"
    echo "Memory Usage: $(free | awk 'NR==2{printf "%.1f%%", $3*100/$2}')" >> "$report_file"
    echo "Disk Usage: $(df / | awk 'NR==2 {print $5}')" >> "$report_file"
    echo "CPU Load: $(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')" >> "$report_file"
    echo "" >> "$report_file"
    
    # Recent alerts
    echo "Recent Alerts (last 24 hours):" >> "$report_file"
    if [ -f "$ALERT_LOG" ]; then
        grep "$(date +%Y-%m-%d)" "$ALERT_LOG" | tail -10 >> "$report_file"
    else
        echo "No alerts found" >> "$report_file"
    fi
    
    log_message "Daily report generated: $report_file"
}

# Main execution
case "${1:-check}" in
    "check")
        run_health_check
        ;;
    "report")
        generate_daily_report
        ;;
    "status")
        echo "Service: $SERVICE_NAME"
        echo "Status: $(systemctl is-active $SERVICE_NAME)"
        echo "Health: $(check_health_endpoint && echo "OK" || echo "FAILED")"
        echo "Database: $(check_database && echo "OK" || echo "FAILED")"
        ;;
    "restart-count")
        local count_file="/tmp/${SERVICE_NAME}_restart_count"
        if [ -f "$count_file" ]; then
            echo "Restart count: $(cat "$count_file")"
        else
            echo "Restart count: 0"
        fi
        ;;
    "reset-counters")
        rm -f "/tmp/${SERVICE_NAME}_restart_count" "/tmp/${SERVICE_NAME}_last_restart"
        log_message "Restart counters reset"
        ;;
    *)
        echo "Usage: $0 {check|report|status|restart-count|reset-counters}"
        echo "  check         - Run comprehensive health check"
        echo "  report        - Generate daily health report"
        echo "  status        - Show current service status"
        echo "  restart-count - Show restart attempt count"
        echo "  reset-counters- Reset restart counters"
        exit 1
        ;;
esac
