import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-accent-primary text-bg-primary
    hover:bg-accent-secondary
    shadow-[0_0_20px_rgba(34,211,238,0.3)]
    hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]
  `,
  secondary: `
    bg-transparent text-fg-primary
    border border-border-default
    hover:border-accent-primary hover:text-accent-primary
  `,
  ghost: `
    bg-transparent text-fg-secondary
    hover:text-fg-primary
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "font-medium rounded-full",
          "transition-all duration-300 ease-out",
          "cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
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

