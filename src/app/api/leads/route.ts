import { NextResponse } from 'next/server';

let leadsPipeline = [
  { id: 'l1', source: 'WhatsApp', intentScore: 92, status: 'QUALIFIED', time: '10m ago' },
  { id: 'l2', source: 'Instagram', intentScore: 45, status: 'PENDING', time: '1h ago' }
];

export async function GET() {
  return NextResponse.json(leadsPipeline);
}

export async function PUT(request: Request) {
  try {
    const { leadId, updateStatus } = await request.json();
    const idx = leadsPipeline.findIndex(l => l.id === leadId);
    
    if (idx > -1) {
      leadsPipeline[idx].status = updateStatus;
      return NextResponse.json({ success: true, updatedLead: leadsPipeline[idx] });
    }
    return NextResponse.json({ error: 'Lead target index missing' }, { status: 404 });
  } catch {
    return NextResponse.json({ error: 'Payload validation failed' }, { status: 400 });
  }
}