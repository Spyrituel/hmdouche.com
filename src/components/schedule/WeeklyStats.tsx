import { motion } from 'framer-motion';
import { BarChart3, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Course, categoryConfig, isTechnicalModule } from '@/data/schedule';

interface WeeklyStatsProps {
  courses: Course[];
}

export default function WeeklyStats({ courses }: WeeklyStatsProps) {
  // Count hours per category
  const categoryHours: Record<string, number> = {};
  let totalHours = 0;
  let techHours = 0;

  courses.forEach(course => {
    const start = course.startTime.split(':').map(Number);
    const end = course.endTime.split(':').map(Number);
    const hours = (end[0] * 60 + end[1] - start[0] * 60 - start[1]) / 60;
    totalHours += hours;

    const cat = categoryConfig[course.category].label;
    categoryHours[cat] = (categoryHours[cat] || 0) + hours;

    if (isTechnicalModule(course.category)) {
      techHours += hours;
    }
  });

  const uniqueModules = new Set(courses.map(c => c.module)).size;
  const techPercent = totalHours > 0 ? Math.round((techHours / totalHours) * 100) : 0;

  const sortedCategories = Object.entries(categoryHours)
    .sort((a, b) => b[1] - a[1]);

  const maxHours = Math.max(...Object.values(categoryHours), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="cyber-card rounded-lg p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Statistiques de la semaine</h3>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-muted/30 rounded-lg p-2 text-center">
          <Clock className="w-3.5 h-3.5 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground">{totalHours.toFixed(1)}h</p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-2 text-center">
          <BookOpen className="w-3.5 h-3.5 mx-auto text-secondary mb-1" />
          <p className="text-lg font-bold text-foreground">{uniqueModules}</p>
          <p className="text-[10px] text-muted-foreground">Modules</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-2 text-center">
          <TrendingUp className="w-3.5 h-3.5 mx-auto text-neon-purple mb-1" />
          <p className="text-lg font-bold text-foreground">{techPercent}%</p>
          <p className="text-[10px] text-muted-foreground">Technique</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="space-y-2">
        {sortedCategories.map(([cat, hours]) => (
          <div key={cat} className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-16 truncate">{cat}</span>
            <div className="flex-1 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(hours / maxHours) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              />
            </div>
            <span className="text-[10px] text-foreground font-medium w-8 text-right">{hours.toFixed(1)}h</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
