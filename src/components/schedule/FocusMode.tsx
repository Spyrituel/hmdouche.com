import { motion } from 'framer-motion';
import { Eye, Clock, BookOpen } from 'lucide-react';
import { Course, categoryConfig, moduleInfoMap } from '@/data/schedule';

interface FocusModeProps {
  currentCourse: Course | null;
  nextCourse: Course | null;
}

export default function FocusMode({ currentCourse, nextCourse }: FocusModeProps) {
  const course = currentCourse || nextCourse;

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <Eye className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-display text-muted-foreground">Aucun cours actuellement</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Profite de la pause 🎉</p>
      </motion.div>
    );
  }

  const config = categoryConfig[course.category];
  const info = moduleInfoMap[course.module];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <div className="cyber-card neon-border rounded-lg p-6 text-center scanline">
        <motion.div
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-4xl mb-3 block">{config.icon}</span>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
            {currentCourse ? '▶ EN COURS' : '⏭ PROCHAIN'}
          </p>
          <h2 className="font-display text-xl font-bold text-foreground neon-text mb-2">
            {course.module}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {course.startTime} — {course.endTime}
          </div>
        </motion.div>

        {info && (
          <div className="mt-6 text-left space-y-3">
            <div className="p-3 rounded bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-foreground">Quick Prep</span>
              </div>
              <ul className="space-y-1">
                {info.revision.preClassReview.slice(0, 3).map((r, i) => (
                  <li key={i} className="text-[11px] text-foreground/70 flex items-start gap-2">
                    <span className="text-secondary">✓</span> {r}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-muted-foreground mt-2">
                ⏱ Préparation : {info.revision.prepTime}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
