import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import { Course, categoryConfig } from '@/data/schedule';

interface StatusBarProps {
  currentCourse: Course | null;
  nextCourse: Course | null;
}

export default function StatusBar({ currentCourse, nextCourse }: StatusBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="cyber-card rounded-lg p-3 mb-4 flex flex-col sm:flex-row gap-3"
    >
      {/* Current */}
      <div className="flex-1 flex items-center gap-3">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-primary"
          />
        </div>
        {currentCourse ? (
          <div>
            <span className="text-[10px] uppercase text-muted-foreground">En cours</span>
            <p className="text-xs font-semibold text-primary">
              {categoryConfig[currentCourse.category].icon} {currentCourse.module}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Fin à {currentCourse.endTime}
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[10px] uppercase text-muted-foreground">Statut</span>
            <p className="text-xs text-foreground/60">Aucun cours en ce moment</p>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="hidden sm:block w-px bg-border" />

      {/* Next */}
      <div className="flex-1 flex items-center gap-3">
        <ArrowRight className="w-4 h-4 text-secondary" />
        {nextCourse ? (
          <div>
            <span className="text-[10px] uppercase text-muted-foreground">Prochain cours</span>
            <p className="text-xs font-semibold text-secondary">
              {categoryConfig[nextCourse.category].icon} {nextCourse.module}
            </p>
            <p className="text-[10px] text-muted-foreground">
              À {nextCourse.startTime}
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[10px] uppercase text-muted-foreground">Prochain</span>
            <p className="text-xs text-foreground/60">Aucun cours à venir</p>
          </div>
        )}
      </div>

      {/* Charge */}
      <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border">
        <Zap className="w-4 h-4 text-neon-yellow" />
        <div>
          <span className="text-[10px] uppercase text-muted-foreground">Charge cognitive</span>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`w-4 h-1.5 rounded-full ${
                  i <= 3 ? 'bg-neon-green' : i <= 4 ? 'bg-neon-yellow' : 'bg-neon-red'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
