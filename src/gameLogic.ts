
export function calculateScore(
  currentScore: number,
  isCorrect: boolean
): number {
  return isCorrect ? currentScore + 10 : currentScore;
}

export function calculateAccuracy(
  correctAnswers: number,
  totalAttempts: number
): number {
  if (totalAttempts === 0) return 0;

  return Math.round(
    (correctAnswers / totalAttempts) * 100
  );
}

export function calculateAverageReactionTime(
  reactionTimes: number[]
): number {
  if (reactionTimes.length === 0) return 0;

  const total = reactionTimes.reduce(
    (sum, time) => sum + time,
    0
  );

  return Math.round(total / reactionTimes.length);
}
