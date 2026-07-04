'use client';

import { useState, useEffect } from 'react';
import { generateAiReply } from '@/lib/chatbot';

interface Message {
  id: string;
  sender: 'PATIENT' | 'AI' | 'HUMAN_AGENT';
  text: string;
  timestamp: string;
}

interface ChatConversation {
  id: string;
  patientName: string;
  platform: string;
  lastMessage: string;
}

export function useChat(activePatientId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAiActive, setIsAiActive] = useState(true);

  useEffect(() => {
    if (!activePatientId) return;

    setMessages([
      { id: '1', sender: 'PATIENT', text: 'Hi, can you tell me about laser hair removal?', timestamp: '2h ago' },
      { id: '2', sender: 'AI', text: 'Absolutely. We can discuss treatment options, pricing, and booking availability.', timestamp: '2h ago' }
    ]);
  }, [activePatientId]);

  useEffect(() => {
    const initialConversations: ChatConversation[] = [
      { id: 'demo-1', patientName: 'Sarah Khan', platform: 'WHATSAPP', lastMessage: 'I would like to book a consultation.' },
      { id: 'demo-2', patientName: 'Mina Ali', platform: 'INSTAGRAM', lastMessage: 'What are your treatment prices?' }
    ];
    setConversations(initialConversations);
    setActiveId(initialConversations[0]?.id ?? null);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'HUMAN_AGENT',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isAiActive) {
      setIsTyping(true);
      setLoading(true);
      setTimeout(() => {
        setIsTyping(false);
        setLoading(false);
        const reply = generateAiReply(text, messages.map((message) => message.text));
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'AI',
            text: reply.text,
            timestamp: 'Just now'
          }
        ]);
      }, 900);
    }
  };

  const sendAgentMessage = async (conversationId: string, text: string) => {
    if (!text.trim()) return;

    setConversations((prev) => prev.map((conversation) => conversation.id === conversationId ? { ...conversation, lastMessage: text } : conversation));
    await sendMessage(text);
  };

  return { messages, conversations, loading, activeId, setActiveId, isTyping, isAiActive, setIsAiActive, sendMessage, sendAgentMessage };
}