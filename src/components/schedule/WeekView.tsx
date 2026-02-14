import { motion } from 'framer-motion';
import { Course, DAYS, TIME_SLOTS, categoryConfig } from '@/data/schedule';
import CourseCard from './CourseCard';

const categoryColors: Record<string, string> = {
  'neon-blue': 'border-neon-blue/40 bg-neon-blue/5',
  'neon-green': 'border-neon-green/40 bg-neon-green/5',
  'neon-purple': 'border-neon-purple/40 bg-neon-purple/5',
  'neon-red': 'border-neon-red/40 bg-neon-red/5',
  'neon-yellow': 'border-neon-yellow/40 bg-neon-yellow/5',
};

interface WeekViewProps {
  courses: Course[];
  currentCourse: Course | null;
  nextCourse: Course | null;
  notes: Record<string, string>;
  filterModule: string | null;
  onCourseClick: (course: Course) => void;
}

export default function WeekView({ courses, currentCourse, nextCourse, notes, filterModule, onCourseClick }: WeekViewProps) {
  const filteredCourses = filterModule
    ? courses.filter(c => c.module === filterModule)
    : courses;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Header */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <div className="p-2 text-xs text-muted-foreground font-medium">Horaires</div>
          {DAYS.map(day => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2 text-xs font-bold text-foreground text-center"
            >
              {day}
            </motion.div>
          ))}
        </div>

        {/* Time slots */}
        {TIME_SLOTS.map((slot, i) => (
          <motion.div
            key={slot.start}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-6 gap-2 mb-2"
          >
            <div className="p-2 text-[11px] text-muted-foreground flex items-center">
              {slot.start}
              <span className="mx-1 text-border">—</span>
              {slot.end}
            </div>
            {DAYS.map(day => {
              const course = filteredCourses.find(c =>
                c.day === day && c.startTime <= slot.start && c.endTime >= slot.end
              );

              if (!course) {
                return (
                  <div key={`${day}-${slot.start}`} className="rounded-lg border border-border/30 bg-muted/20 min-h-[60px]" />
                );
              }

              // Check if this is the first slot for this course
              const firstSlotIndex = TIME_SLOTS.findIndex(s => s.start >= course.startTime);
              const isFirstSlot = firstSlotIndex === i;

              if (isFirstSlot) {
                // Count how many slots this course spans
                const spanCount = TIME_SLOTS.filter(
                  s => s.start >= course.startTime && s.end <= course.endTime
                ).length || 1;

                return (
                  <div key={course.id} style={spanCount > 1 ? { gridRow: `span ${spanCount}` } : undefined}>
                    <CourseCard
                      course={course}
                      isActive={currentCourse?.id === course.id}
                      isNext={nextCourse?.id === course.id}
                      note={notes[course.id]}
                      onClick={() => onCourseClick(course)}
                      compact
                    />
                  </div>
                );
              }

              // Non-first slot of a spanning course: render continuation
              return (
                <div
                  key={`${day}-${slot.start}`}
                  onClick={() => onCourseClick(course)}
                  className={`rounded-lg border border-dashed cursor-pointer min-h-[60px] flex items-center justify-center text-[10px] text-muted-foreground transition-all hover:bg-muted/30 ${
                    categoryColors[categoryConfig[course.category].color] || ''
                  }`}
                >
                  ↕ {course.module.split(' ').slice(0, 2).join(' ')}…
                </div>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
