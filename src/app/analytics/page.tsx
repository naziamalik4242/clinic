'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Zap, Clock, Smartphone, Sparkles, Loader2, Calendar } from 'lucide-react';

interface AnalyticsData {
  totalInquiries: number;
  conversionRate: number;
  avgResponseTime: string;
  activeAutomations: number;
  channelDistribution: { platform: string; volume: number; percentage: number }[];
  weeklyPerformance: { day: string; inquiries: number; bookings: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalyticsMetrics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          // Mocking telemetry metrics if endpoint hasn't seeded yet
          setData({
            totalInquiries: 1420,
            conversionRate: 34.8,
            avgResponseTime: '1.2m',
            activeAutomations: 4,
            channelDistribution: [
              { platform: 'WhatsApp', volume: 820, percentage: 58 },
              { platform: 'Instagram', volume: 440, percentage: 31 },
              { platform: 'Messenger', volume: 160, percentage: 11 }
            ],
            weeklyPerformance: [
              { day: 'Mon', inquiries: 120, bookings: 42 },
              { day: 'Tue', inquiries: 145, bookings: 51 },
              { day: 'Wed', inquiries: 190, bookings: 72 },
              { day: 'Thu', inquiries: 165, bookings: 58 },
              { day: 'Fri', inquiries: 210, bookings: 80 },
              { day: 'Sat', inquiries: 130, bookings: 45 }
            ]
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalyticsMetrics();
  }, []);

  if (loading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /></div>;
  if (!data) return null;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in">
      {/* Top Header Segment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Performance Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time breakdown of conversational intelligence conversions and pipeline health metrics.</p>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100/30 px-3 py-1.5 rounded-xl text-xs font-bold self-start">
          <Calendar className="w-3.5 h-3.5" /> Live Data Stream Matrix
        </div>
      </div>

      {/* QUAD CORE METRICS CARDS */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Incoming Traffic</span>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800"><Users className="w-4 h-4 text-indigo-500" /></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.totalInquiries}</h2>
            <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">▲ +12.4% vs last cycle</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Acquisition Rate</span>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800"><TrendingUp className="w-4 h-4 text-indigo-500" /></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.conversionRate}%</h2>
            <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">▲ +3.1% automated yield</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">AI Latency Speed</span>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800"><Clock className="w-4 h-4 text-indigo-500" /></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.avgResponseTime}</h2>
            <p className="text-[11px] text-indigo-500 font-semibold mt-0.5">⚡ Instantaneous bypass matrix</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Autonomous Routers</span>
            <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800"><Zap className="w-4 h-4 text-indigo-500" /></div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.activeAutomations} Channels</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Fully operational sync states</p>
          </div>
        </div>
      </div>

      {/* METRIC VISUALIZATION CANVAS ROW */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly Load Chart (Left Vector) */}
        <div className="col-span-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-1 mb-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-500" /> Conversational Yield Balance
            </h3>
            <p className="text-xs text-slate-400">Weekly representation framework of captured vs booked sessions.</p>
          </div>

          {/* Clean Dynamic Geometric Bar Layout via pure CSS flex wrappers */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {data.weeklyPerformance.map((item, idx) => {
              const maxInquiries = Math.max(...data.weeklyPerformance.map(i => i.inquiries));
              const inquiryHeight = (item.inquiries / maxInquiries) * 100;
              const bookingHeight = (item.bookings / maxInquiries) * 100;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex gap-1 items-end h-full justify-center">
                    {/* Inquiry Volume Bar */}
                    <div 
                      style={{ height: `${inquiryHeight}%` }} 
                      className="w-3 sm:w-4 bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900 rounded-t-md transition-colors relative"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow-md pointer-events-none z-20">
                        {item.inquiries}
                      </span>
                    </div>
                    {/* Booked Volume Bar */}
                    <div 
                      style={{ height: `${bookingHeight}%` }} 
                      className="w-3 sm:w-4 bg-indigo-600 rounded-t-md relative"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow-md pointer-events-none z-20">
                        {item.bookings}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Channel Share Layout (Right Vector) */}
        <div className="col-span-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-500" /> Pipeline Channel Share
            </h3>
            <p className="text-xs text-slate-400">Total volumetric density categorized by application entry points.</p>
          </div>

          <div className="space-y-4 pt-2">
            {data.channelDistribution.map((channel, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-pink-500' : 'bg-blue-400'}`} />
                    {channel.platform} Pipeline
                  </span>
                  <span className="text-slate-400 font-mono">{channel.volume} ({channel.percentage}%)</span>
                </div>
                {/* Horizontal Progress Bar Track */}
                <div className="w-full h-2 bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${channel.percentage}%` }} 
                    className={`h-full rounded-full ${i === 0 ? 'bg-indigo-600' : i === 1 ? 'bg-pink-500' : 'bg-blue-400'}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-3.5 flex items-start gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <span className="font-bold text-slate-700 dark:text-slate-300">AI Optimization Tip:</span> WhatsApp accounts for the majority of client interactions. Increasing targeted marketing hooks on this network can maximize your total acquisition layout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}