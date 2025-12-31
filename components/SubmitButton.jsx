"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  text = "Submit",
  pendingText = "Submitting...",
  pending,
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn("flex-1", pending && "cursor-not-allowed")}
    >
      {pending ? pendingText : text}
    </Button>
  );
}
