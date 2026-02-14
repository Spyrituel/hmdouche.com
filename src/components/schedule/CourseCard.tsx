import { motion } from 'framer-motion';
import { Clock, StickyNote, Zap } from 'lucide-react';
import { Course, categoryConfig, isTechnicalModule } from '@/data/schedule';

interface CourseCardProps {
  course: Course;
  isActive: boolean;
  isNext: boolean;
  note?: string;
  onClick: () => void;
  compact?: boolean;
}

const categoryColors: Record<string, string> = {
  'neon-blue': 'border-neon-blue/40 bg-neon-blue/5',
  'neon-green': 'border-neon-green/40 bg-neon-green/5',
  'neon-purple': 'border-neon-purple/40 bg-neon-purple/5',
  'neon-red': 'border-neon-red/40 bg-neon-red/5',
  'neon-yellow': 'border-neon-yellow/40 bg-neon-yellow/5',
};

const categoryTextColors: Record<string, string> = {
  'neon-blue': 'text-neon-blue',
  'neon-green': 'text-neon-green',
  'neon-purple': 'text-neon-purple',
  'neon-red': 'text-neon-red',
  'neon-yellow': 'text-neon-yellow',
};

export default function CourseCard({ course, isActive, isNext, note, onClick, compact }: CourseCardProps) {
  const config = categoryConfig[course.category];
  const colorClass = categoryColors[config.color] || '';
  const textColor = categoryTextColors[config.color] || 'text-primary';
  const isTech = isTechnicalModule(course.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg border p-3 transition-all glitch-hover ${colorClass} ${
        isActive ? 'ring-2 ring-primary neon-border' : ''
      } ${isNext ? 'ring-1 ring-secondary/50' : ''}`}
    >
      {isActive && (
        <motion.div
          className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-primary"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-primary" />
          EN COURS
        </motion.div>
      )}

      {isNext && !isActive && (
        <div className="absolute top-2 right-2 text-[10px] font-medium text-secondary">
          PROCHAIN →
        </div>
      )}

      {isTech && (
        <Zap className={`absolute bottom-2 right-2 w-3.5 h-3.5 ${textColor} opacity-50`} />
      )}

      <div className="flex items-start gap-2">
        <span className="text-lg">{config.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold truncate ${textColor}`}>
            {course.module}
          </p>
          {!compact && (
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                {course.startTime} - {course.endTime}
              </span>
              {note && (
                <StickyNote className="w-3 h-3 text-neon-yellow" />
              )}
            </div>
          )}
          {compact && (
            <span className="text-[10px] text-muted-foreground">
              {course.startTime}-{course.endTime}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
