import React from 'react';
import { Film } from '../types';
import { motion } from 'motion/react';
import { Play, Clock, Star } from 'lucide-react';

interface FilmCardProps {
  film: Film;
  onClick: () => void;
}

export default function FilmCard({ film, onClick }: FilmCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl mb-4">
        <img 
          src={film.imageUrl} 
          alt={film.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
            <Play fill="white" size={24} />
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {film.rating}
          </span>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-light group-hover:text-white/80 transition-colors">{film.title}</h3>
          <div className="flex items-center gap-1 text-white/40">
            <Clock size={12} />
            <span className="text-[10px]">{film.duration}m</span>
          </div>
        </div>
        <p className="text-white/40 text-xs italic">{film.director}</p>
        <div className="flex gap-2 pt-2">
          {film.genre.map(g => (
            <span key={g} className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5 rounded">
              {g}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
