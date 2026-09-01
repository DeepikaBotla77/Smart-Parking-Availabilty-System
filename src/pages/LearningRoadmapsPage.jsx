import { useState } from 'react';
import Badge from '../components/ui/Badge';
import { roadmaps } from '../data/roadmapsData';

export default function LearningRoadmapsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());

  const toggleTopic = (topicKey) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicKey)) next.delete(topicKey);
      else next.add(topicKey);
      return next;
    });
  };

  const getProgress = (roadmap) => {
    const total = roadmap.stages.reduce((sum, s) => sum + s.topics.length, 0);
    const completed = roadmap.stages.reduce((sum, s) =>
      sum + s.topics.filter((_, i) => completedTopics.has(`${roadmap.id}-${s.level}-${i}`)).length, 0);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div style={{ marginBottom: 40 }}>
          <p className="text-sm font-medium text-amber-400" style={{ marginBottom: 8 }}>Learning Paths</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>
            Learning Roadmaps
          </h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Follow structured learning paths and track your progress to fill skill gaps.
          </p>
        </div>

        {/* Roadmap Cards */}
        {!selectedRoadmap && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {roadmaps.map((roadmap) => {
              const progress = getProgress(roadmap);
              const totalTopics = roadmap.stages.reduce((s, st) => s + st.topics.length, 0);
              return (
                <div key={roadmap.id} onClick={() => setSelectedRoadmap(roadmap)}
                  className="card cursor-pointer hover:border-primary/20 transition-all" style={{ padding: 24 }}>
                  <div className="flex items-center" style={{ gap: 16, marginBottom: 16 }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${roadmap.color}15` }}>{roadmap.icon}</div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{roadmap.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{roadmap.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400" style={{ marginBottom: 16 }}>{roadmap.description}</p>
                  <div className="flex items-center text-xs text-gray-500" style={{ gap: 8, marginBottom: 16 }}>
                    <span>{roadmap.stages.length} stages</span><span>•</span><span>{totalTopics} topics</span>
                  </div>
                  {progress > 0 && (
                    <div style={{ marginBottom: 16 }}>
                      <div className="flex justify-between text-xs" style={{ marginBottom: 4 }}>
                        <span className="text-gray-400">Progress</span>
                        <span className="font-bold text-primary">{progress}%</span>
                      </div>
                      <div className="rounded-full overflow-hidden" style={{ height: 6, backgroundColor: '#1F2937' }}>
                        <div className="rounded-full bg-primary" style={{ height: '100%', width: `${progress}%` }} />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
                    {roadmap.stages.map((s) => (
                      <Badge key={s.level} size="sm" variant={
                        s.level === 'Beginner' ? 'success' : s.level === 'Intermediate' ? 'warning' :
                        s.level === 'Advanced' ? 'danger' : 'primary'
                      }>{s.level}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm font-medium text-primary" style={{ gap: 4 }}>
                    Open curriculum
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Timeline View */}
        {selectedRoadmap && (
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div className="flex items-center flex-wrap" style={{ gap: 16, marginBottom: 32 }}>
              <button onClick={() => setSelectedRoadmap(null)}
                className="p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-[rgba(255,255,255,0.08)] transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center" style={{ gap: 12 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${selectedRoadmap.color}15` }}>{selectedRoadmap.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedRoadmap.title}</h2>
                  <p className="text-xs text-gray-400">{selectedRoadmap.duration}</p>
                </div>
              </div>
              <div className="ml-auto card" style={{ padding: '8px 16px' }}>
                <p className="text-xs font-bold text-gray-500 uppercase">Progress</p>
                <p className="text-xl font-bold text-primary">{getProgress(selectedRoadmap)}%</p>
              </div>
            </div>

            <div className="space-y-8">
              {selectedRoadmap.stages.map((stage, si) => (
                <div key={stage.level}>
                  <div className="flex items-center" style={{ gap: 16, marginBottom: 16 }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: stage.color }}>{stage.level.slice(0, 3).toUpperCase()}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{stage.level} Stage</h3>
                      <p className="text-xs text-gray-500">{stage.topics.length} modules</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2" style={{ gap: 16, marginLeft: 64 }}>
                    {stage.topics.map((topic, ti) => {
                      const key = `${selectedRoadmap.id}-${stage.level}-${ti}`;
                      const done = completedTopics.has(key);
                      return (
                        <div key={ti} onClick={() => toggleTopic(key)}
                          className="card cursor-pointer transition-all" style={{
                            padding: 16,
                            borderColor: done ? 'rgba(16,185,129,0.3)' : undefined,
                            backgroundColor: done ? 'rgba(16,185,129,0.04)' : undefined,
                          }}>
                          <div className="flex items-start" style={{ gap: 12 }}>
                            <div className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{
                                backgroundColor: done ? '#10B981' : 'transparent',
                                borderColor: done ? '#10B981' : '#374151',
                              }}>
                              {done && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className={`text-sm font-semibold ${done ? 'text-emerald-400 line-through opacity-70' : 'text-white'}`}>
                                {topic.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
                              <p className="text-xs font-medium text-primary mt-2">⏱ {topic.duration}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
