import Link from "next/link";
import { tripsService } from "@/lib/services";
import NewTripButton from "@/components/NewTripButton";

export const dynamic = "force-dynamic";

export default async function Trips() {
  // TODO: Remove this delay - just for testing loading state
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const trips = await tripsService.getTrips();

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
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🚕</span>
            <span className="text-2xl font-bold tracking-tight">RideSave</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link
              href="/api"
              className="text-secondary-foreground text-sm hover:text-foreground transition-colors"
            >
              API Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header */}

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Trips</h1>
            <p className="text-secondary-foreground">
              {trips.length} total trips
            </p>
          </div>
          <NewTripButton />
        </div>

        {/* Table */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {trips.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
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
                      className="hover:bg-secondary/50 transition-colors cursor-pointer"
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
                        <div className="flex flex-col gap-1 max-w-[280px]">
                          <div className="flex items-start gap-2">
                            <span className="text-primary mt-0.5">●</span>
                            <span
                              className="text-sm truncate"
                              title={trip.from}
                            >
                              {trip.from}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">●</span>
                            <span className="text-sm truncate" title={trip.to}>
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
                        {trip.paymentMethod ? (
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span>
                              {trip.paymentMethod === "Cash" && "💵"}
                              {trip.paymentMethod === "CC" && "💳"}
                              {trip.paymentMethod === "Account" && "👤"}
                            </span>
                            <span className="text-secondary-foreground">
                              {trip.paymentMethod === "CC"
                                ? "Card"
                                : trip.paymentMethod}
                            </span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>

                      {/* Extras */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-sm">
                          {trip.clockOnly && (
                            <span className="text-purple-400">
                              ⏱️ Clock only
                            </span>
                          )}
                          {trip.stopsPrice && (
                            <span className="text-secondary-foreground">
                              Stops: {formatPrice(trip.stopsPrice)}
                            </span>
                          )}
                          {trip.waitingPrice && (
                            <span className="text-secondary-foreground">
                              Wait: {formatPrice(trip.waitingPrice)}
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
                          <span
                            className="text-sm text-secondary-foreground max-w-[200px] truncate block"
                            title={trip.notes}
                          >
                            {trip.notes}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        {trips.length > 0 && (
          <div className="mt-6 flex gap-6 text-sm text-muted-foreground">
            <span>
              Medicaid:{" "}
              <span className="text-foreground font-medium">
                {trips.filter((t) => t.type === "Medicaid").length}
              </span>
            </span>
            <span>
              Cash:{" "}
              <span className="text-foreground font-medium">
                {trips.filter((t) => t.type === "Cash").length}
              </span>
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
