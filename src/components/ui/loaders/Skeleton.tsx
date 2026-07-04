'use client';

import React from 'react';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`bg-slate-900 border border-slate-850 rounded-xl relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/5 before:to-transparent ${className}`} />
  );
}