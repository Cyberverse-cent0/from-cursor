"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  Cookie, 
  Shield, 
  Check,
  X,
  ChevronUp
} from "lucide-react";

const CONSENT_COOKIE = "site_cookie_consent";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}

export function MinimalCookieManager() {
  const [showBadge, setShowBadge] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // Check for existing consent on mount
  useEffect(() => {
    const existingConsent = getCookie(CONSENT_COOKIE);
    
    if (existingConsent) {
      setHasConsented(true);
    } else {
      // Show badge after a short delay for better UX
      const timer = setTimeout(() => setShowBadge(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = useCallback((choice: "essential" | "all") => {
    setCookie(CONSENT_COOKIE, choice, 60 * 60 * 24 * 365); // 1 year
    setHasConsented(true);
    setShowBadge(false);
    setShowDropdown(false);
  }, []);

  // Don't show anything if user has consented
  if (hasConsented && !showBadge) {
    return null;
  }

  // Show settings dropdown if opened
  if (showDropdown) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-600" />
              <span className="font-semibold text-sm">Cookie Preferences</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDropdown(false)}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          <p className="text-xs text-gray-600 mb-4">
            We use essential cookies for site functionality and optional analytics to improve your experience.
          </p>

          <div className="space-y-2">
            <Button
              onClick={() => saveConsent("essential")}
              className="w-full justify-start text-sm h-8 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <Shield className="w-3 h-3 mr-2" />
              Essential only
            </Button>
            <Button
              onClick={() => saveConsent("all")}
              className="w-full justify-start text-sm h-8 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Check className="w-3 h-3 mr-2" />
              Accept all
            </Button>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100">
            <a 
              href="/privacy-cookies" 
              className="text-xs text-amber-600 hover:text-amber-700 underline"
            >
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show minimal corner badge
  if (showBadge) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowDropdown(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
          size="sm"
        >
          <Cookie className="w-5 h-5" />
        </Button>
        <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Cookies
        </div>
      </div>
    );
  }

  return null;
}
