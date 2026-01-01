"use client";

import { useState } from 'react';

export function useAsyncSubmit(submitFn, onSuccess, onError) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitFn(...args);

      if (result && typeof result === 'object' && result.success === false) {
        setError(result?.error);
        onError?.(result?.error);
        return result?.error;
      }

      onSuccess?.(result?.data);
      return result?.data;
    } catch (err) {
      setError(err?.message || "An unknown error occurred");
      onError?.(err?.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}

