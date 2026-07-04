'use client';

import React, { use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface ParamsProps {
  id: string;
}

export default function DeepLinkConversationPage({ params }: { params: Promise<ParamsProps> }) {
  const router = useRouter();
  // Next.js 15 App Router standard requires unwrapping async params object
  const resolvedParams = use(params);
  const patientId = resolvedParams.id;

  // Next.js structural best practices suggest pushing single threads to unified workspace viewports
  // This smoothly redirects parameters directly into the main inbox core controller matrix
  React.useEffect(() => {
    if (patientId) {
      router.replace(`/chat?id=${patientId}`);
    }
  }, [patientId, router]);

  return (
    <div className="flex h-screen items-center justify-center flex-col gap-2 bg-slate-50/50">
      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-slate-400 font-medium tracking-wide">Resolving contextual deep-link parameters...</p>
    </div>
  );
}