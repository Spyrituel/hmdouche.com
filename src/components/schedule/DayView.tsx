import { motion } from 'framer-motion';
import { Course, DAYS } from '@/data/schedule';
import CourseCard from './CourseCard';

interface DayViewProps {
  courses: Course[];
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  currentCourse: Course | null;
  nextCourse: Course | null;
  notes: Record<string, string>;
  filterModule: string | null;
  onCourseClick: (course: Course) => void;
}

export default function DayView({ courses, selectedDay, setSelectedDay, currentCourse, nextCourse, notes, filterModule, onCourseClick }: DayViewProps) {
  const dayCourses = courses
    .filter(c => c.day === selectedDay && (!filterModule || c.module === filterModule))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div>
      {/* Day selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded text-xs font-medium whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-primary text-primary-foreground neon-border'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

        {dayCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground text-sm"
          >
            Aucun cours ce jour
          </motion.div>
        ) : (
          dayCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative mb-4"
            >
              <div className={`absolute left-[-21px] w-3 h-3 rounded-full border-2 ${
                currentCourse?.id === course.id
                  ? 'bg-primary border-primary pulse-neon'
                  : 'bg-muted border-border'
              }`} />
              <CourseCard
                course={course}
                isActive={currentCourse?.id === course.id}
                isNext={nextCourse?.id === course.id}
                note={notes[course.id]}
                onClick={() => onCourseClick(course)}
              />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
