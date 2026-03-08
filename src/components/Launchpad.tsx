import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Users, Wallet, TrendingUp, Award } from 'lucide-react';
import { cn } from '../lib/utils';

export const LiveLaunchpad = () => {
  const tokens = [
    { name: "PEPE SOL", ticker: "$PSOL", price: "+12.5%", mcap: "$1.2M", holders: "4.2k", rewards: "45 SOL" },
    { name: "DOGE MINT", ticker: "$DMINT", price: "+45.2%", mcap: "$850k", holders: "2.1k", rewards: "12 SOL" },
    { name: "TRENCH CAT", ticker: "$TCAT", price: "-5.1%", mcap: "$420k", holders: "1.5k", rewards: "8 SOL" },
    { name: "SOLANA FROG", ticker: "$SFROG", price: "+120%", mcap: "$2.5M", holders: "8.9k", rewards: "150 SOL" },
  ];

  return (
    <section className="py-32 px-6 bg-background-alt/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Live Launchpad</h2>
            <p className="text-white/60">Real-time action from the Mintsy trenches.</p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 glass rounded-full text-sm font-display text-gold-primary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
              LIVE FEED
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokens.map((token, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-6 rounded-3xl cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-deep to-gold-primary flex items-center justify-center text-xl font-bold text-background">
                  {token.name[0]}
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  token.price.startsWith('+') ? "bg-gold-primary/20 text-gold-primary" : "bg-chart-orange/20 text-chart-orange"
                )}>
                  {token.price}
                </div>
              </div>
              
              <h4 className="text-xl font-bold mb-1">{token.name}</h4>
              <p className="text-white/40 text-sm mb-6">{token.ticker}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Market Cap</span>
                  <span className="font-mono">{token.mcap}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Holders</span>
                  <span className="font-mono">{token.holders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Rewards</span>
                  <span className="text-gold-primary font-bold">{token.rewards}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl bg-white/5 group-hover:gold-gradient group-hover:text-background transition-all font-bold text-sm">
                VIEW TOKEN
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RewardsSystem = () => {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              HODL <span className="text-gold-primary">REWARDS</span> SYSTEM
            </h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Mintsy redistributes trading activity back to the community. 
              Every trade contributes to a reward pool shared among token holders.
            </p>
            
            <div className="space-y-8">
              {[
                { title: "Volume Generation", desc: "Trading activity creates fees.", icon: <TrendingUp className="text-chart-orange" /> },
                { title: "Fee Pool", desc: "Fees are collected in a smart contract.", icon: <Wallet className="text-gold-deep" /> },
                { title: "Holder Distribution", desc: "Rewards flow directly to holders.", icon: <Award className="text-gold-primary" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square glass rounded-[40px] flex items-center justify-center p-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-deep/10 via-transparent to-gold-primary/10 rounded-[40px]" />
              
              {/* Animated Diagram Placeholder */}
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-12">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-gold-deep flex items-center justify-center shadow-[0_0_40px_rgba(232,163,23,0.5)]"
                >
                  <TrendingUp size={40} className="text-background" />
                </motion.div>
                
                <div className="w-1 h-20 bg-gradient-to-b from-gold-deep to-gold-primary relative">
                   <motion.div 
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]"
                   />
                </div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="w-24 h-24 rounded-full bg-gold-primary flex items-center justify-center shadow-[0_0_40px_rgba(255,194,71,0.5)]"
                >
                  <Users size={40} className="text-background" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const JoinTrenches = () => {
  const [count, setCount] = useState(12842);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setCount(prev => prev + 1);
    }, 1500);
  };

  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-primary/5 -z-10" />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-8">JOIN THE TRENCHES</h2>
        <div className="mb-12">
          <span className="text-6xl md:text-8xl font-mono font-bold text-gold-primary text-glow-gold">
            {count.toLocaleString()}
          </span>
          <p className="text-white/40 mt-4 font-display tracking-widest">ACTIVE TRENCH MEMBERS</p>
        </div>
        
        <button 
          onClick={handleConnect}
          disabled={isConnecting}
          className="group relative px-12 py-6 bg-white text-background font-black rounded-[12px] overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:opacity-50 gold-glow-hover"
        >
          <span className="relative z-10 flex items-center gap-3 text-xl">
            <Wallet size={24} />
            {isConnecting ? "CONNECTING..." : "CONNECT WALLET"}
          </span>
          <div className="absolute inset-0 gold-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
        
        <p className="mt-8 text-white/40 text-sm">Supports Phantom, Solflare, and more.</p>
      </div>
    </section>
  );
};
