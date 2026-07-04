'use client';

import React, { useEffect, useState } from 'react';
// TypeScript type validation breakdown error ko fix karne ke liye 'type' use kiya
import { useChat } from '@/hooks/useChat';
import ChatPageLayout from '@/app/chat/ChatPageLayout';
import { Loader2 } from 'lucide-react';

// Simple inline Instagram icon as lucide-react does not export 'Instagram'
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export default function InstagramChatPage() {
  const { messages, sendMessage } = useChat();
  // manage activeId locally because useChat does not expose setActiveId
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filteredChats, setFilteredChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Array safety check so filtering doesn't crash if data isn't fetched yet
    if (messages && Array.isArray(messages)) {
      const instagramRecords = messages.filter((c: any) => c.platform === 'INSTAGRAM');
      setFilteredChats(instagramRecords);
    }
    setIsLoading(false);
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 text-pink-500 animate-spin" />
        <span className="text-sm font-medium text-slate-400">Syncing Instagram DMs...</span>
      </div>
    );
  }

  return (
    <ChatPageLayout 
      platformName="Instagram DM"
      icon={<Instagram className="w-5 h-5 text-pink-500" />}
      filteredConversations={filteredChats}
      activeId={activeId}
      setActiveId={setActiveId}
      sendAgentMessage={sendMessage}
    />
  );
}