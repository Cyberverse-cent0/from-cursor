#!/usr/bin/env python3
"""
Simple server launcher for Stephen Asatsa backend
"""

from app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=False)