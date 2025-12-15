"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DateTimePicker({ value, onChange, className, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Get EST/EDT time for defaults
  const getESTDate = () => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
  };

  const estNow = getESTDate();

  const [selectedDate, setSelectedDate] = React.useState(
    value ? new Date(value) : estNow
  );
  const [viewDate, setViewDate] = React.useState(
    value ? new Date(value) : estNow
  );
  const [time, setTime] = React.useState(() => {
    if (value) return new Date(value).toTimeString().slice(0, 5);
    return ""; // No default time
  });
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const containerRef = React.useRef(null);
  const timeInputRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDisplayDate = () => {
    if (!selectedDate || !time) return "Select Time";
    const date = new Date(selectedDate);
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isDateInFuture = (day) => {
    const checkDate = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      day
    );
    const today = getESTDate();
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate > today;
  };

  const isTimeInFuture = () => {
    const testDate = new Date(selectedDate);
    const [hours, minutes] = time.split(":");
    testDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return testDate > getESTDate();
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

    // If time is set, use it; otherwise set to noon
    if (time) {
      const [hours, minutes] = time.split(":");
      newDate.setHours(parseInt(hours), parseInt(minutes));
    } else {
      newDate.setHours(12, 0, 0, 0); // Default to noon if no time selected
    }

    // Check if selected date with time is in the future
    const estNow = getESTDate();
    if (newDate > estNow) {
      // If future, set to current EST time
      setSelectedDate(estNow);
      setTime(estNow.toTimeString().slice(0, 5));
      const isoString = estNow.toISOString().slice(0, 16);
      onChange?.(isoString);
      return;
    }

    setSelectedDate(newDate);

    // Only set the ISO string if we have a valid time
    if (time) {
      const isoString = newDate.toISOString().slice(0, 16);
      onChange?.(isoString);
    }
  };

  const handleTimeChange = (hours, minutes) => {
    const newTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    setTime(newTime);

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours), parseInt(minutes));

      // Check if the new date-time is in the future
      const estNow = getESTDate();
      if (newDate > estNow) {
        // Don't allow future time
        return;
      }

      const isoString = newDate.toISOString().slice(0, 16);
      onChange?.(isoString);
    }
  };

  const handleManualTimeChange = (e) => {
    const newTime = e.target.value;
    setTime(newTime);
  };

  const handleManualTimeBlur = (e) => {
    const newTime = e.target.value;

    if (selectedDate && newTime) {
      const [hours, minutes] = newTime.split(":");
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours), parseInt(minutes));

      // Check if the new date-time is in the future
      const estNow = getESTDate();
      if (newDate > estNow) {
        // Reset to current time
        const currentTime = estNow.toTimeString().slice(0, 5);
        setTime(currentTime);
        onChange?.(currentTime);
        return;
      }

      const isoString = newDate.toISOString().slice(0, 16);
      onChange?.(isoString);
    }
  };

  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === viewDate.getMonth() &&
        selectedDate.getFullYear() === viewDate.getFullYear();

      const estNow = getESTDate();
      const isToday =
        estNow.getDate() === day &&
        estNow.getMonth() === viewDate.getMonth() &&
        estNow.getFullYear() === viewDate.getFullYear();

      // Check if this day is in the future
      const dayDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day
      );
      const isFuture =
        dayDate >
        new Date(estNow.getFullYear(), estNow.getMonth(), estNow.getDate());

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isFuture && handleDateSelect(day)}
          disabled={isFuture}
          className={cn(
            "h-9 w-9 text-sm rounded-md transition-colors",
            !isFuture && "hover:bg-primary/20",
            isSelected && "bg-primary text-primary-foreground hover:bg-primary",
            !isSelected && isToday && "border border-primary",
            isFuture && "opacity-30 cursor-not-allowed",
            "flex items-center justify-center"
          )}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div ref={containerRef} className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm",
          "hover:bg-secondary transition-colors text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          !time ? "text-muted-foreground" : "text-foreground"
        )}
      >
        <span className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-muted-foreground"
          >
            <rect
              x="2"
              y="3"
              width="12"
              height="11"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M2 6h12M5 1v2M11 1v2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {formatDisplayDate()}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Centered Picker */}
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] rounded-lg border border-border bg-card p-4 shadow-xl">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={previousMonth}
                className="h-8 w-8 rounded-md hover:bg-secondary flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="font-semibold text-sm">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="h-8 w-8 rounded-md hover:bg-secondary flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="h-9 flex items-center justify-center text-xs text-muted-foreground font-medium"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {renderCalendar()}
            </div>

            {/* Time Picker */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs">Time</Label>
                <button
                  type="button"
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  className="text-xs text-primary hover:underline"
                >
                  {showTimePicker ? "Hide" : "Show"} Picker
                </button>
              </div>

              {showTimePicker ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* Hours (12-hour format with AM/PM) */}
                  <div>
                    <Label className="text-xs mb-2 block text-muted-foreground">
                      Hour
                    </Label>
                    <div className="h-40 overflow-y-auto border border-border rounded-md custom-scrollbar">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour24) => {
                        const [currentHour] = time.split(":");
                        const currentHour24 = parseInt(currentHour);
                        const isSelected = currentHour24 === hour24;

                        // Convert to 12-hour format
                        const displayHour = hour24 % 12 || 12;
                        const period = hour24 < 12 ? "AM" : "PM";

                        // Check if this hour would create a future time
                        const testDate = new Date(selectedDate);
                        testDate.setHours(hour24);
                        const estNow = getESTDate();
                        const isFuture =
                          testDate > estNow &&
                          selectedDate.toDateString() === estNow.toDateString();

                        return (
                          <button
                            key={hour24}
                            type="button"
                            onClick={() => {
                              if (!isFuture) {
                                const [, mins] = time.split(":");
                                handleTimeChange(hour24, parseInt(mins) || 0);
                              }
                            }}
                            disabled={isFuture}
                            className={cn(
                              "w-full px-3 py-1.5 text-sm text-left transition-colors",
                              isSelected &&
                                "bg-primary text-primary-foreground",
                              !isSelected && !isFuture && "hover:bg-secondary",
                              isFuture && "opacity-30 cursor-not-allowed"
                            )}
                          >
                            {displayHour}:00 {period}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Minutes (every minute 0-59) */}
                  <div>
                    <Label className="text-xs mb-2 block text-muted-foreground">
                      Minute
                    </Label>
                    <div className="h-40 overflow-y-auto border border-border rounded-md custom-scrollbar">
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => {
                        const [currentHour, currentMin] = time.split(":");
                        const isSelected = parseInt(currentMin) === minute;

                        // Check if this minute would create a future time
                        const testDate = new Date(selectedDate);
                        testDate.setHours(parseInt(currentHour), minute);
                        const estNow = getESTDate();
                        const isFuture = testDate > estNow;

                        return (
                          <button
                            key={minute}
                            type="button"
                            onClick={() => {
                              if (!isFuture) {
                                handleTimeChange(parseInt(currentHour), minute);
                              }
                            }}
                            disabled={isFuture}
                            className={cn(
                              "w-full px-3 py-1.5 text-sm text-left transition-colors",
                              isSelected &&
                                "bg-primary text-primary-foreground",
                              !isSelected && !isFuture && "hover:bg-secondary",
                              isFuture && "opacity-30 cursor-not-allowed"
                            )}
                          >
                            :{minute.toString().padStart(2, "0")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <Input
                  ref={timeInputRef}
                  type="time"
                  value={time}
                  onChange={handleManualTimeChange}
                  onBlur={handleManualTimeBlur}
                  placeholder="Choose time"
                  className="w-full"
                />
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  const estNow = getESTDate();
                  setSelectedDate(estNow);
                  setViewDate(estNow);
                  setTime(estNow.toTimeString().slice(0, 5));
                  const isoString = estNow.toISOString().slice(0, 16);
                  onChange?.(isoString);
                  setShowTimePicker(false);
                }}
                className="flex-1 h-8 text-xs rounded-md border border-border hover:bg-secondary transition-colors"
              >
                Now (EST)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShowTimePicker(false);
                }}
                className="flex-1 h-8 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
