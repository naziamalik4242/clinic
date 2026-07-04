'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Search, Loader2, ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  keywordTags: string[];
}

export default function FAQKnowledgePage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadFaqDataset() {
      try {
        const res = await fetch('/api/knowledge-base?category=faq');
        if (res.ok) {
          const data = await res.json();
          setFaqs(data);
        } else {
          // Fallback static indicators if database has not seeded
          setFaqs([
            { id: '1', question: 'What is the baseline pricing for Laser Hair Removal?', answer: 'Laser hair removal starts at $150 per session, depending on the targeted area. Tailored packages are customized during consultation.', keywordTags: ['pricing', 'laser'] },
            { id: '2', question: 'Is there parking space available near the aesthetic clinic?', answer: 'Yes, we have dedicated free secure basement parking available specifically for our premium clients.', keywordTags: ['parking', 'location'] },
            { id: '3', question: 'What is the treatment downtime for anti-aging skin care procedures?', answer: 'Most anti-aging skin care treatments involve zero downtime. Patients may experience light temporary redness that subsides completely in 2-4 hours.', keywordTags: ['downtime', 'aftercare'] }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFaqDataset();
  }, []);

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(search.toLowerCase()) || 
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-6 h-6 text-indigo-600 animate-spin" /></div>;

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto animate-fade-in">
      {/* Header Viewport Mapping */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link href="/knowledge-base" className="p-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Patient FAQs Tuning</h1>
            <p className="text-xs text-slate-400 mt-0.5">Edit baseline dynamic answers provided automatically by the AI interface.</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm self-start">
          <Plus className="w-4 h-4" /> Add Custom FAQ
        </button>
      </div>

      {/* Internal Filter Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Filter active patient response question matrix..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:text-white"
        />
      </div>

      {/* Dataset Mapping Loops */}
      <div className="space-y-3">
        {filteredFaqs.map(item => (
          <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3 flex items-start gap-4">
            <div className="p-2 bg-indigo-50 dark:bg-slate-800 border border-indigo-100/30 rounded-xl shrink-0 mt-0.5">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{item.question}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.answer}</p>
              
              <div className="flex flex-wrap gap-1 pt-1">
                {item.keywordTags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <button className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}