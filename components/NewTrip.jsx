"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet } from "@/components/ui";
import TripForm from "@/components/forms/TripForm";
import { createTrip } from "@/lib/actions/trips";
import useToastStore from "@/store/toastStore";

export default function NewTrip() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { success, error } = useToastStore();

  const handleSuccess = (data) => {
    setIsOpen(false);
    success("Trip created successfully");

    // Refresh the page to show the new trip
    router.refresh();
  };

  const handleError = (e) => {
    console.error(e);
    error("Failed to create trip");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 py-2.5 px-5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3v10M3 8h10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        New Trip
      </button>

      <Sheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add New Trip"
        description="Fill in the trip details below"
        width="lg"
      >
        <TripForm
          serverAction={createTrip}
          onSuccess={handleSuccess}
          onError={handleError}
          onCancel={() => setIsOpen(false)}
        />
      </Sheet>
    </>
  );
}
