"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { getButtonConfig, ActionButtonConfig } from "@/components/ui/button-icons";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  action: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  showDescription?: boolean;
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  iconOnly?: boolean;
}

export function ActionButton({
  action,
  size = "lg",
  className,
  href,
  onClick,
  showDescription = false,
  loading = false,
  disabled = false,
  asChild = false,
  iconOnly = false,
}: ActionButtonProps) {
  const config = getButtonConfig(action);
  
  if (!config) {
    console.warn(`No configuration found for action: ${action}`);
    return null;
  }

  const buttonContent = (
    <>
      {iconOnly ? (
        <config.icon className="w-5 h-5" />
      ) : (
        <>
          <config.icon className="w-4 h-4" />
          <span>{config.label}</span>
          {config.secondaryIcon && (
            <config.secondaryIcon className="w-3 h-3 opacity-70" />
          )}
        </>
      )}
    </>
  );

  const buttonElement = (
    <Button
      variant={config.variant}
      size={size}
      className={cn(
        "relative overflow-hidden group",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]",
        "after:absolute after:inset-0 after:shadow-inner after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300",
        className
      )}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      asChild={asChild && !!href}
    >
      {buttonContent}
    </Button>
  );

  if (href && !asChild) {
    return (
      <a href={href} className="inline-block">
        {buttonElement}
      </a>
    );
  }

  return (
    <div className="space-y-2">
      {buttonElement}
      {showDescription && config.description && (
        <p className="text-sm text-muted-foreground text-center max-w-xs mx-auto">
          {config.description}
        </p>
      )}
    </div>
  );
}

interface ActionButtonGroupProps {
  actions: string[];
  direction?: "row" | "column";
  size?: "default" | "sm" | "lg";
  className?: string;
  showDescriptions?: boolean;
}

export function ActionButtonGroup({
  actions,
  direction = "row",
  size = "lg",
  className,
  showDescriptions = false,
}: ActionButtonGroupProps) {
  return (
    <div
      className={cn(
        "flex gap-4",
        direction === "column" ? "flex-col" : "flex-col sm:flex-row",
        className
      )}
    >
      {actions.map((action) => (
        <ActionButton
          key={action}
          action={action}
          size={size}
          showDescription={showDescriptions}
        />
      ))}
    </div>
  );
}
