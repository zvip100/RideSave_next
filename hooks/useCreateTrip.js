"use client";

import { useState } from "react";

export function useCreateTrip() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTrip = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create trip");
      }

      const result = await response.json();
      setIsLoading(false);
      return { success: true, data: result.data };
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    createTrip,
    isLoading,
    error,
  };
}

