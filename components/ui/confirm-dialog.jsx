"use client";

import { useEffect, useCallback } from "react";
import { Button } from "./button";

/**
 * ConfirmDialog - A centered modal dialog for confirmations
 *
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Callback when dialog should close
 * @param {string} question - The question to ask (default: "Are you sure?")
 * @param {string} description - Optional description text
 * @param {string} confirmText - Text for confirm button (default: "Yes")
 * @param {string} cancelText - Text for cancel button (default: "No")
 * @param {function} onConfirm - Callback when user confirms
 * @param {function} onCancel - Callback when user cancels
 * @param {boolean} destructive - Whether this is a destructive action (changes confirm button color)
 */
export default function ConfirmDialog({
  open,
  onClose,
  question = "Are you sure?",
  description,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  destructive = false,
}) {
  // Handle ESC key to close
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onCancel?.();
        onClose?.();
      }
    },
    [onCancel, onClose]
  );

  // Handle body scroll lock
  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, handleEscape]);

  // Handle confirm action
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose?.();
  }, [onConfirm, onClose]);

  // Handle cancel action
  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose?.();
  }, [onCancel, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative card rounded-lg shadow-xl shadow-black/50 max-w-sm w-full mx-4">
        {/* Content */}
        <div className="p-6">
          {/* Question */}
          <h3 className="text-lg font-semibold text-foreground text-center">
            {question}
          </h3>

          {/* Description */}
          {description && (
            <p className="mt-2 text-sm text-muted-foreground text-center">
              {description}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              {cancelText}
            </Button>
            <Button
              variant={destructive ? "destructive" : "default"}
              onClick={handleConfirm}
              className="flex-1"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
