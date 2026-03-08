import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { InteractiveCoin } from './three/InteractiveCoin';
import { motion } from 'motion/react';

export const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between glass border-b-0"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <InteractiveCoin size="small" interactive={true} />
            </Suspense>
          </Canvas>
        </div>
        <span className="text-2xl font-black tracking-tighter text-glow-gold">MINTSY</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest text-white/60">
        <a href="#" className="hover:text-gold-primary transition-colors">LAUNCHPAD</a>
        <a href="#" className="hover:text-gold-primary transition-colors">TRENCHES</a>
        <a href="#" className="hover:text-gold-primary transition-colors">REWARDS</a>
        <button className="px-6 py-2 gold-gradient text-background rounded-lg gold-glow gold-glow-hover transition-all">
          CONNECT
        </button>
      </div>
    </motion.nav>
  );
};
