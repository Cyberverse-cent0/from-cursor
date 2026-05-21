#!/bin/bash

# Single Domain Deployment Script
# This script sets up the application for single domain deployment

set -e

echo "🚀 Single Domain Deployment Setup"
echo "=================================="

# Configuration
DOMAIN="stephenasatsa.com"
PROJECT_PATH="/home/codecrafter/it-works-now-research-hub-implementation/apps/website"
NGINX_CONFIG="/etc/nginx/sites-available/stephenasatsa.com"
NGINX_ENABLED="/etc/nginx/sites-enabled/stephenasatsa.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

echo "📋 Configuration Summary:"
echo "   Domain: $DOMAIN"
echo "   Frontend: https://$DOMAIN"
echo "   Backend API: https://$DOMAIN/api"
echo "   Admin Panel: https://$DOMAIN/admin"
echo ""

# Step 1: Update environment files
echo "🔧 Updating environment configuration..."
cp "$PROJECT_PATH/.env.production" "$PROJECT_PATH/.env"
print_status "Environment configuration updated"

# Step 2: Install nginx configuration
echo "🌐 Installing nginx configuration..."
if [ -f "$NGINX_CONFIG" ]; then
    echo "Backing up existing nginx config..."
    cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
fi

cp "$PROJECT_PATH/nginx/single-domain-nginx.conf" "$NGINX_CONFIG"

# Enable the site
if [ ! -L "$NGINX_ENABLED" ]; then
    ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
    print_status "Nginx site enabled"
else
    print_warning "Nginx site already enabled"
fi

# Step 3: Test nginx configuration
echo "🧪 Testing nginx configuration..."
if nginx -t; then
    print_status "Nginx configuration is valid"
else
    print_error "Nginx configuration has errors"
    exit 1
fi

# Step 4: Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx
print_status "Nginx reloaded"

# Step 5: Setup SSL with Let's Encrypt
echo "🔒 Setting up SSL certificate..."
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    apt-get update
    apt-get install -y certbot python3-certbot-nginx
fi

# Request SSL certificate
if certbot certificates | grep -q "$DOMAIN"; then
    print_warning "SSL certificate already exists for $DOMAIN"
else
    echo "Requesting SSL certificate..."
    certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email admin@"$DOMAIN"
    print_status "SSL certificate obtained"
fi

# Step 6: Setup firewall
echo "🔥 Configuring firewall..."
if ! command -v ufw &> /dev/null; then
    echo "Installing ufw..."
    apt-get install -y ufw
fi

# Configure firewall rules
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
print_status "Firewall configured"

# Step 7: Setup log rotation
echo "📋 Setting up log rotation..."
cat > /etc/logrotate.d/stephenasatsa << EOF
/var/log/nginx/stephenasatsa.com.*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data adm
    postrotate
        systemctl reload nginx > /dev/null 2>&1 || true
    endscript
}
EOF
print_status "Log rotation configured"

# Step 8: Create monitoring script
echo "📊 Setting up monitoring..."
cat > /usr/local/bin/monitor-stephenasatsa.sh << 'EOF'
#!/bin/bash

# Monitor Stephen Asatsa website
DOMAIN="stephenasatsa.com"
LOG_FILE="/var/log/stephenasatsa-monitor.log"

# Check frontend
if curl -s -f "https://$DOMAIN/health" > /dev/null; then
    echo "$(date): Frontend OK" >> $LOG_FILE
else
    echo "$(date): Frontend DOWN" >> $LOG_FILE
fi

# Check backend API
if curl -s -f "https://$DOMAIN/api/admin/health" > /dev/null; then
    echo "$(date): Backend API OK" >> $LOG_FILE
else
    echo "$(date): Backend API DOWN" >> $LOG_FILE
fi

# Check nginx status
if systemctl is-active --quiet nginx; then
    echo "$(date): Nginx OK" >> $LOG_FILE
else
    echo "$(date): Nginx DOWN" >> $LOG_FILE
fi
EOF

chmod +x /usr/local/bin/monitor-stephenasatsa.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "*/5 * * * * /usr/local/bin/monitor-stephenasatsa.sh") | crontab -
print_status "Monitoring configured"

# Step 9: Final verification
echo "🔍 Final verification..."
echo "Testing frontend..."
if curl -s -f "https://$DOMAIN/health" > /dev/null; then
    print_status "Frontend accessible"
else
    print_warning "Frontend may not be accessible yet (DNS propagation)"
fi

echo "Testing backend API..."
if curl -s -f "https://$DOMAIN/api/admin/health" > /dev/null; then
    print_status "Backend API accessible"
else
    print_warning "Backend API may not be accessible yet (DNS propagation)"
fi

echo ""
echo "🎉 Single Domain Deployment Complete!"
echo "===================================="
echo "Domain: https://$DOMAIN"
echo "API: https://$DOMAIN/api"
echo "Admin: https://$DOMAIN/admin"
echo ""
echo "Next steps:"
echo "1. Ensure DNS points to this server"
echo "2. Wait for SSL certificate to activate"
echo "3. Test all functionality"
echo "4. Monitor logs: tail -f /var/log/nginx/stephenasatsa.com.error.log"
echo ""
print_status "Deployment completed successfully!"
