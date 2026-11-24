
import {
  calculateScore,
  calculateAccuracy,
  calculateAverageReactionTime,
} from "./gameLogic";

import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const directions = ["↑", "→", "↓", "←"];
const keys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

function App() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(30);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [target, setTarget] = useState(0);

  // Store reaction times for correct answers
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  // Store the start time without causing re-renders
  const reactionStartRef = useRef<number>(0);

  // Calculate game statistics
  const accuracy = calculateAccuracy(score / 10, attempts);

  const averageReactionTime =
    calculateAverageReactionTime(reactionTimes);

  // Start or restart the game
  function startGame() {
    setTime(30);
    setScore(0);
    setAttempts(0);
    setReactionTimes([]);
    setTarget(Math.floor(Math.random() * 4));

    // Begin measuring the first response
    reactionStartRef.current = performance.now();

    setPlaying(true);
  }

  // Check the player's answer and measure reaction time
  const checkAnswer = useCallback(
    (direction: number) => {
      if (!playing) return;

      // Measure the elapsed time in milliseconds
      const responseTime =
        performance.now() - reactionStartRef.current;

      // Count every attempt
      setAttempts(previous => previous + 1);

      if (direction === target) {
        // Award 10 points for a correct answer
        setScore(previous =>
          calculateScore(previous, true)
        );

        // Store reaction time for correct answers
        setReactionTimes(previous => [
          ...previous,
          responseTime,
        ]);
      }

      // Generate a new direction
      setTarget(previous =>
        (previous + 1 + Math.floor(Math.random() * 3)) % 4
      );

      // Reset the timer for the next arrow
      reactionStartRef.current = performance.now();
    },
    [playing, target]
  );

  // Countdown timer
  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setTime(previous => {
        if (previous <= 1) {
          setPlaying(false);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing]);

  // Keyboard controls
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (!playing || event.repeat) return;

      const direction = keys.indexOf(event.key);

      if (direction !== -1) {
        event.preventDefault();
        checkAnswer(direction);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [playing, checkAnswer]);

  return (
    <main className="game">
      <h1>NeuroTap</h1>
      <p>Train your hand-eye coordination!</p>

      <div className="stats">
        <div>Score: {score}</div>
        <div>Time: {time}s</div>
        <div>Accuracy: {accuracy}%</div>

        <div>
          Avg. Reaction:{" "}
          {reactionTimes.length > 0
            ? `${averageReactionTime} ms`
            : "—"}
        </div>
      </div>

      <div className="challenge">
        {playing ? directions[target] : "?"}
      </div>

      <p>
        {playing
          ? "Match the arrow direction!"
          : time === 0
            ? `Game over! Final score: ${score}`
            : "Ready to play?"}
      </p>

      <div className="controls">
        <div>
          <button
            disabled={!playing}
            onClick={() => checkAnswer(0)}
          >
            ↑
          </button>
        </div>

        <div>
          <button
            disabled={!playing}
            onClick={() => checkAnswer(3)}
          >
            ←
          </button>

          <button
            disabled={!playing}
            onClick={() => checkAnswer(2)}
          >
            ↓
          </button>

          <button
            disabled={!playing}
            onClick={() => checkAnswer(1)}
          >
            →
          </button>
        </div>
      </div>

      <button className="start" onClick={startGame}>
        {playing ? "Restart Game" : "Start Game"}
      </button>
    </main>
  );
}

export default App;
