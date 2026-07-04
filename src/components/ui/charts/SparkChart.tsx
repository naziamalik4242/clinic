'use client';

import React from 'react';

export default function SparkChart({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min === 0 ? 1 : max - min;

  return (
    <div className="flex items-end gap-1 h-8 px-1">
      {points.map((pt, index) => {
        const heightPct = ((pt - min) / range) * 100;
        return (
          <div 
            key={index} 
            className="w-1.5 bg-indigo-600/40 hover:bg-indigo-500 rounded-t-sm transition-all duration-300"
            style={{ height: `${Math.max(heightPct, 15)}%` }}
            title={`Value: ${pt}`}
          />
        );
      })}
    </div>
  );
}