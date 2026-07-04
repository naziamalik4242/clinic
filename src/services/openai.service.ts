import { openaiLib } from '@/lib/openai';
import { aiMemory } from '@/lib/aiMemory';
import { leadScoring } from '@/lib/leadScoring';
import { prisma } from '@/lib/prisma';

export const openAiService = {
  async processIncomingMessage(patientPhone: string, messageText: string, platform: 'WHATSAPP' | 'INSTAGRAM' | 'MESSENGER') {
    // 1. Fetch or initialize the target patient structural ledger
    let patient = await prisma.patient.findUnique({ where: { phone: patientPhone } });
    if (!patient) {
      patient = await prisma.patient.create({
        data: { name: `Client_${patientPhone.slice(-4)}`, phone: patientPhone }
      });
    }

    // 2. Commit log message block onto data nodes
    await aiMemory.appendNode(patient.id, 'PATIENT', messageText, platform, 'PATIENT', new Date().toISOString());

    // 3. Compute structural lead intent scoring mutations
    const evaluation = leadScoring.calculateIntent(messageText, patient.intentScore);
    await prisma.patient.update({
      where: { id: patient.id },
      data: { intentScore: evaluation.newScore, actionTag: evaluation.actionTag }
    });

    // 4. Retrieve historical sliding windows and calculate response logic
    const contextHistory = await aiMemory.getContextWindow(patientPhone);
    const aiOutput = await openaiLib.generateResponse(messageText, contextHistory);

    // 5. Append AI execution frame logs
    await aiMemory.appendNode(patient.id, 'AI', aiOutput.text, platform, 'AI', new Date().toISOString());

    return {
      responseText: aiOutput.text,
      detectedIntent: aiOutput.intent,
      actionTag: evaluation.actionTag
    };
  }
};