import React, { useState, useEffect } from 'react';
import { Film, User, Ticket, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <Film size={18} />
            </div>
            <span className="small-caps text-white">CineFest</span>
          </Link>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          {user && (
            <Link to="/tickets" className="glass px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Ticket size={14} className="text-white/60" />
              <span className="text-xs font-medium">My Tickets</span>
            </Link>
          )}
          
          {user ? (
            <div className="flex gap-2">
              <div className="glass w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/10">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <User size={16} />
                )}
              </div>
              <button 
                onClick={() => signOut(auth)}
                className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="glass px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
}
