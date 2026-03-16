"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import TripForm from "@/components/forms/TripForm";
import { Sheet } from "@/components/ui";
import { ConfirmDialog } from "@/components/ui";
import { updateTrip, deleteTrip } from "@/lib/actions/trips";
import useToastStore from "@/store/toastStore";

export default function TripActions({ tripId, fieldValues }) {
  const [action, setAction] = useState(null);
  const router = useRouter();
  const { success, error } = useToastStore();

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
      <div className="flex items-center gap-2">
        {/* Edit Button */}
        <button
          onClick={() => setAction("edit")}
          className="relative group/tooltip p-1.5 rounded-md hover:bg-secondary transition-colors"
          aria-label="Edit trip"
        >
          <Edit className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs rounded bg-popover text-popover-foreground shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            Edit
          </span>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setAction("delete")}
          className="relative group/tooltip p-1.5 rounded-md hover:bg-secondary transition-colors"
          aria-label="Delete trip"
        >
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs rounded bg-popover text-popover-foreground shadow-md opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
            Delete
          </span>
        </button>

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
