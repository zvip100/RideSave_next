import { getSession } from "@/lib/auth";
import { tripsService } from "@/lib/services";
import NewTrip from "@/components/NewTrip";
import TripsTable from "@/components/TripsTable";
import RefreshTrips from "@/components/refreshTrips";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trips - RideSave",
  description: "Manage your trips efficiently with RideSave",
};

export default async function Trips() {
  const session = await getSession();

  const trips = await tripsService.getTrips({ userId: session.user.dbId });

  return (
    <main className="min-h-safe">
      <div className="container-main py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-end gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">Trips</h1>
              <p className="text-secondary-foreground">
                {trips.length} total trips
              </p>
            </div>
            <div>
              {trips.length > 0 && (
                <div className="mt-6 flex gap-4 text-sm text-muted-foreground">
                  <p>
                    Medicaid:{" "}
                    {trips.filter((t) => t.type === "Medicaid").length}
                  </p>
                  <p>Cash: {trips.filter((t) => t.type === "Cash").length}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            <RefreshTrips />
            <NewTrip />
          </div>
        </div>

        {/* Table */}
        <TripsTable trips={trips} />
      </div>
    </main>
  );
}
