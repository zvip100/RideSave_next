"use client";

import { useState } from "react";
import {
  Banknote,
  CreditCard,
  UserCircle,
  Clock,
  Circle,
  MapPin,
} from "lucide-react";
import TripActionsMenu from "./TripActionsMenu";

export default function TripsTable({ trips }) {
  const [openModalTripId, setOpenModalTripId] = useState(null);

  const handleRowDoubleClick = (tripId) => {
    setOpenModalTripId(tripId);
  };

  const handleModalClose = () => {
    setOpenModalTripId(null);
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatPrice = (cents) => {
    if (!cents) return null;
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Date
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Route
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Type
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Payment
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Extras
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                Notes
              </th>
              <th className="px-6 py-4 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trips.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No trips yet</p>
                    <p className="text-sm">
                      Create your first trip to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="group hover:bg-secondary/50 transition-colors cursor-pointer"
                  onDoubleClick={() => handleRowDoubleClick(trip.id)}
                >
                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatDate(trip.time)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(trip.time)}
                      </span>
                    </div>
                  </td>

                  {/* Route */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 min-w-[280px] max-h-[140px] overflow-hidden">
                      <div className="flex items-start gap-2">
                        <Circle className="w-2 h-2 text-primary/60 mt-1.5 fill-current flex-shrink-0" />
                        <span className="text-sm text-foreground break-words">
                          {trip.from}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 pl-[1px]">
                        <MapPin className="w-[9px] h-[9px] text-accent/60 mt-1 fill-current flex-shrink-0" />
                        <span className="text-sm text-muted-foreground break-words">
                          {trip.to}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                        trip.type === "Medicaid"
                          ? "bg-primary/10 text-primary"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {trip.type}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      {trip.paymentMethod ? (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          {trip.paymentMethod === "Cash" && (
                            <Banknote className="w-4 h-4 text-green-500" />
                          )}
                          {trip.paymentMethod === "CC" && (
                            <CreditCard className="w-4 h-4 text-blue-500" />
                          )}
                          {trip.paymentMethod === "Account" && (
                            <UserCircle className="w-4 h-4 text-purple-500" />
                          )}
                          <span className="text-secondary-foreground">
                            {trip.paymentMethod === "CC"
                              ? "Card"
                              : trip.paymentMethod}
                          </span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                      {trip.stopsPaymentMethod && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span>Stops:</span>
                          {trip.stopsPaymentMethod === "Cash" && (
                            <Banknote className="w-3.5 h-3.5 text-green-500/70" />
                          )}
                          {trip.stopsPaymentMethod === "CC" && (
                            <CreditCard className="w-3.5 h-3.5 text-blue-500/70" />
                          )}
                          {trip.stopsPaymentMethod === "Account" && (
                            <UserCircle className="w-3.5 h-3.5 text-purple-500/70" />
                          )}
                          <span>
                            {trip.stopsPaymentMethod === "CC"
                              ? "Card"
                              : trip.stopsPaymentMethod}
                          </span>
                        </span>
                      )}
                      {trip.waitingPaymentMethod && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span>Waiting:</span>
                          {trip.waitingPaymentMethod === "Cash" && (
                            <Banknote className="w-3.5 h-3.5 text-green-500/70" />
                          )}
                          {trip.waitingPaymentMethod === "CC" && (
                            <CreditCard className="w-3.5 h-3.5 text-blue-500/70" />
                          )}
                          {trip.waitingPaymentMethod === "Account" && (
                            <UserCircle className="w-3.5 h-3.5 text-purple-500/70" />
                          )}
                          <span>
                            {trip.waitingPaymentMethod === "CC"
                              ? "Card"
                              : trip.waitingPaymentMethod}
                          </span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Extras */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm">
                      {trip.clockOnly && (
                        <span className="inline-flex items-center gap-1.5 text-purple-400">
                          <Clock className="w-4 h-4" />
                          <span>Clock only</span>
                        </span>
                      )}
                      {trip.stopsPrice && (
                        <span className="text-secondary-foreground">
                          Stops:{" "}
                          <span className="font-semibold text-foreground">
                            {formatPrice(trip.stopsPrice)}
                          </span>
                        </span>
                      )}
                      {trip.waitingPrice && (
                        <span className="text-secondary-foreground">
                          Wait:{" "}
                          <span className="font-semibold text-foreground">
                            {formatPrice(trip.waitingPrice)}
                          </span>
                        </span>
                      )}
                      {!trip.clockOnly &&
                        !trip.stopsPrice &&
                        !trip.waitingPrice && (
                          <span className="text-muted-foreground">—</span>
                        )}
                    </div>
                  </td>

                  {/* Notes */}
                  <td className="px-6 py-4">
                    {trip.notes ? (
                      <span className="text-sm text-secondary-foreground max-w-[120px] max-h-[140px] block break-words overflow-hidden">
                        {trip.notes}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <TripActionsMenu
                      tripId={trip.id}
                      onEdit={(id) => console.log("Edit trip:", id)}
                      onDelete={(id) => console.log("Delete trip:", id)}
                      externalIsOpen={openModalTripId === trip.id}
                      onOpenChange={handleModalClose}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
