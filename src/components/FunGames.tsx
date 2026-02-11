"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FunGames() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Pick a number between 1 and 10.");
  const [attempts, setAttempts] = useState(0);
  const [wins, setWins] = useState(0);

  const handleGuess = () => {
    const value = parseInt(guess, 10);
    if (Number.isNaN(value) || value < 1 || value > 10) {
      setMessage("Please enter a number from 1 to 10.");
      return;
    }

    setAttempts((prev) => prev + 1);

    if (value === target) {
      setWins((prev) => prev + 1);
      setMessage("🎉 Correct! I picked a new number—try again.");
      setTarget(Math.floor(Math.random() * 10) + 1);
      setGuess("");
    } else if (value < target) {
      setMessage("Too low — try something higher.");
    } else {
      setMessage("Too high — try something lower.");
    }
  };

  const handleReset = () => {
    setTarget(Math.floor(Math.random() * 10) + 1);
    setGuess("");
    setMessage("New game! Pick a number between 1 and 10.");
    setAttempts(0);
  };

  return (
    <section id="fun" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center"
        >
          Take a Short Break
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mb-10 max-w-2xl mx-auto text-center"
        >
          A tiny number guessing game to pass a minute before you get in touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-3 text-center">
            Guess the Number
          </h3>
          <p className="text-sm text-gray-400 mb-6 text-center">
            I&apos;m thinking of a number between <span className="font-semibold text-accent-cobalt">1</span> and{" "}
            <span className="font-semibold text-accent-cobalt">10</span>. Can you guess it?
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            <input
              type="number"
              min={1}
              max={10}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="w-full sm:w-32 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-cobalt"
              placeholder="Your guess"
            />
            <button
              type="button"
              onClick={handleGuess}
              className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-sm font-medium shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform"
            >
              Try
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2.5 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Reset
            </button>
          </div>

          <p className="text-sm text-gray-300 mb-4 min-h-[1.5rem]">{message}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Attempts: <span className="text-gray-200 font-medium">{attempts}</span>
            </span>
            <span>
              Wins: <span className="text-gray-200 font-medium">{wins}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

