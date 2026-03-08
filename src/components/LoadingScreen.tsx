import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { InteractiveCoin } from './three/InteractiveCoin';

export const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Entering the Trenches...", "Initializing Mint Engine...", "Ready to Launch"];

  useEffect(() => {
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1000);

    const finishTimer = setTimeout(() => {
      onFinished();
    }, 3500);

    return () => {
      clearInterval(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative w-64 h-64 mb-8">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFC247" />
          <Suspense fallback={null}>
            <InteractiveCoin size="medium" interactive={false} />
          </Suspense>
        </Canvas>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gold-primary/10 blur-3xl -z-10"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-display text-gold-primary tracking-widest text-glow-gold"
        >
          {texts[textIndex]}
        </motion.p>
      </AnimatePresence>
      
      <div className="mt-12 w-64 h-1 progress-track rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full progress-fill shadow-[0_0_10px_#FFB800]"
        />
      </div>
    </motion.div>
  );
};
