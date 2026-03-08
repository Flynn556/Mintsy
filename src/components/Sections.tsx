import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { Send, Rocket, TrendingUp, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { Canvas } from '@react-three/fiber';
import { InteractiveCoin } from './three/InteractiveCoin';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-48 h-48 mx-auto mb-8">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFC247" />
              <Suspense fallback={null}>
                <InteractiveCoin size="medium" interactive={true} />
              </Suspense>
            </Canvas>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            MINTSY
          </h1>
          <p className="text-xl md:text-3xl font-display text-gold-primary mb-8 tracking-tighter text-glow-gold">
            The Smart Degen Launchpad on Solana
          </p>
          <p className="max-w-2xl mx-auto text-lg text-white/60 mb-12">
            Launch memecoins with zero deploy fees. HODL and earn rewards from every trade. 
            Built for the trenches, powered by the community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-8 py-4 gold-gradient text-background font-bold rounded-[12px] overflow-hidden transition-all hover:scale-105 gold-glow gold-glow-hover">
            <span className="relative z-10 flex items-center gap-2">
              <Rocket size={20} />
              LAUNCH A COIN
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          
          <button className="px-8 py-4 glass text-white font-bold rounded-[12px] transition-all hover:bg-white/10 hover:scale-105">
            EXPLORE THE TRENCHES
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex items-center justify-center gap-8"
        >
          <a href="#" className="text-white/40 hover:text-gold-primary transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="text-white/40 hover:text-gold-primary transition-colors"><Send size={24} /></a>
        </motion.div>
      </div>
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-deep/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
};

export const StorySection = () => {
  const scenes = [
    {
      title: "The Trenches Are Brutal",
      text: "Snipers dominate launches. Bots dump instantly. Real traders lose in the chaos of the old system.",
      icon: <TrendingUp className="text-chart-orange" />,
      color: "from-chart-orange/20"
    },
    {
      title: "The Old System Is Broken",
      text: "Memecoin launches should reward communities — not just the fastest bots. It's time for a smarter way to launch.",
      icon: <ShieldCheck className="text-gold-deep" />,
      color: "from-gold-deep/20"
    },
    {
      title: "Mintsy Changes the Game",
      text: "Zero deploy fees. Fair launches. HODL rewards that redistribute incentives back to the real believers.",
      icon: <Rocket className="text-gold-primary" />,
      color: "from-gold-primary/20"
    }
  ];

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={cn(
                "p-8 rounded-3xl glass relative overflow-hidden group",
                "hover:border-gold-primary/30 transition-all duration-500"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", scene.color)} />
              <div className="relative z-10">
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit">
                  {scene.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{scene.title}</h3>
                <p className="text-white/60 leading-relaxed">{scene.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
