"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

export function KonamiListener() {
  const [, setSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      setSequence((prev) => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
        if (newSequence.join("").toLowerCase() === KONAMI_CODE.join("").toLowerCase()) {
          triggerKonami();
          return [];
        }
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerKonami = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 10000,
    });

    document.body.style.transition = "transform 1s ease-in-out";
    document.body.style.transform = "rotate(360deg)";
    
    setTimeout(() => {
      document.body.style.transition = "";
      document.body.style.transform = "";
    }, 1000);
  };

  return null;
}
