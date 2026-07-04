'use client';

import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState('');

  const submitAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={submitAction} className="flex gap-2">
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a response to override automated conversation flow..." 
        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500 font-medium"
      />
      <button 
        type="submit"
        className="p-2.5 bg-white hover:bg-slate-100 text-slate-950 rounded-xl transition-colors shadow-sm flex items-center justify-center"
      >
        <SendHorizontal className="w-4 h-4" />
      </button>
    </form>
  );
}