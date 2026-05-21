import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transform hover:scale-105 dark:from-primary/80 dark:to-primary dark:hover:from-primary dark:hover:to-primary/90 dark:shadow-primary/25",
        secondary: "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground hover:from-accent/90 hover:to-accent shadow-md hover:shadow-lg transform hover:scale-105 dark:from-accent/80 dark:to-accent dark:hover:from-accent dark:hover:to-accent/90 dark:shadow-accent/25",
        outline: "border-2 border-border bg-background/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-muted hover:to-muted/50 hover:border-primary/30 hover:shadow-md transform hover:scale-105 dark:bg-card/80 dark:border-border dark:hover:from-card dark:hover:to-muted dark:shadow-lg",
        ghost: "hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 hover:shadow-sm transform hover:scale-105 dark:hover:from-muted/30 dark:hover:to-muted/20 dark:shadow-md",
        scholar: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500/20 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 dark:shadow-blue-500/30",
        consultation: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 border border-emerald-400/20 dark:from-emerald-400 dark:to-teal-500 dark:hover:from-emerald-500 dark:hover:to-teal-600 dark:shadow-emerald-500/30",
        professional: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 border border-blue-400/20 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 dark:shadow-blue-500/30",
        academic: "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 border border-purple-400/20 dark:from-purple-500 dark:to-violet-500 dark:hover:from-purple-600 dark:hover:to-violet-600 dark:shadow-purple-500/30",
        organization: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg hover:shadow-rose-500/25 transform hover:scale-105 border border-rose-400/20 dark:from-rose-400 dark:to-pink-500 dark:hover:from-rose-500 dark:hover:to-pink-600 dark:shadow-rose-500/30",
      },
      size: {
        default: "h-11 px-6",
        lg: "h-12 px-8 text-base",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          </div>
        )}
        <div className={cn("flex items-center gap-2", loading && "opacity-0")}>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </div>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
