import { NextResponse } from 'next/server';

export async function GET() {
  // In production, run database aggregate queries here (e.g., Prisma.appointment.groupBy())
  const analyticsPayload = {
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
  };

  return NextResponse.json(analyticsPayload);
}