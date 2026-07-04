import { NextResponse } from 'next/server';

let patientsDb = [
  { id: 'p1', name: 'Zainab Malik', phone: '+923001112233', totalVisits: 4, status: 'Active' },
  { id: 'p2', name: 'Ayesha Ahmed', phone: '+923214445566', totalVisits: 1, status: 'New' }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search')?.toLowerCase();

  if (query) {
    const filtered = patientsDb.filter(p => p.name.toLowerCase().includes(query) || p.phone.includes(query));
    return NextResponse.json(filtered);
  }
  return NextResponse.json(patientsDb);
}