'use client';

import { useState, useTransition } from 'react';
import TripsTable from '@/components/TripsTable';
import { loadMoreTrips } from '@/lib/actions/trips';

export default function TripsPageClient({ initialWeekGroups, initialNextWeekOffset, initialHasMore, totalCount }) {
  const [weekGroups, setWeekGroups] = useState(initialWeekGroups);
  const [nextWeekOffset, setNextWeekOffset] = useState(initialNextWeekOffset);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isPending, startTransition] = useTransition();

  const loadedCount = weekGroups.flatMap((g) => g.trips).length;

  const handleLoadMore = () => {
    startTransition(async () => {
      const result = await loadMoreTrips(nextWeekOffset, loadedCount);

      if (result.success) {
        setWeekGroups((prev) => [...prev, ...result.weekGroups]);
        setNextWeekOffset(result.nextWeekOffset);
        setHasMore(result.hasMore);
      }
    });
  };

  return (
    <>
      {loadedCount === 0 ? (
        <div className="card overflow-hidden">
          <div className="px-6 py-16 text-center">
            <p className="text-lg text-muted-foreground">No recent trips</p>
          </div>
        </div>
      ) : (
        <TripsTable weekGroups={weekGroups} />
      )}

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="px-6 py-2.5 text-sm font-medium rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {isPending ? 'Loading...' : loadedCount === 0 ? 'Load Older Trips' : 'Load More'}
          </button>
        </div>
      )}

      {loadedCount > 0 && loadedCount < totalCount && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          Showing {loadedCount} of {totalCount} trips
        </p>
      )}
    </>
  );
}
