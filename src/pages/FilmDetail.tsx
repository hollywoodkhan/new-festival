import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_FILMS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, DollarSign, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';

import { handleFirestoreError, OperationType } from '../utils/errorHandlers';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'confirmed'>('idle');
  const film = MOCK_FILMS.find(f => f.id === id);

  if (!film) return <div className="pt-32 px-20">Film not found</div>;

  const handleBooking = async (screeningId: string) => {
    if (!auth.currentUser) {
      alert("Please sign in to book tickets.");
      return;
    }

    const screening = film.screenings.find(s => s.id === screeningId);
    if (!screening) return;

    setBookingStatus('processing');

    try {
      // 1. Create a pending ticket in Firestore
      const ticketPath = 'tickets';
      try {
        await addDoc(collection(db, ticketPath), {
          filmId: film.id,
          screeningId: screening.id,
          userId: auth.currentUser.uid,
          purchaseDate: serverTimestamp(),
          status: 'active',
          filmTitle: film.title,
          venue: screening.venue,
          date: screening.date
        });
      } catch (error) {
        setBookingStatus('idle');
        handleFirestoreError(error, OperationType.CREATE, ticketPath);
      }

      // 2. Proceed to Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: `${film.title} - ${screening.venue}`,
            image: film.imageUrl,
            price: screening.price,
            quantity: 1
          }],
          successUrl: `${window.location.origin}/tickets?success=true`,
          cancelUrl: `${window.location.origin}/film/${film.id}?cancelled=true`
        })
      });

      const session = await response.json();
      
      if (session.url) {
        setBookingStatus('confirmed');
        // Brief delay to show the success message before redirect
        setTimeout(() => {
          window.location.href = session.url;
        }, 1500);
      } else {
        setBookingStatus('idle');
      }
    } catch (error) {
      setBookingStatus('idle');
      console.error('Booking error:', error);
    }
  };

  return (
    <main className="pt-32 pb-20 px-6 md:px-20">
      <AnimatePresence>
        {bookingStatus !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center"
            >
              {bookingStatus === 'processing' ? (
                <>
                  <Loader2 className="w-16 h-16 text-white/20 animate-spin mx-auto mb-8" />
                  <h2 className="title-text text-4xl mb-4">PROCESSING</h2>
                  <p className="text-white/40 small-caps">Securing your seat at the festival...</p>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
                  <h2 className="title-text text-4xl mb-4 text-emerald-500">CONFIRMED</h2>
                  <p className="text-white/40 small-caps">Ticket reserved! Redirecting to payment...</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/40 hover:text-white mb-12 transition-colors group"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="small-caps">Back to Program</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img 
            src={film.imageUrl} 
            alt={film.title} 
            className="w-full aspect-[2/3] object-cover rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="flex gap-4 mb-6">
            {film.genre.map(g => (
              <span key={g} className="small-caps border border-white/20 px-3 py-1 rounded-full">{g}</span>
            ))}
            <span className="small-caps bg-white text-black px-3 py-1 rounded-full">{film.rating}</span>
          </div>
          
          <h1 className="title-text text-7xl mb-6">{film.title}</h1>
          <p className="text-white/40 italic mb-8">Directed by {film.director} • {film.duration} minutes</p>
          
          <p className="text-white/60 text-xl font-light leading-relaxed mb-12">
            {film.description}
          </p>

          <div className="space-y-6">
            <h3 className="small-caps text-white">Screenings & Tickets</h3>
            <div className="grid gap-4">
              {film.screenings.map(screening => (
                <div 
                  key={screening.id}
                  className="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 group hover:bg-white/10 transition-all"
                >
                  <div className="flex gap-8">
                    <div className="flex items-center gap-3 text-white/60">
                      <Calendar size={18} />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {new Date(screening.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider">
                          {new Date(screening.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <MapPin size={18} />
                      <span className="text-sm font-medium text-white">{screening.venue}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-xl font-light">
                      <span className="text-white/40 text-sm">$</span>
                      {screening.price}
                    </div>
                    <button 
                      onClick={() => handleBooking(screening.id)}
                      className="px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
