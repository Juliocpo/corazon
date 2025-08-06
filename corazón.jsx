// HeartApp.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const phrases = [
  "¡Eres increíble!",
  "Sigue brillando 💫",
  "¡Nunca te rindas!",
  "La vida es bella 💖",
  "Confía en ti 💪",
];

const heartRain = Array.from({ length: 15 }, (_, i) => i);

export default function HeartApp() {
  const [showPhrase, setShowPhrase] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [showHearts, setShowHearts] = useState(false);

  const handleClick = () => {
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(random);
    setShowHearts(true);
    setTimeout(() => {
      setShowHearts(false);
      setShowPhrase(true);
    }, 800); // Mostrar frase después de la animación de corazones

    setTimeout(() => setShowPhrase(false), 2800); // Ocultar frase 2s después
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <motion.button
        onClick={handleClick}
        className="bg-transparent text-pink-500"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Heart className="w-20 h-20 fill-pink-500" />
      </motion.button>

      {/* Animación de corazones */}
      <AnimatePresence>
        {showHearts &&
          heartRain.map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -200, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: id * 0.05 }}
              className="absolute text-pink-400 text-2xl"
              style={{ left: `${Math.random() * 100}%`, top: "50%" }}
            >
              ❤️
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Frase animada */}
      <AnimatePresence>
        {showPhrase && (
          <motion.div
            key="phrase"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{ duration: 0.6 }}
            className="absolute text-white text-2xl font-semibold text-center"
          >
            {phrase}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
