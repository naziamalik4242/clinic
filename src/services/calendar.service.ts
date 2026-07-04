import { googleCalendarLib } from '@/lib/googleCalendar';
import { prisma } from '@/lib/prisma';

export const calendarService = {
  async bookAppointmentSlot(patientId: string, summary: string, isoDateTime: string, notes: string) {
    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) throw new Error('Patient timeline lookup failed. Operation abandoned.');

    // 1. Allocate entry on corporate cloud service providers
    const cloudEvent = await googleCalendarLib.createSlotEvent(summary, isoDateTime, notes, patientId);

    // 2. Commit synchronization records inside our direct operational ledger database
    const localRecord = await prisma.appointment.create({
      data: {
        patientId,
        procedure: summary,
        date: new Date(isoDateTime),
        time: isoDateTime.slice(11, 16),
        notes: `Cloud Ref Code: ${cloudEvent.eventId || 'NONE'}. Note Context: ${notes}`,
        status: 'CONFIRMED'
      }
    });

    return { success: true, appointmentRecord: localRecord, eventLink: cloudEvent.link };
  }
};