import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import { Course } from '@/data/schedule';

interface CountdownTimerProps {
  currentCourse: Course | null;
  nextCourse: Course | null;
}

function getMinutesUntil(timeStr: string): number {
  const now = new Date();
  const [h, m] = timeStr.split(':').map(Number);
  return (h * 60 + m) - (now.getHours() * 60 + now.getMinutes());
}

export default function CountdownTimer({ currentCourse, nextCourse }: CountdownTimerProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  let label = '';
  let minutes = 0;

  if (currentCourse) {
    minutes = getMinutesUntil(currentCourse.endTime);
    label = 'Fin du cours dans';
  } else if (nextCourse) {
    minutes = getMinutesUntil(nextCourse.startTime);
    label = 'Prochain cours dans';
  }

  if (!label || minutes <= 0) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cyber-card rounded-lg p-3 mb-4 flex items-center justify-center gap-3"
    >
      <Timer className="w-4 h-4 text-secondary" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {hours > 0 && (
          <span className="bg-primary/20 text-primary font-bold text-sm px-2 py-0.5 rounded">
            {hours}h
          </span>
        )}
        <span className="bg-primary/20 text-primary font-bold text-sm px-2 py-0.5 rounded">
          {mins}min
        </span>
      </div>
    </motion.div>
  );
}
