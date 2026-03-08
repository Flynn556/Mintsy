import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { MintsyCoin, Particles } from './components/three/Scene';
import { Hero, StorySection } from './components/Sections';
import { LiveLaunchpad, RewardsSystem, JoinTrenches } from './components/Launchpad';
import { Footer } from './components/Footer';

import { Navbar } from './components/Navbar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="relative bg-background min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onFinished={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFC247" />
              
              <Suspense fallback={null}>
                <MintsyCoin scrollProgress={scrollProgress} />
                <Particles count={500} />
              </Suspense>
            </Canvas>
          </div>

          <main className="relative z-10">
            <ScrollTracker onScroll={setScrollProgress} />
            
            <Hero />
            <StorySection />
            
            <section className="py-32 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { step: "01", title: "Create a Coin", desc: "Mint your token in seconds with no upfront deploy fees." },
                    { step: "02", title: "Launch to Trenches", desc: "Fair launch mechanism ensures community gets first dibs." },
                    { step: "03", title: "HODL and Earn", desc: "Earn rewards from every trade directly in your wallet." }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="p-10 glass rounded-[24px] relative group"
                    >
                      <span className="text-6xl font-black text-white/5 absolute top-4 right-8 group-hover:text-gold-primary/10 transition-colors">
                        {item.step}
                      </span>
                      <h3 className="text-2xl font-bold mb-4 text-gold-primary">{item.title}</h3>
                      <p className="text-white/60">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <LiveLaunchpad />
            <RewardsSystem />
            <JoinTrenches />
            
            <section className="py-32 px-6 bg-background-alt">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-12">JOIN THE COMMUNITY</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <a href="https://x.com/mintsyfun" className="p-12 glass rounded-3xl hover:border-gold-primary/50 transition-all group">
                    <div className="text-gold-primary mb-6 flex justify-center group-hover:scale-110 transition-transform">
                      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      </motion.div>
                    </div>
                    <h4 className="text-2xl font-bold">TWITTER</h4>
                  </a>
                  <a href="https://t.me/mintsyfun" className="p-12 glass rounded-3xl hover:border-gold-secondary/50 transition-all group">
                    <div className="text-gold-secondary mb-6 flex justify-center group-hover:scale-110 transition-transform">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.89.03-.24.36-.49.99-.75 3.87-1.68 6.45-2.79 7.74-3.33 3.68-1.54 4.44-1.81 4.94-1.82.11 0 .35.03.5.16.13.1.17.24.18.34.02.06.02.18 0 .28z"/></svg>
                      </motion.div>
                    </div>
                    <h4 className="text-2xl font-bold">TELEGRAM</h4>
                  </a>
                </div>
              </div>
            </section>

            <Footer />
          </main>
        </>
      )}
  </div>
);
}

function ScrollTracker({ onScroll }: { onScroll: (progress: number) => void }) {
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      onScroll(latest);
    });
  }, [scrollYProgress, onScroll]);

  return null;
}
