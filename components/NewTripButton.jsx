"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, Toast } from "@/components/ui";
import TripForm from "@/components/forms/TripForm";

export default function NewTripButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const router = useRouter();

  const handleSuccess = (data) => {
    setIsOpen(false);
    setToastMessage("Trip created successfully");

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);

    // Refresh the page to show the new trip
    router.refresh();
  };

  return (
    <>
      {toastMessage && <Toast message={toastMessage} />}

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
        <TripForm onSuccess={handleSuccess} onCancel={() => setIsOpen(false)} />
      </Sheet>
    </>
  );
}
