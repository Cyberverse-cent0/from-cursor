"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getButtonConfig } from "@/components/ui/button-icons";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  action: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

export function AnimatedButton({
  action,
  size = "lg",
  className,
  href,
  onClick,
  loading = false,
  disabled = false,
  asChild = false,
  children,
}: AnimatedButtonProps) {
  const config = getButtonConfig(action);
  
  if (!config) {
    console.warn(`No configuration found for action: ${action}`);
    return null;
  }

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const backgroundX = useSpring(useTransform(mouseX, (x) => x / 2));
  const backgroundY = useSpring(useTransform(mouseY, (y) => y / 2));

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const buttonContent = (
    <motion.div
      className="relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 100px at ${backgroundX}px ${backgroundY}px, rgba(255,255,255,0.3), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex items-center gap-2">
        <config.icon className="w-4 h-4" />
        <span>{config.label}</span>
        {config.secondaryIcon && (
          <config.secondaryIcon className="w-3 h-3 opacity-70" />
        )}
      </div>
      
      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: [0, 1.5, 2], opacity: [0.5, 0.3, 0] }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );

  return (
    <motion.div
      className="inline-block"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Button
        variant={config.variant}
        size={size}
        className={cn(
          "relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300",
          "before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100 before:bg-gradient-to-r before:from-white/10 before:to-transparent",
          className
        )}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
        asChild={asChild && !!href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {buttonContent}
      </Button>
    </motion.div>
  );
}

interface AnimatedButtonGroupProps {
  actions: string[];
  direction?: "row" | "column";
  size?: "default" | "sm" | "lg";
  className?: string;
  staggerDelay?: number;
}

export function AnimatedButtonGroup({
  actions,
  direction = "row",
  size = "lg",
  className,
  staggerDelay = 0.1,
}: AnimatedButtonGroupProps) {
  return (
    <motion.div
      className={cn(
        "flex gap-4",
        direction === "column" ? "flex-col" : "flex-col sm:flex-row",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {actions.map((action, index) => (
        <motion.div
          key={action}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            },
          }}
        >
          <AnimatedButton action={action} size={size} />
        </motion.div>
      ))}
    </motion.div>
  );
}
