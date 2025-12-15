"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Toast } from "@/components/ui";

export default function TripActionsMenu({
  tripId,
  onEdit,
  onDelete,
  externalIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Determine if modal should be open
  // Priority: external control > internal control
  const isOpen = externalIsOpen || internalIsOpen;

  const closeModal = () => {
    if (externalIsOpen && onOpenChange) {
      // Close via external control if it's externally opened
      onOpenChange();
    }
    // Always reset internal state
    setInternalIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, externalIsOpen, onOpenChange]);

  const handleEdit = () => {
    setToastMessage("Edit action triggered!");
    closeModal();
    // Simulate action feedback
    setTimeout(() => {
      setToastMessage(null);
      onEdit?.(tripId);
    }, 1000);
  };

  const handleDelete = () => {
    setToastMessage("Delete action triggered!");
    closeModal();
    // Simulate action feedback
    setTimeout(() => {
      setToastMessage(null);
      onDelete?.(tripId);
    }, 1000);
  };

  const toggleMenu = () => {
    if (isOpen) {
      // Modal is open, close it
      closeModal();
    } else {
      // Modal is closed, open it via internal state
      setInternalIsOpen(true);
    }
  };

  return (
    <div className="relative">
      {/* Action Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="group p-2 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Trip actions"
      >
        <MoreHorizontal className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 z-50 min-w-[140px] bg-card border border-border rounded-lg shadow-lg py-1 animate-in slide-in-from-top-1 fade-in duration-150"
        >
          <button
            onClick={handleEdit}
            className="w-full px-3 py-2 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2 text-foreground"
          >
            <Edit className="w-4 h-4" />
            Edit Trip
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-2 text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete Trip
          </button>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
