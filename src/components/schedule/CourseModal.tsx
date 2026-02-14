import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Target, Wrench, Brain, Clock, ChevronDown, ChevronUp, Save, Star } from 'lucide-react';
import { Course, moduleInfoMap, categoryConfig } from '@/data/schedule';

interface CourseModalProps {
  course: Course | null;
  note: string;
  onClose: () => void;
  onSaveNote: (courseId: string, note: string) => void;
}

export default function CourseModal({ course, note, onClose, onSaveNote }: CourseModalProps) {
  const [localNote, setLocalNote] = useState(note);
  const [showRevision, setShowRevision] = useState(false);

  if (!course) return null;

  const info = moduleInfoMap[course.module];
  const config = categoryConfig[course.category];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="cyber-card neon-border rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{config.icon}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{config.label}</span>
              </div>
              <h2 className="font-display text-lg font-bold text-foreground">{course.module}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {course.day} • {course.startTime} - {course.endTime}
              </p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          {info && (
            <div className="p-4 space-y-4">
              {/* Description */}
              <div>
                <p className="text-sm text-foreground/80">{info.description}</p>
              </div>

              {/* Difficulty & Priority */}
              <div className="flex gap-4">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Difficulté</span>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < info.difficulty ? 'text-neon-yellow fill-neon-yellow' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground">Priorité</span>
                  <p className={`text-xs font-bold mt-1 ${
                    info.priority === 'haute' ? 'text-neon-red' :
                    info.priority === 'moyenne' ? 'text-neon-yellow' : 'text-neon-green'
                  }`}>
                    {info.priority.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Objectives */}
              <Section icon={<Target className="w-4 h-4 text-primary" />} title="Objectifs">
                <ul className="space-y-1">
                  {info.objectives.map((obj, i) => (
                    <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span> {obj}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Key Concepts */}
              <Section icon={<Brain className="w-4 h-4 text-secondary" />} title="Concepts clés">
                <div className="flex flex-wrap gap-1.5">
                  {info.keyConcepts.map(c => (
                    <span key={c} className="px-2 py-0.5 rounded bg-muted text-[10px] text-foreground/70 border border-border">
                      {c}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Tools */}
              <Section icon={<Wrench className="w-4 h-4 text-neon-purple" />} title="Outils">
                <div className="flex flex-wrap gap-1.5">
                  {info.tools.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-neon-purple/10 text-[10px] text-neon-purple border border-neon-purple/20">
                      {t}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Revision Section */}
              <button
                onClick={() => setShowRevision(!showRevision)}
                className="w-full flex items-center justify-between p-3 rounded bg-muted/50 border border-border hover:border-primary/30 transition-all"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  📚 Révision intelligente
                </span>
                {showRevision ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showRevision && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      Temps de préparation estimé : <span className="text-primary font-bold">{info.revision.prepTime}</span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">À réviser la veille</p>
                      <ul className="space-y-1">
                        {info.revision.preClassReview.map((r, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                            <span className="text-secondary">✓</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-muted-foreground mb-1">Exercices recommandés</p>
                      <ul className="space-y-1">
                        {info.revision.exercises.map((e, i) => (
                          <li key={i} className="text-xs text-foreground/70 flex items-start gap-2">
                            <span className="text-neon-yellow">◆</span> {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Notes */}
              <div>
                <p className="text-[10px] uppercase text-muted-foreground mb-2">📝 Notes personnelles</p>
                <textarea
                  value={localNote}
                  onChange={e => setLocalNote(e.target.value)}
                  placeholder="Ajouter des notes..."
                  className="w-full bg-muted/50 border border-border rounded p-2 text-xs text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:border-primary/50"
                />
                <button
                  onClick={() => onSaveNote(course.id, localNote)}
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <Save className="w-3.5 h-3.5" />
                  Sauvegarder
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold text-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}
