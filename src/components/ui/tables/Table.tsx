'use client';

import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto border border-slate-900 bg-slate-950/20 rounded-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-900 bg-slate-900/20">
            {headers.map((head, index) => (
              <th key={index} className="p-4 text-[10px] uppercase font-mono font-black text-slate-500 tracking-wider">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 text-xs font-medium text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  );
}