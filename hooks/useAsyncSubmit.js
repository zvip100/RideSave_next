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
        setError(result.error);
        onError?.(new Error(result.error));
        return result;
      }

      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.message);
      onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}

