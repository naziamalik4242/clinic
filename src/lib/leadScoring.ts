export const leadScoring = {
  calculateIntent(message: string, currentScore: number): { actionTag: 'HOT' | 'WARM' | 'COLD'; newScore: number } {
    let scalarAddition = 5;
    const lower = message.toLowerCase();

    // High Intent triggers matching operational clinical conversion funnels
    if (lower.includes('price') || lower.includes('cost')) scalarAddition += 20;
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('tomorrow')) scalarAddition += 40;
    if (lower.includes('cancel') || lower.includes('wrong')) scalarAddition -= 15;

    const finalResult = Math.min(Math.max(currentScore + scalarAddition, 0), 100);
    
    let tag: 'HOT' | 'WARM' | 'COLD' = 'COLD';
    if (finalResult >= 75) tag = 'HOT';
    else if (finalResult >= 35) tag = 'WARM';

    return { actionTag: tag, newScore: finalResult };
  }
};