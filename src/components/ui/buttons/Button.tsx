'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  const bases = 'inline-flex items-center justify-center gap-1.5 font-bold transition-all rounded-xl border outline-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-white hover:bg-slate-100 text-slate-950 border-transparent shadow-sm',
    secondary: 'bg-slate-900 hover:bg-slate-850 text-slate-200 border-slate-800 hover:border-slate-700',
    destructive: 'bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border-rose-900/30',
    ghost: 'bg-transparent hover:bg-slate-900 text-slate-400 hover:text-white border-transparent'
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-[10px]',
    md: 'px-4 py-2.5 text-xs'
  };

  return (
    <button className={`${bases} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
}