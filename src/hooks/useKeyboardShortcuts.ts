import { useEffect } from 'react';

interface ShortcutActions {
  setView: (v: 'week' | 'day') => void;
  setFocusMode: (f: boolean) => void;
  focusMode: boolean;
  view: 'week' | 'day';
}

export function useKeyboardShortcuts({ setView, setFocusMode, focusMode, view }: ShortcutActions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'w':
          setView('week');
          break;
        case 'd':
          setView('day');
          break;
        case 'f':
          setFocusMode(!focusMode);
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setView, setFocusMode, focusMode, view]);
}
