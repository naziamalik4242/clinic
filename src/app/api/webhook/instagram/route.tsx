import { NextResponse } from 'next/server';

// 1. Meta Webhook Verification (Handshake Protocol)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const CUSTOM_VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'my_secure_handshake_token';

  if (mode === 'subscribe' && token === CUSTOM_VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    return new Response(challenge, { status: 200 });
  }
  return new Response('Verification mismatch', { status: 403 });
}

// 2. Incoming Live Message Processing (Event Listener)
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Check if the payload has valid WhatsApp text values
    const entry = payload.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messageObj = value?.messages?.[0];

    if (messageObj) {
      const patientPhone = messageObj.from;
      const textMessage = messageObj.text?.body;
      
      console.log(`Live WhatsApp Ping from ${patientPhone}: "${textMessage}"`);
      
      // BACKGROUND ROUTING SYSTEM:
      // Yahan aap apka AI Engine Trigger algorithm push karenge (e.g. call openAI handler script)
      // fetch('https://localhost:3000/api/openai', { method: 'POST', body: JSON.stringify({...}) })
    }

    return NextResponse.json({ status: 'EVENT_RECEIVED' });
  } catch (error) {
    console.error('Webhook payload error:', error);
    return NextResponse.json({ error: 'Failed handling webhook data stream' }, { status: 500 });
  }
}