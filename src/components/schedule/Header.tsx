import { motion } from 'framer-motion';
import { Shield, Monitor, Eye, EyeOff, Calendar, Clock } from 'lucide-react';

interface HeaderProps {
  view: 'week' | 'day';
  setView: (v: 'week' | 'day') => void;
  focusMode: boolean;
  setFocusMode: (f: boolean) => void;
}

export default function Header({ view, setView, focusMode, setFocusMode }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="cyber-card rounded-lg p-4 mb-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary neon-text" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary pulse-neon" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground neon-text">
              Asri 07
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('week')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              view === 'week'
                ? 'bg-primary text-primary-foreground neon-border'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Semaine
          </button>
          <button
            onClick={() => setView('day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              view === 'day'
                ? 'bg-primary text-primary-foreground neon-border'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Jour
          </button>
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
              focusMode
                ? 'bg-secondary text-secondary-foreground neon-border-green'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {focusMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            Focus
          </button>
        </div>
      </div>
    </motion.header>
  );
}
