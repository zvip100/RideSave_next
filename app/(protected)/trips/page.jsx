import { getSession } from '@/lib/auth';
import { tripsService } from '@/lib/services';
import TripsPageClient from '@/components/TripsPageClient';
import NewTrip from '@/components/NewTrip';
import RefreshTrips from '@/components/refreshTrips';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trips - RideSave',
  description: 'Manage your trips efficiently with RideSave',
};

export default async function Trips() {
  const session = await getSession();
  const userId = session.user.dbId;

  const { weekGroups, nextWeekOffset, tripCounts } = await tripsService.getWeeklyTrips({
    userId,
    fromWeekOffset: 0,
    mandatoryWeeks: 2,
  });

  const loadedCount = weekGroups.reduce((sum, g) => sum + g.trips.length, 0);
  const hasMore = loadedCount < tripCounts.total;

  return (
    <main className="min-h-safe">
      <div className="container-main py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">Trips</h1>
              <p className="text-secondary-foreground">{tripCounts.total} total trips</p>
            </div>
            <div>
              {tripCounts.total > 0 && (
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <p>Medicaid: {tripCounts.medicaid}</p>
                  <p>Cash: {tripCounts.cash}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse items-end md:flex-row gap-8">
            <RefreshTrips />
            <NewTrip />
          </div>
        </div>

        {/* Trips Content */}
        {tripCounts.total === 0 ? (
          <div className="card overflow-hidden">
            <div className="px-6 py-16 text-center">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">No trips yet</p>
                <p className="text-sm">Add your first trip to get started</p>
              </div>
            </div>
          </div>
        ) : (
          <TripsPageClient
            key={Date.now()}
            initialWeekGroups={weekGroups}
            initialNextWeekOffset={nextWeekOffset}
            initialHasMore={hasMore}
            totalCount={tripCounts.total}
          />
        )}
      </div>
    </main>
  );
}
