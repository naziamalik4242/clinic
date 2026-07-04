'use client';

import React, { createContext, useContext, useState } from 'react';

interface ChatSession {
  activePatientId: string | undefined;
  isAiLockOn: boolean;
  activeFilterChannel: 'ALL' | 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER';
}

interface ChatContextType {
  session: ChatSession;
  selectPatient: (id: string | undefined) => void;
  toggleAiLock: () => void;
  setChannelFilter: (filter: ChatSession['activeFilterChannel']) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<ChatSession>({
    activePatientId: undefined,
    isAiLockOn: true,
    activeFilterChannel: 'ALL'
  });

  const selectPatient = (id: string | undefined) => {
    setSession(prev => ({ ...prev, activePatientId: id }));
  };

  const toggleAiLock = () => {
    setSession(prev => ({ ...prev, isAiLockOn: !prev.isAiLockOn }));
  };

  const setChannelFilter = (filter: ChatSession['activeFilterChannel']) => {
    setSession(prev => ({ ...prev, activeFilterChannel: filter }));
  };

  return (
    <ChatContext.Provider value={{ session, selectPatient, toggleAiLock, setChannelFilter }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be executed within a ChatProvider wrapper hierarchy.');
  }
  return context;
}