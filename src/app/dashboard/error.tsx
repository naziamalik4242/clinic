'use client'; // Error components must strictly be Client Components

import React, { useEffect } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Taki aap monitoring tools (like Sentry) par real server exceptions capture kar sakein
    console.error("Dashboard error caught on layer border:", error);
  }, [error]);

  return (
    <div className="flex h-[85vh] flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-5 animate-fade-in">
      {/* Icon Graphic Frame */}
      <div className="w-14 h-14 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center border border-rose-100/50 dark:border-rose-900/60 shadow-sm shadow-rose-500/5">
        <AlertOctagon className="w-7 h-7 stroke-[1.5]" />
      </div>

      {/* Analytical Error Descriptions */}
      <div className="space-y-2">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Data Stream Sync Failed
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          The dashboard encountered a telemetry connection breakdown with the clinical routing engine. This usually happens during database hot-reloads.
        </p>
        {error.message && (
          <div className="text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 p-2.5 rounded-lg border border-slate-200/40 dark:border-slate-800 text-left overflow-x-auto max-w-full mt-3">
            Code Exception: {error.message}
          </div>
        )}
      </div>

      {/* Actions Interactive Controllers Button Grid */}
      <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-2">
        {/* Reset function parameters will force Next.js segment re-render */}
        <button
          onClick={() => reset()}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/10 transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Retry Connection
        </button>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Exit Portal
        </Link>
      </div>
    </div>
  );
}