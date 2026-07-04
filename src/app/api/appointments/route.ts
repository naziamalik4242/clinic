import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, treatment, platformId, platform } = body;

    // 1. Double verification check on business operational boundaries
    const chosenDate = new Date(date);
    if (chosenDate.getDay() === 0) {
      return NextResponse.json({ error: 'Clinic is closed on Sundays.' }, { status: 400 });
    }
    if (time < "11:00" || time > "20:00") {
      return NextResponse.json({ error: 'Requested time is outside clinic operating hours.' }, { status: 400 });
    }

    // 2. Check if patient profile exists or create a new one
    let patient = await prisma.patient.findFirst({
      where: {
        OR: [
          { phone: phone },
          { platformId: platformId || phone }
        ]
      }
    });

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: name,
          phone: phone,
          platformId: platformId || phone,
          platform: platform || 'WHATSAPP',
          status: 'QUALIFIED'
        }
      });
    }

    // 3. Create the confirmed booking slot
    const newBooking = await prisma.booking.create({
      data: {
        patientId: patient.id,
        treatmentType: treatment,
        bookingDate: new Date(date),
        bookingTime: time,
        status: 'CONFIRMED'
      }
    });

    // Update lead status to converted
    await prisma.patient.update({
      where: { id: patient.id },
      data: { status: 'CONVERTED' }
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}