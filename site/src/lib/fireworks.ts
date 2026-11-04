import confetti from "canvas-confetti";

/* A short fireworks show: bursts of round sparks from random points in the
   upper half of the screen, then a big gold finale. Skipped entirely for
   anyone who has asked for reduced motion. */
export function fireworks(durationMs = 3200) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#0071e3", "#f5b301", "#ff3b30", "#34c759", "#ffffff"];
  const end = Date.now() + durationMs;
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const burst = () => {
    confetti({
      particleCount: 70,
      spread: 360,
      startVelocity: 32,
      ticks: 70,
      gravity: 0.9,
      scalar: 0.9,
      shapes: ["circle"],
      origin: { x: rand(0.12, 0.88), y: rand(0.12, 0.45) },
      colors,
      zIndex: 2000,
    });
  };

  burst();
  const timer = window.setInterval(() => {
    if (Date.now() > end) {
      window.clearInterval(timer);
      confetti({
        particleCount: 180,
        spread: 360,
        startVelocity: 45,
        ticks: 90,
        origin: { x: 0.5, y: 0.35 },
        colors: ["#f5b301", "#ffd60a", "#ffffff"],
        zIndex: 2000,
      });
      return;
    }
    burst();
  }, 380);
}
