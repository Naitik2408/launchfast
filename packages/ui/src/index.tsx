import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Button Primitive
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      outline: "border border-neutral-300 text-neutral-800 hover:bg-neutral-50",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      ghost: "text-neutral-700 hover:bg-neutral-100",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-md",
      md: "h-10 px-4 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// 2. Card Primitive
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

// 3. Badge Primitive
export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning";
}) {
  const badgeVariants = {
    default: "bg-neutral-100 text-neutral-800 border-neutral-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}
