"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import SubmitButton from "@/components/SubmitButton";
import { useAsyncSubmit } from "@/hooks/useAsyncSubmit";

export default function TestForm({
  fieldValues = null,
  serverAction,
  onSuccess,
  onCancel,
  userId = 3,
  tripId = null,
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: fieldValues || {
      type: "Medicaid",
      clockOnly: false,
      time: "", // No default time
    },
  });

  const {
    submit: submitTrip,
    isLoading,
    error,
  } = useAsyncSubmit(serverAction, onSuccess, (error) => {
    console.error(error);
  });

  const [showStops, setShowStops] = useState(
    Boolean(fieldValues?.stopsPaymentMethod || fieldValues?.stopsPrice)
  );
  const [showWaiting, setShowWaiting] = useState(
    Boolean(fieldValues?.waitingPaymentMethod || fieldValues?.waitingPrice)
  );

  const watchClockOnly = watch("clockOnly");
  const watchType = watch("type");

  useEffect(() => {
    if (!tripId) return;

    const convertCentsToDollars = (fieldName, cents) => {
      setValue(fieldName, `$${(cents / 100).toFixed(2)}`);
    };

    if (fieldValues?.stopsPrice) {
      convertCentsToDollars("stopsPrice", fieldValues.stopsPrice);
    }

    if (fieldValues?.waitingPrice) {
      convertCentsToDollars("waitingPrice", fieldValues.waitingPrice);
    }
  }, []);

  // When clock only is checked, set type to Medicaid and clear payment method
  useEffect(() => {
    if (watchClockOnly) {
      if (watchType !== "Medicaid") {
        setValue("type", "Medicaid");
      }
      setValue("paymentMethod", "");
    }
  }, [watchClockOnly, watchType, setValue]);

  // Format price on blur
  const handlePriceBlur = (fieldName, value) => {
    if (!value) return;
    // Remove $ and other non-numeric characters except decimal
    const cleanValue = value.replace(/[^0-9.]/g, "");
    if (cleanValue === "") {
      setValue(fieldName, "");
      return;
    }
    const number = parseFloat(cleanValue);
    if (!isNaN(number)) {
      setValue(fieldName, `$${number.toFixed(2)}`);
    }
  };

  const onSubmit = async (data) => {
    // Convert prices from dollars to cents
    const formattedData = {
      ...data,
      userId,
      stopsPrice: data.stopsPrice
        ? Math.round(parseFloat(data.stopsPrice.replace(/[^0-9.]/g, "")) * 100)
        : null,
      waitingPrice: data.waitingPrice
        ? Math.round(
            parseFloat(data.waitingPrice.replace(/[^0-9.]/g, "")) * 100
          )
        : null,
      // Remove empty optional fields
      paymentMethod: data.clockOnly ? null : data.paymentMethod || null,
      stopsPaymentMethod: data.stopsPaymentMethod || null,
      waitingPaymentMethod: data.waitingPaymentMethod || null,
      notes: data.notes || "",
    };

    await submitTrip(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* From Location */}
      <div className="space-y-2">
        <Label htmlFor="from">
          From <span className="text-destructive">*</span>
        </Label>
        <Input
          id="from"
          placeholder="Pickup Location"
          {...register("from", { required: "Pickup location is required" })}
        />
        {errors.from && (
          <p className="text-sm text-red-500">{errors.from.message}</p>
        )}
      </div>

      {/* To Location */}
      <div className="space-y-2">
        <Label htmlFor="to">
          To <span className="text-destructive">*</span>
        </Label>
        <Input
          id="to"
          placeholder="Dropoff Location"
          {...register("to", { required: "Dropoff location is required" })}
        />
        {errors.to && (
          <p className="text-sm text-red-500">{errors.to.message}</p>
        )}
      </div>

      {/* Date & Time */}
      <div className="space-y-2">
        <Label htmlFor="time">
          Date & Time <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="time"
          control={control}
          rules={{ required: "Date and time are required" }}
          render={({ field }) => (
            <DateTimePicker value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.time && (
          <p className="text-sm text-red-500">{errors.time.message}</p>
        )}
      </div>

      {/* Trip Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Trip Type</Label>
        <Select id="type" {...register("type")} disabled={watchClockOnly}>
          <option value="Medicaid">Medicaid</option>
          <option value="Cash">Cash</option>
        </Select>
        {watchClockOnly && (
          <p className="text-xs text-muted-foreground">
            Clock only trips are always Medicaid
          </p>
        )}
      </div>

      {/* Payment Method - Only show for Cash trips and when NOT clock only */}
      {watchType === "Cash" && !watchClockOnly && (
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select id="paymentMethod" {...register("paymentMethod")}>
            <option value="">-- Select --</option>
            <option value="Cash">Cash</option>
            <option value="CC">Credit Card</option>
            <option value="Account">Account</option>
          </Select>
        </div>
      )}

      {/* Clock Only */}
      <div className="flex items-center space-x-2">
        <Checkbox id="clockOnly" {...register("clockOnly")} />
        <Label htmlFor="clockOnly" className="cursor-pointer">
          Clock Only{" "}
          <span className="text-xs text-muted-foreground ml-1">
            (no passengers)
          </span>
        </Label>
      </div>

      {/* Additional Charges Section */}
      {!watchClockOnly && (
        <div className="space-y-4 border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-foreground">
            Additional Charges
          </h3>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant={showStops ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setShowStops(!showStops);
                if (showStops) {
                  setValue("stopsPrice", "");
                  setValue("stopsPaymentMethod", "");
                }
              }}
              className="flex-1"
            >
              {showStops ? "Remove Stops" : "+ Add Stops"}
            </Button>
            <Button
              type="button"
              variant={showWaiting ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setShowWaiting(!showWaiting);
                if (showWaiting) {
                  setValue("waitingPrice", "");
                  setValue("waitingPaymentMethod", "");
                }
              }}
              className="flex-1"
            >
              {showWaiting ? "Remove Waiting" : "+ Add Waiting"}
            </Button>
          </div>

          {/* Stops Inputs */}
          {showStops && (
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-primary"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
                <span className="text-sm font-medium">Stops Charge</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="stopsPrice" className="text-xs">
                    Price
                  </Label>
                  <Input
                    id="stopsPrice"
                    type="text"
                    placeholder="$0.00"
                    {...register("stopsPrice")}
                    onBlur={(e) =>
                      handlePriceBlur("stopsPrice", e.target.value)
                    }
                  />
                  {errors.stopsPrice && (
                    <p className="text-xs text-red-500">
                      {errors.stopsPrice.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stopsPaymentMethod" className="text-xs">
                    Payment
                  </Label>
                  <Select
                    id="stopsPaymentMethod"
                    {...register("stopsPaymentMethod")}
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="CC">Card</option>
                    <option value="Account">Account</option>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Waiting Inputs */}
          {showWaiting && (
            <div className="space-y-3 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-primary"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 5v3l2 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium">Waiting Time Charge</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="waitingPrice" className="text-xs">
                    Price
                  </Label>
                  <Input
                    id="waitingPrice"
                    type="text"
                    placeholder="$0.00"
                    {...register("waitingPrice")}
                    onBlur={(e) =>
                      handlePriceBlur("waitingPrice", e.target.value)
                    }
                  />
                  {errors.waitingPrice && (
                    <p className="text-xs text-red-500">
                      {errors.waitingPrice.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waitingPaymentMethod" className="text-xs">
                    Payment
                  </Label>
                  <Select
                    id="waitingPaymentMethod"
                    {...register("waitingPaymentMethod")}
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="CC">Card</option>
                    <option value="Account">Account</option>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any additional information..."
          rows={3}
          {...register("notes", {
            maxLength: {
              value: 1024,
              message: "Notes cannot exceed 1024 characters",
            },
          })}
        />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <SubmitButton
          text={tripId ? "Update Trip" : "Create Trip"}
          pendingText={tripId ? "Updating..." : "Creating..."}
          pending={isLoading}
        />
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
