import { create } from "zustand";

const useToastStore = create((set, get) => ({
  toasts: [], // Array of toast objects

  // Add a new toast
  addToast: (toastConfig) => {
    const id = crypto.randomUUID();

    const newToast = {
      id,
      message: '',
      duration: 3000,
      position: 'bottom-right',
      variant: 'default',
      className: '',
      ...toastConfig,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-remove after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, newToast.duration + 200); // Extra time for animation
    }

    return id;
  },

  // Remove a toast
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  // Clear all toasts
  clearAll: () => set({ toasts: [] }),

  // Convenience methods for different toast types
  success: (message, options = {}) => get().addToast({
    message,
    variant: 'success',
    ...options,
  }),

  error: (message, options = {}) => get().addToast({
    message,
    variant: 'error',
    ...options,
  }),

  warning: (message, options = {}) => get().addToast({
    message,
    variant: 'warning',
    ...options,
  }),

  info: (message, options = {}) => get().addToast({
    message,
    variant: 'info',
    ...options,
  }),

  // Basic toast (uses your existing Toast styling)
  show: (message, options = {}) => get().addToast({
    message,
    ...options,
  }),
}));

export default useToastStore;