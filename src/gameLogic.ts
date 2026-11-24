
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
