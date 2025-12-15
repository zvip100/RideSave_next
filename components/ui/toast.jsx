"use client";

import { useEffect, useState } from "react";

export default function Toast({
  message,
  duration = 3000,
  position = "bottom-right",
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

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-right-2 fade-in duration-300 ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
