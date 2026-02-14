import { useState } from 'react';
import { useScheduleStore, getCurrentCourse, getNextCourse } from '@/hooks/useScheduleStore';
import { Course } from '@/data/schedule';
import Header from '@/components/schedule/Header';
import StatusBar from '@/components/schedule/StatusBar';
import ModuleFilter from '@/components/schedule/ModuleFilter';
import WeekView from '@/components/schedule/WeekView';
import DayView from '@/components/schedule/DayView';
import CourseModal from '@/components/schedule/CourseModal';
import FocusMode from '@/components/schedule/FocusMode';

const Index = () => {
  const store = useScheduleStore();
  const [modalCourse, setModalCourse] = useState<Course | null>(null);

  const currentCourse = getCurrentCourse(store.courses);
  const nextCourse = getNextCourse(store.courses);

  return (
    <div className="min-h-screen bg-background scanline">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <Header
          view={store.view}
          setView={store.setView}
          focusMode={store.focusMode}
          setFocusMode={store.setFocusMode}
        />

        <StatusBar currentCourse={currentCourse} nextCourse={nextCourse} />

        {store.focusMode ? (
          <FocusMode currentCourse={currentCourse} nextCourse={nextCourse} />
        ) : (
          <>
            <ModuleFilter
              courses={store.courses}
              selectedModule={store.selectedModule}
              setSelectedModule={store.setSelectedModule}
            />

            <div className="cyber-card rounded-lg p-4">
              {store.view === 'week' ? (
                <WeekView
                  courses={store.courses}
                  currentCourse={currentCourse}
                  nextCourse={nextCourse}
                  notes={store.notes}
                  filterModule={store.selectedModule}
                  onCourseClick={setModalCourse}
                />
              ) : (
                <DayView
                  courses={store.courses}
                  selectedDay={store.selectedDay}
                  setSelectedDay={store.setSelectedDay}
                  currentCourse={currentCourse}
                  nextCourse={nextCourse}
                  notes={store.notes}
                  filterModule={store.selectedModule}
                  onCourseClick={setModalCourse}
                />
              )}
            </div>
          </>
        )}
      </div>

      {modalCourse && (
        <CourseModal
          course={modalCourse}
          note={store.notes[modalCourse.id] || ''}
          onClose={() => setModalCourse(null)}
          onSaveNote={store.setNote}
        />
      )}
    </div>
  );
};

export default Index;
