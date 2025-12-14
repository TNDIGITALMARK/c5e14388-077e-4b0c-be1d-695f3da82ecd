"use client";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneButtonProps {
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function PhoneButton({
  variant = "default",
  size = "md",
  showText = true,
  className
}: PhoneButtonProps) {
  const phoneNumber = "+230 5989 1414";
  const telLink = "tel:+23059891414";

  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all";

  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg",
    accent: "bg-yellow-400 text-black hover:bg-yellow-500 shadow-md hover:shadow-lg",
    outline: "border-2 border-black text-black hover:bg-black hover:text-white"
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <a
      href={telLink}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      aria-label={`Call ${phoneNumber}`}
    >
      <Phone className={iconSizes[size]} />
      {showText && <span>{phoneNumber}</span>}
    </a>
  );
}
