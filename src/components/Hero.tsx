import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" 
          alt="Cinema Background" 
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="small-caps mb-6">Annual Film Festival 2026</p>
          <h1 className="title-text mb-8">
            WHERE STORIES <br />
            <span className="text-white/40 italic">COME TO LIFE</span>
          </h1>
          <p className="text-white/60 max-w-md text-lg font-light leading-relaxed mb-10">
            Experience the world's most anticipated independent films in the heart of the city. 
            Join us for 10 days of cinematic excellence.
          </p>
          
          <div className="flex gap-6">
            <button className="px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
              Explore Program
            </button>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              Watch Trailer
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="flex flex-col items-end">
          <span className="small-caps mb-2">Next Screening</span>
          <span className="text-2xl font-light">Echoes of Eternity</span>
          <span className="text-white/40 text-sm italic">Tonight, 18:00</span>
        </div>
      </div>
    </section>
  );
}
