import React from 'react';
import Link from 'next/link';
import { ShieldQuestion, ArrowLeft } from 'lucide-react';

export default function GlobalNotFoundRoute() {
  return (
    <div className="flex flex-col h-[85vh] items-center justify-center text-center p-6 space-y-4 max-w-sm mx-auto animate-fade-in">
      <div className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl shadow-sm">
        <ShieldQuestion className="w-6 h-6 text-indigo-500" />
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-black text-white">Resource Index Dropped</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The routing tree location coordinate requested matches no active application system endpoint.
        </p>
      </div>
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:underline pt-2">
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Central Node
      </Link>
    </div>
  );
}