import React from 'react';
import { Twitter, Send, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black mb-6">MINTSY</h2>
            <p className="text-white/40 max-w-sm mb-8">
              The smart degen launchpad on Solana. 
              Built for communities, powered by transparency.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-gold-primary transition-colors">
                <Send size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white/80">PLATFORM</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-gold-primary transition-colors">Launchpad</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Explore</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Rewards</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white/80">LEGAL</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#" className="hover:text-gold-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gold-primary transition-colors">Risk Disclosure</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/20">
          <p>© 2026 Mintsy. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span>Audited by TrenchGuard</span>
          </div>
        </div>
      </div>
      
      {/* Subtle particle effect in background */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gold-deep/5 to-transparent -z-10" />
    </footer>
  );
};
