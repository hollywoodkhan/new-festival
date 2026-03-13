import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Ticket as TicketIcon, Calendar, MapPin, QrCode, Loader2 } from 'lucide-react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../utils/errorHandlers';

export default function Tickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    const ticketsPath = 'tickets';
    const q = query(
      collection(db, ticketsPath),
      where('userId', '==', auth.currentUser.uid),
      orderBy('purchaseDate', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTickets(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, ticketsPath);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="pt-40 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-white/40" size={40} />
        <p className="small-caps text-white/40">Loading your collection...</p>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-20 px-6 md:px-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <p className="small-caps mb-4">Your Collection</p>
        <h1 className="title-text text-6xl mb-16">MY TICKETS</h1>

        <div className="grid gap-8">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              <div className="glass rounded-3xl flex flex-col md:flex-row">
                {/* Left Side - Info */}
                <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <TicketIcon size={18} className="text-white" />
                    </div>
                    <span className="small-caps">Confirmed Ticket</span>
                  </div>

                  <h2 className="text-4xl font-light mb-8">{ticket.filmTitle}</h2>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <span className="small-caps text-white/40">Date & Time</span>
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-white/60" />
                        <span className="text-sm">
                          {ticket.date ? (
                            <>
                              {new Date(ticket.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {new Date(ticket.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </>
                          ) : 'TBA'}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="small-caps text-white/40">Venue</span>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-white/60" />
                        <span className="text-sm">{ticket.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - QR Code Area */}
                <div className="w-full md:w-64 bg-white p-8 md:p-12 flex flex-col items-center justify-center gap-4">
                  <div className="w-32 h-32 bg-black/5 rounded-xl flex items-center justify-center">
                    <QrCode size={80} className="text-black" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">#{ticket.id.slice(0, 8).toUpperCase()}</span>
                </div>

                {/* Decorative Ticket Notches */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-black hidden md:block" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 rounded-full bg-black hidden md:block" />
              </div>
            </motion.div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-40 glass rounded-3xl">
            <p className="text-white/40 italic">You haven't booked any tickets yet.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-6 small-caps text-white hover:underline"
            >
              Browse Program
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
