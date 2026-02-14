import { useState, useEffect, useCallback } from 'react';
import { Course, defaultSchedule } from '@/data/schedule';

interface ScheduleStore {
  courses: Course[];
  notes: Record<string, string>;
  view: 'week' | 'day';
  selectedDay: string;
  selectedModule: string | null;
  focusMode: boolean;
  setCourses: (courses: Course[]) => void;
  setNote: (courseId: string, note: string) => void;
  setView: (view: 'week' | 'day') => void;
  setSelectedDay: (day: string) => void;
  setSelectedModule: (module: string | null) => void;
  setFocusMode: (focus: boolean) => void;
}

const STORAGE_KEY = 'cyber-schedule';
const NOTES_KEY = 'cyber-schedule-notes';

function getDayName(): string {
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  return days[new Date().getDay()];
}

export function useScheduleStore(): ScheduleStore {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSchedule;
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(NOTES_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [view, setView] = useState<'week' | 'day'>('week');
  const [selectedDay, setSelectedDay] = useState(getDayName());
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const setNote = useCallback((courseId: string, note: string) => {
    setNotes(prev => ({ ...prev, [courseId]: note }));
  }, []);

  return {
    courses, notes, view, selectedDay, selectedModule, focusMode,
    setCourses, setNote, setView, setSelectedDay, setSelectedModule, setFocusMode,
  };
}

export function getCurrentCourse(courses: Course[]): Course | null {
  const now = new Date();
  const dayName = getDayName();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return courses.find(c =>
    c.day === dayName && c.startTime <= currentTime && c.endTime > currentTime
  ) || null;
}

export function getNextCourse(courses: Course[]): Course | null {
  const now = new Date();
  const dayName = getDayName();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const todayCourses = courses
    .filter(c => c.day === dayName && c.startTime > currentTime)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return todayCourses[0] || null;
}
