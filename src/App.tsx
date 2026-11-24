
import { calculateScore, calculateAccuracy } from "./gameLogic";
import { useEffect, useState } from "react";
import "./App.css";

const directions = ["↑", "→", "↓", "←"];
const keys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

function App() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(30);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [target, setTarget] = useState(0);

  const accuracy = calculateAccuracy(score / 10, attempts);

  function startGame() {
    setTime(30);
    setScore(0);
    setAttempts(0);
    setTarget(Math.floor(Math.random() * 4));
    setPlaying(true);
  }

  function checkAnswer(direction: number) {
    if (!playing) return;

    setAttempts(previous => previous + 1);

    if (direction === target) {
  setScore(previous => calculateScore(previous, true));
}

    setTarget(previous =>
      (previous + 1 + Math.floor(Math.random() * 3)) % 4
    );
  }

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
  }, [playing, target]);

  return (
    <main className="game">
      <h1>NeuroTap</h1>
      <p>Train your hand-eye coordination!</p>

      <div className="stats">
        <div>Score: {score}</div>
        <div>Time: {time}s</div>
        <div>Accuracy: {accuracy}%</div>
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
          <button disabled={!playing} onClick={() => checkAnswer(0)}>
            ↑
          </button>
        </div>
        <div>
          <button disabled={!playing} onClick={() => checkAnswer(3)}>
            ←
          </button>
          <button disabled={!playing} onClick={() => checkAnswer(2)}>
            ↓
          </button>
          <button disabled={!playing} onClick={() => checkAnswer(1)}>
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
