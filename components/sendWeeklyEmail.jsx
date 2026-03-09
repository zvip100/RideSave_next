"use client";

import { useState, useRef, useEffect } from "react";
import { MailIcon, Loader2, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Label } from "@/components/ui/label";
import { sendWeeklyReport } from "@/lib/actions/email";
import useToastStore from "@/store/toastStore";
import { cn } from "@/lib/utils";

export default function SendWeeklyEmail({ user: { name, unit } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const popoverRef = useRef(null);
  const { success, error } = useToastStore();

  const clearDates = () => {
    setStartDate("");
    setEndDate("");
  };

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowDatePicker(false);
        clearDates();
      }
    };
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDatePicker]);

  const handleSend = async (clearDatesAfterSend = false) => {
    setIsLoading(true);
    const result = await sendWeeklyReport(
      name,
      unit,
      startDate || null,
      endDate || null,
    );
    setIsLoading(false);

    if (result.success) {
      success(result.message);
    } else {
      error("Failed to send email");
    }

    if (clearDatesAfterSend) {
      clearDates();
    }
  };

  const hasCustomDates = startDate || endDate;

  return (
    <div className="relative" ref={popoverRef}>
      <div className="flex items-center">
        {/* Main send button */}
        <Button
          size="sm"
          className={cn("gap-2 min-w-[155px] rounded-r-none", {
            "cursor-not-allowed": isLoading,
          })}
          onClick={handleSend}
          disabled={isLoading}
        >
          <Icon isLoading={isLoading} />
          {isLoading ? "Sending..." : "Send Weekly Email"}
        </Button>

        {/* Date toggle button */}
        <Button
          size="sm"
          className={cn(
            "px-2 rounded-l-none border-l border-l-white/20",
            hasCustomDates && "bg-primary/80",
          )}
          onClick={() => setShowDatePicker((prev) => !prev)}
          disabled={isLoading}
          title="Choose date range"
        >
          <CalendarIcon className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Date range popover */}
      {showDatePicker && (
        <div className="absolute right-0 top-full mt-2 z-50 card rounded-lg shadow-xl shadow-black/30 p-4 w-[280px] space-y-3">
          <p className="text-sm font-medium">Custom Date Range</p>

          <div className="space-y-1.5">
            <Label htmlFor="report-start">Start Date</Label>
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              className="w-full"
              requireTime={false}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="report-end">End Date</Label>
            <DateTimePicker
              value={startDate}
              onChange={setEndDate}
              className="w-full"
              requireTime={false}
            />
          </div>

          <div className="flex justify-between pt-1">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={() => {
                clearDates();
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="text-xs"
              onClick={() => {
                setShowDatePicker(false);
                handleSend(true);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const Icon = ({ isLoading }) => {
  return isLoading ? (
    <Loader2 className="w-4 h-4 animate-spin" />
  ) : (
    <MailIcon className="w-4 h-4" />
  );
};
