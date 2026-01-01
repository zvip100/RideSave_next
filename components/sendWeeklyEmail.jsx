"use client";

import { useState } from "react";
import { MailIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendWeeklyReport } from "@/lib/actions/email";
import useToastStore from "@/store/toastStore";
import { cn } from "@/lib/utils";

export default function SendWeeklyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToastStore();

  const handleClick = async () => {
    setIsLoading(true);
    const result = await sendWeeklyReport();
    setIsLoading(false);

    if (result.success) {
      success(result.message);
    } else {
      error("Failed to send email");
    }
  };

  return (
    <Button
      size="sm"
      className={cn("gap-2 ml-4 min-w-[155px]", {
        "cursor-not-allowed": isLoading,
      })}
      onClick={handleClick}
      disabled={isLoading}
    >
      <Icon isLoading={isLoading} />
      {isLoading ? "Sending..." : "Send Weekly Email"}
    </Button>
  );
}

const Icon = ({ isLoading }) => {
  return isLoading ? (
    <Loader2 className="w-4 h-4 animate-spin" />
  ) : (
    <MailIcon className="w-4 h-4" />
  );
};
