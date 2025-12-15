import { tripsService } from "@/lib/services";
import NewTripButton from "@/components/NewTripButton";
import TripsTable from "@/components/TripsTable";

export const dynamic = "force-dynamic";

export default async function Trips() {
  const trips = await tripsService.getTrips();

  return (
    <main className="min-h-screen">
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
        <TripsTable trips={trips} />

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
