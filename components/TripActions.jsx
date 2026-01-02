"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import TripForm from "@/components/forms/TripForm";
import { Sheet } from "@/components/ui";
import { ConfirmDialog } from "@/components/ui";
import { updateTrip, deleteTrip } from "@/lib/actions/trips";
import useToastStore from "@/store/toastStore";

export default function TripActions({
  tripId,
  fieldValues,
  externalIsOpen,
  onOpenChange,
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [action, setAction] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const { success, error } = useToastStore();

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

  const toggleMenu = () => {
    if (isOpen) {
      // Modal is open, close it
      closeModal();
    } else {
      // Modal is closed, open it via internal state
      setInternalIsOpen(true);
    }
  };

  const handleEditClick = () => {
    closeModal();
    setAction("edit");
  };

  const handleDeleteClick = () => {
    closeModal();
    setAction("delete");
  };

  const handleEditSuccess = () => {
    setAction(null);
    success("Trip updated successfully");
    router.refresh();
  };

  const handleEditError = (e) => {
    console.error(e);
    error("Failed to update trip");
  };

  const handleDeleteConfirm = async () => {
    setAction(null);

    const result = await deleteTrip(tripId);

    if (result?.success) {
      success("Trip deleted successfully");
      router.refresh();
    } else {
      error("Failed to delete trip");
    }
  };

  return (
    <>
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
            className="absolute right-0 top-full mt-1 z-50 min-w-[140px] card rounded-lg shadow-lg py-1 animate-in slide-in-from-top-1 fade-in duration-150"
          >
            <button
              onClick={handleEditClick}
              className="w-full px-3 py-2 text-left text-sm hover:bg-secondary/50 transition-colors flex-row gap-2 text-foreground"
            >
              <Edit className="w-4 h-4" />
              Edit Trip
            </button>
            <button
              onClick={handleDeleteClick}
              className="w-full px-3 py-2 text-left text-sm hover:bg-secondary/50 transition-colors flex-row gap-2 text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Delete Trip
            </button>
          </div>
        )}

        {/* Edit Sheet */}
        {action === "edit" && (
          <Sheet
            open={action === "edit"}
            onClose={() => setAction(null)}
            title="Edit Trip"
            description="Edit the trip details below"
            width="lg"
          >
            <TripForm
              fieldValues={fieldValues}
              serverAction={updateTrip}
              onSuccess={handleEditSuccess}
              onError={handleEditError}
              onCancel={() => setAction(null)}
              tripId={tripId}
            />
          </Sheet>
        )}

        {/* Confirm Dialog */}
        {action === "delete" && (
          <ConfirmDialog
            open={true}
            onClose={() => setAction(null)}
            question="Are you sure you want to delete this trip?"
            description="This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDeleteConfirm}
            onCancel={() => setAction(null)}
          />
        )}
      </div>
    </>
  );
}
