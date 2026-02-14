import { motion } from 'framer-motion';
import { Course, DAYS, TIME_SLOTS } from '@/data/schedule';
import CourseCard from './CourseCard';

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

              // Only render card on first matching slot
              const isFirstSlot = course.startTime === slot.start ||
                (TIME_SLOTS.findIndex(s => s.start >= course.startTime) === i);

              if (!isFirstSlot) {
                return <div key={`${day}-${slot.start}`} />;
              }

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  isActive={currentCourse?.id === course.id}
                  isNext={nextCourse?.id === course.id}
                  note={notes[course.id]}
                  onClick={() => onCourseClick(course)}
                  compact
                />
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
