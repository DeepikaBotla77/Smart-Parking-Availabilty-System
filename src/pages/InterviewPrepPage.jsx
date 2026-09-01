import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { interviewQuestions, techStackOptions } from '../data/interviewData';
import { evaluateResponse } from '../utils/interviewEngine';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressCircle from '../components/ui/ProgressCircle';

export default function InterviewPrepPage() {
  const { readinessScore, interviewsCompleted, addCompletedInterview } = useApp();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTech, setSelectedTech] = useState('react');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [mockTech, setMockTech] = useState('react');
  const [mockDifficulty, setMockDifficulty] = useState('Intermediate');
  const [isInterviewRunning, setIsInterviewRunning] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewResults, setInterviewResults] = useState([]);
  const [gradingResult, setGradingResult] = useState(null);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [finalReportScore, setFinalReportScore] = useState(0);

  const handleStartMock = () => {
    const techQuestions = interviewQuestions[mockTech] || [];
    let filtered = techQuestions.filter(q => q.difficulty === mockDifficulty);
    if (filtered.length === 0) filtered = techQuestions.slice(0, 3);
    const behavioral = interviewQuestions['behavioral'] || [];
    if (behavioral.length > 0) filtered = [...filtered, behavioral[Math.floor(Math.random() * behavioral.length)]];
    if (filtered.length === 0) { alert("No questions available. Try React, Java or Spring Boot!"); return; }
    setCurrentQuestions(filtered.slice(0, 3));
    setCurrentQuestionIndex(0); setUserAnswer(''); setInterviewResults([]); setGradingResult(null);
    setIsInterviewRunning(true); setInterviewFinished(false); setActiveTab('mock');
  };

  const handleSubmitAnswer = () => {
    const question = currentQuestions[currentQuestionIndex];
    const evaluation = evaluateResponse(question, userAnswer);
    setGradingResult(evaluation);
    setInterviewResults(prev => [...prev, { question, answer: userAnswer, evaluation }]);
  };

  const handleNextQuestion = () => {
    setUserAnswer(''); setGradingResult(null);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const totalScore = interviewResults.reduce((acc, curr) => acc + curr.evaluation.score, 0);
      const avgScore = Math.round(totalScore / currentQuestions.length);
      setFinalReportScore(avgScore); addCompletedInterview(avgScore); setInterviewFinished(true);
    }
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Beginner') return 'success';
    if (diff === 'Intermediate') return 'warning';
    return 'danger';
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0B0F19',
    color: '#F9FAFB', fontSize: 14, resize: 'none',
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div style={{ marginBottom: 32 }}>
          <p className="text-sm font-medium text-indigo-400" style={{ marginBottom: 8 }}>Interview Preparation</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>
            Interview Prep AI
          </h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Practice mock interviews, study curated question banks, and track your readiness score.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[rgba(255,255,255,0.08)]" style={{ maxWidth: 480, marginBottom: 32 }}>
          <button onClick={() => { setActiveTab('dashboard'); setIsInterviewRunning(false); }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center cursor-pointer transition-all ${
              activeTab === 'dashboard' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}>Practice Dashboard</button>
          <button onClick={() => { setActiveTab('questions'); setIsInterviewRunning(false); }}
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center cursor-pointer transition-all ${
              activeTab === 'questions' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}>Question Banks</button>
          {isInterviewRunning && (
            <button onClick={() => setActiveTab('mock')}
              className={`flex-1 pb-3 text-sm font-semibold border-b-2 text-center cursor-pointer transition-all ${
                activeTab === 'mock' ? 'border-primary text-primary' : 'border-transparent text-gray-500'
              }`}>Active Mock</button>
          )}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-3" style={{ gap: 24 }}>
            <div className="card flex flex-col items-center justify-center text-center" style={{ padding: 32 }}>
              <h3 className="text-lg font-semibold text-white" style={{ marginBottom: 24 }}>Readiness Score</h3>
              <ProgressCircle value={readinessScore} max={100} size={130} strokeWidth={10} sublabel="%" label="Ready" />
              <div className="w-full space-y-2" style={{ marginTop: 24 }}>
                <div className="flex justify-between text-sm border-b border-[rgba(255,255,255,0.06)] pb-2">
                  <span className="text-gray-400">Completed Mocks</span>
                  <span className="font-bold text-white">{interviewsCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top Areas</span>
                  <span className="font-medium text-primary">React, OOPs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 card" style={{ padding: 32 }}>
              <h3 className="text-xl font-semibold text-white" style={{ marginBottom: 8 }}>AI Mock Interview</h3>
              <p className="text-sm text-gray-400" style={{ marginBottom: 24 }}>
                Start a simulated mock interview. The AI will grade your answers and provide feedback.
              </p>
              <div className="grid md:grid-cols-2" style={{ gap: 24, marginBottom: 24 }}>
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 8 }}>Tech Stack</label>
                  <select value={mockTech} onChange={(e) => setMockTech(e.target.value)}
                    style={{ ...inputStyle, resize: undefined }}>
                    {techStackOptions.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 8 }}>Difficulty</label>
                  <div className="flex" style={{ gap: 8 }}>
                    {['Beginner', 'Intermediate', 'Advanced'].map(d => (
                      <button key={d} onClick={() => setMockDifficulty(d)}
                        className={`flex-1 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                          mockDifficulty === d ? 'bg-primary text-white border-primary' : 'border-[rgba(255,255,255,0.08)] text-gray-400 hover:bg-white/5'
                        }`}>{d}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end border-t border-[rgba(255,255,255,0.06)]" style={{ paddingTop: 16 }}>
                <Button variant="primary" size="lg" onClick={handleStartMock}>Launch Mock</Button>
              </div>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div>
            <div className="flex flex-wrap justify-center" style={{ gap: 8, marginBottom: 24 }}>
              {techStackOptions.map(o => (
                <button key={o.id} onClick={() => { setSelectedTech(o.id); setExpandedQuestionId(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all ${
                    selectedTech === o.id ? 'bg-primary text-white' : 'bg-[#1F2937] text-gray-400 hover:bg-[#374151]'
                  }`}>{o.label}</button>
              ))}
            </div>
            <div style={{ maxWidth: 800, margin: '0 auto' }} className="space-y-4">
              {(interviewQuestions[selectedTech] || []).length === 0 ? (
                <div className="card text-center" style={{ padding: 48 }}>
                  <p className="text-gray-400">No questions for this technology yet.</p>
                </div>
              ) : (
                interviewQuestions[selectedTech].map((q) => (
                  <div key={q.id} className="card" style={{ padding: 24 }}>
                    <div className="flex items-center justify-between cursor-pointer" style={{ gap: 16 }}
                      onClick={() => setExpandedQuestionId(expandedQuestionId === q.id ? null : q.id)}>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center" style={{ gap: 8 }}>
                          <Badge variant={getDifficultyColor(q.difficulty)}>{q.difficulty}</Badge>
                          <Badge variant="primary">{q.type}</Badge>
                        </div>
                        <h4 className="text-base font-semibold text-white">{q.question}</h4>
                      </div>
                      <span className="text-gray-500 text-2xl">{expandedQuestionId === q.id ? '−' : '+'}</span>
                    </div>
                    {expandedQuestionId === q.id && (
                      <div className="border-t border-[rgba(255,255,255,0.06)] space-y-4" style={{ marginTop: 24, paddingTop: 24 }}>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500" style={{ marginBottom: 8 }}>Keywords</p>
                          <div className="flex flex-wrap" style={{ gap: 6 }}>
                            {q.keywords.map(kw => <span key={kw} className="px-2.5 py-1 text-xs rounded-lg bg-[#1F2937] text-gray-400">{kw}</span>)}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500" style={{ marginBottom: 8 }}>Model Answer</p>
                          <div className="rounded-xl text-sm text-gray-300 leading-relaxed whitespace-pre-line"
                            style={{ padding: 16, backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.06)' }}>
                            {q.modelAnswer}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Mock Tab */}
        {activeTab === 'mock' && isInterviewRunning && (
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {!interviewFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-400" style={{ marginBottom: 8 }}>
                  <span>Interview Progress</span>
                  <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 8, backgroundColor: '#1F2937' }}>
                  <div className="bg-primary rounded-full transition-all" style={{ height: '100%', width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }} />
                </div>

                <div className="card" style={{ padding: 32 }}>
                  <div className="flex" style={{ gap: 8, marginBottom: 16 }}>
                    <Badge variant={getDifficultyColor(currentQuestions[currentQuestionIndex]?.difficulty)}>
                      {currentQuestions[currentQuestionIndex]?.difficulty}
                    </Badge>
                    <Badge variant="primary">{currentQuestions[currentQuestionIndex]?.type}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white leading-relaxed" style={{ marginBottom: 24 }}>
                    {currentQuestions[currentQuestionIndex]?.question}
                  </h3>
                  <textarea rows={6} value={userAnswer} disabled={!!gradingResult}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your response here..."
                    style={{ ...inputStyle, marginBottom: 16 }} />

                  {gradingResult && (
                    <div className="border-t border-[rgba(255,255,255,0.06)] space-y-4" style={{ marginTop: 24, paddingTop: 24 }}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">Evaluation</span>
                        <Badge variant={gradingResult.score >= 70 ? 'success' : gradingResult.score >= 40 ? 'warning' : 'danger'} size="lg">
                          {gradingResult.score}/100
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 rounded-xl" style={{ padding: 14, backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.1)' }}>
                        {gradingResult.feedback}
                      </p>
                      <div className="grid md:grid-cols-2" style={{ gap: 16 }}>
                        <div className="rounded-xl" style={{ padding: 12, backgroundColor: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
                          <p className="font-bold text-emerald-400 text-xs mb-1">Strengths</p>
                          <p className="text-sm text-gray-400">{gradingResult.strengths}</p>
                        </div>
                        <div className="rounded-xl" style={{ padding: 12, backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                          <p className="font-bold text-red-400 text-xs mb-1">Improve</p>
                          <p className="text-sm text-gray-400">{gradingResult.weaknesses}</p>
                        </div>
                      </div>
                      <div className="rounded-xl text-sm text-gray-300" style={{ padding: 16, backgroundColor: '#0B0F19', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-xs font-bold uppercase text-gray-500" style={{ marginBottom: 8 }}>Model Answer</p>
                        {currentQuestions[currentQuestionIndex]?.modelAnswer}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end" style={{ gap: 12, marginTop: 16 }}>
                    {!gradingResult ? (
                      <Button variant="primary" onClick={handleSubmitAnswer} disabled={userAnswer.trim().length < 10}>Submit Response</Button>
                    ) : (
                      <Button variant="secondary" onClick={handleNextQuestion}>
                        {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Interview'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center" style={{ padding: 48 }}>
                <h2 className="text-2xl font-bold text-white" style={{ marginBottom: 12 }}>Mock Interview Complete!</h2>
                <p className="text-gray-400" style={{ maxWidth: 360, margin: '0 auto 24px' }}>
                  Your responses have been graded and recorded to your dashboard.
                </p>
                <div className="card inline-flex flex-col items-center" style={{ padding: 24, marginBottom: 24 }}>
                  <span className="text-sm text-gray-400 mb-2">Overall Score</span>
                  <ProgressCircle value={finalReportScore} max={100} size={110} strokeWidth={8} sublabel="%" />
                </div>
                <div className="flex justify-center" style={{ gap: 12 }}>
                  <Button variant="outline" onClick={() => setActiveTab('dashboard')}>Dashboard</Button>
                  <Button variant="primary" onClick={handleStartMock}>Try Again</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
