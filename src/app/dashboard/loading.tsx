import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6 max-w-[1600px] mx-auto animate-pulse">
      {/* HEADER SKELETON */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-4 w-80 bg-slate-100 dark:bg-slate-800/60 rounded-lg" />
        </div>
        <div className="h-10 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl self-start" />
      </div>

      {/* METRIC CARDS SKELETON LOOP (4 Cards) */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-xl space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-md" />
              <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SEGMENTS SKELETON GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Visual Analytics Box Placeholder */}
        <div className="col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="space-y-2">
            <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3 w-56 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
          </div>
          <div className="h-[340px] w-full bg-slate-50 dark:bg-slate-950/40 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl" />
        </div>

        {/* Right Conversations Thread Placeholder */}
        <div className="col-span-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="space-y-3 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center py-2">
                <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}