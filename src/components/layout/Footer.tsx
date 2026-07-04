'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/40 p-4 mt-auto">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono tracking-wide text-slate-500">
        
        {/* Compliance and deployment status codes logs */}
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <span>&copy; 2026 AuraClinic Node</span>
          <span className="flex items-center gap-1 text-indigo-400">
            <span className="w-1 h-1 bg-indigo-500 rounded-full" /> SSL TLS_1.3 Secure
          </span>
        </div>

        {/* Data Sync Heartbeats Telemetry Matrix */}
        <div className="flex items-center gap-4">
          <span>Database Cluster Latency: <strong className="text-slate-400">12ms</strong></span>
          <span>Meta API Connection Rate: <strong className="text-emerald-500">99.9%</strong></span>
        </div>

      </div>
    </footer>
  );
}