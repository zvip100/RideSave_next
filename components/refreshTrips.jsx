"use client";

import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RefreshTrips() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <button onClick={handleRefresh}>
      <RefreshCwIcon className="w-6 h-6 hover:rotate-180 transition-transform duration-300" />
    </button>
  );
}
