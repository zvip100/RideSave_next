"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Toast({
  message,
  duration = 3000,
  position = "bottom-right",
  variant = "default",
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!isVisible) return null;

  const baseClasses =
    "fixed z-[100] px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right-2 fade-in duration-300";

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={cn(
        baseClasses,
        positionClasses[position],
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
