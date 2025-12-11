"use client";

import { useState } from "react";
import { Sheet } from "@/components/ui";

export default function NewTripButton() {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* TODO: Add trip form here */}
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Trip form coming soon...
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-primary text-primary-foreground text-lg font-medium rounded-lg hover:bg-primary-hover transition-colors py-2 px-4"
          >
            Save Trip
          </button>
        </div>
      </Sheet>
    </>
  );
}
