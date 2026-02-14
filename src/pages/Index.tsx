import { useState } from 'react';
import { useScheduleStore, getCurrentCourse, getNextCourse } from '@/hooks/useScheduleStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Course } from '@/data/schedule';
import Header from '@/components/schedule/Header';
import StatusBar from '@/components/schedule/StatusBar';
import CountdownTimer from '@/components/schedule/CountdownTimer';
import WeeklyStats from '@/components/schedule/WeeklyStats';
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

  useKeyboardShortcuts({
    setView: store.setView,
    setFocusMode: store.setFocusMode,
    focusMode: store.focusMode,
    view: store.view,
  });

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
        <CountdownTimer currentCourse={currentCourse} nextCourse={nextCourse} />

        {store.focusMode ? (
          <FocusMode currentCourse={currentCourse} nextCourse={nextCourse} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
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
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <WeeklyStats courses={store.courses} />

                {/* Keyboard shortcuts help */}
                <div className="cyber-card rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground font-bold mb-2 uppercase">Raccourcis clavier</p>
                  <div className="space-y-1">
                    {[
                      ['W', 'Vue semaine'],
                      ['D', 'Vue jour'],
                      ['F', 'Mode focus'],
                    ].map(([key, label]) => (
                      <div key={key} className="flex items-center gap-2">
                        <kbd className="bg-muted text-foreground text-[10px] px-1.5 py-0.5 rounded border border-border font-mono">
                          {key}
                        </kbd>
                        <span className="text-[10px] text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
