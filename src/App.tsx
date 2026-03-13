import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FilmDetail from './pages/FilmDetail';
import Tickets from './pages/Tickets';
import { AuthProvider } from './AuthContext';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      let message = "Something went wrong.";
      try {
        const parsed = JSON.parse(this.state.error.message);
        if (parsed.error) message = `Permission Error: ${parsed.operationType} on ${parsed.path}`;
      } catch (e) {}
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-10 text-center">
          <div className="glass p-12 rounded-3xl max-w-lg">
            <h2 className="title-text text-4xl mb-6">SYSTEM ERROR</h2>
            <p className="text-white/60 mb-8">{message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-full bg-white text-black font-bold"
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/film/:id" element={<FilmDetail />} />
              <Route path="/tickets" element={<Tickets />} />
            </Routes>
            
            <footer className="px-6 py-20 border-t border-white/10 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div>
              <h2 className="title-text text-4xl mb-4">CINEFEST</h2>
              <p className="small-caps">© 2026 Global Film Festival</p>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col gap-2">
                <span className="small-caps">Social</span>
                <a href="#" className="text-sm text-white/60 hover:text-white">Instagram</a>
                <a href="#" className="text-sm text-white/60 hover:text-white">Twitter</a>
              </div>
              <div className="flex flex-col gap-2">
                <span className="small-caps">Legal</span>
                <a href="#" className="text-sm text-white/60 hover:text-white">Privacy</a>
                <a href="#" className="text-sm text-white/60 hover:text-white">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
