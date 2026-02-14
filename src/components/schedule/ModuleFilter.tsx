import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Course, categoryConfig } from '@/data/schedule';

interface ModuleFilterProps {
  courses: Course[];
  selectedModule: string | null;
  setSelectedModule: (m: string | null) => void;
}

export default function ModuleFilter({ courses, selectedModule, setSelectedModule }: ModuleFilterProps) {
  const uniqueModules = [...new Set(courses.map(c => c.module))];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Filtrer par module</span>
        {selectedModule && (
          <button
            onClick={() => setSelectedModule(null)}
            className="ml-auto flex items-center gap-1 text-[10px] text-destructive hover:text-destructive/80"
          >
            <X className="w-3 h-3" /> Effacer
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {uniqueModules.map(mod => {
          const course = courses.find(c => c.module === mod)!;
          const config = categoryConfig[course.category];
          const isSelected = selectedModule === mod;

          return (
            <motion.button
              key={mod}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedModule(isSelected ? null : mod)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border transition-all ${
                isSelected
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20'
              }`}
            >
              <span>{config.icon}</span>
              <span className="max-w-[120px] truncate">{mod}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
