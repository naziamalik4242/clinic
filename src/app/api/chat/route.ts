import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: All conversations fetch karne ke liye (Sidebar Feed)
export async function GET() {
  try {
    const conversations = await prisma.patient.findMany({
      include: {
        chats: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Last message preview ke liye
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    // Formatting according to our ChatContext structure
    const formattedData = conversations.map((patient: { id: any; name: any; platform: any; chats: { message: any; }[]; }) => ({
      id: patient.id,
      patientName: patient.name || 'Anonymous Patient',
      platform: patient.platform,
      lastMessage: patient.chats[0]?.message || 'No messages yet',
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Jab Human Agent live chat me reply type karke send kare
export async function POST(request: Request) {
  try {
    const { conversationId, messageText } = await request.json();

    if (!conversationId || !messageText) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Save Human Agent reply into database stream
    const newChat = await prisma.chatHistory.create({
      data: {
        patientId: conversationId,
        sender: 'HUMAN_AGENT',
        message: messageText,
      },
    });

    // Update patient's last activity timestamp
    await prisma.patient.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(newChat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}