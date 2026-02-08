import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-warm-800 text-white hover:bg-warm-700 focus-visible:ring-warm-500",
  secondary:
    "bg-warm-100 text-warm-800 hover:bg-warm-200 focus-visible:ring-warm-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
