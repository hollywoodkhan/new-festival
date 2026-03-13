import React from 'react';
import Hero from '../components/Hero';
import FilmCard from '../components/FilmCard';
import { MOCK_FILMS } from '../constants';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      
      <section className="px-6 md:px-20 py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="small-caps mb-4">The Selection</p>
            <h2 className="title-text text-6xl">FEATURED FILMS</h2>
          </div>
          <div className="hidden md:block">
            <p className="text-white/40 text-sm max-w-xs text-right italic">
              A curated collection of the most compelling stories from around the globe.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {MOCK_FILMS.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FilmCard 
                film={film} 
                onClick={() => navigate(`/film/${film.id}`)} 
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-20 py-24 bg-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000" 
              alt="Festival Venue" 
              className="rounded-3xl grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="small-caps mb-6">Venues</p>
            <h2 className="title-text text-5xl mb-8">THE GRAND THEATER</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Our flagship venue, the historic Grand Theater, features state-of-the-art 4K projection 
              and Dolby Atmos sound. Experience cinema as it was meant to be seen.
            </p>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              View All Venues
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
