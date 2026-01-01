"use client";

import useToastStore from "@/store/toastStore";
import { Toast } from "@/components/ui";

export default function ToastWrapper() {
  const { toasts } = useToastStore();

  return (
    <>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          message={toast.message}
          duration={toast.duration}
          position={toast.position}
          variant={toast.variant}
          className={`${toast.className} ${index > 0 ? "mt-2" : ""}`}
        />
      ))}
    </>
  );
}
