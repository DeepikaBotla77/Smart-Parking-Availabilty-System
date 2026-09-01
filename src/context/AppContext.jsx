import { createContext, useContext, useState, useEffect } from 'react';
import { initialScamReports } from '../data/communityData';

const AppContext = createContext();

const STORAGE_KEY = 'careershield-data';

function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults so new fields are never missing
      return { ...getDefaultState(), ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load persisted state:', e);
  }
  return getDefaultState();
}

function getDefaultState() {
  return {
    totalAnalyses: 0,
    scamReports: 0,
    resumeScore: 0,
    resumeScores: [], // array of all scores for averaging
    recommendedJobs: 0,
    learningProgress: 35,
    interviewsCompleted: 0,
    readinessScore: 0,
    userReportsCount: 0,
    scamReportsDatabase: initialScamReports,
    scanHistory: [0, 0, 0, 0, 0, 0, 0], // Mon-Sun activity
    recentActivities: [],
    detectedSkills: [],
    missingSkills: [],
  };
}

export function AppProvider({ children }) {
  const [state, setState] = useState(loadPersistedState);

  // Persist to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  }, [state]);

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const addActivity = (activity) => {
    setState(prev => ({
      ...prev,
      recentActivities: [
        { id: Date.now(), time: 'Just now', ...activity },
        ...prev.recentActivities.slice(0, 19),
      ],
    }));
  };

  const incrementAnalyses = () => {
    const dayIndex = new Date().getDay();
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Mon=0 ... Sun=6
    setState(prev => {
      const newHistory = [...prev.scanHistory];
      newHistory[adjustedIndex] = (newHistory[adjustedIndex] || 0) + 1;
      return { ...prev, totalAnalyses: prev.totalAnalyses + 1, scanHistory: newHistory };
    });
  };

  const incrementScamReports = () => {
    setState(prev => ({ ...prev, scamReports: prev.scamReports + 1 }));
  };

  const submitScamReport = (report) => {
    const newReport = {
      id: String(Date.now()),
      reportsCount: 1,
      upvotes: 0,
      date: new Date().toISOString().split('T')[0],
      evidenceUploaded: !!report.evidence,
      ...report
    };

    setState(prev => ({
      ...prev,
      scamReports: prev.scamReports + 1,
      userReportsCount: prev.userReportsCount + 1,
      scamReportsDatabase: [newReport, ...prev.scamReportsDatabase]
    }));

    addActivity({
      type: 'scam',
      message: `Reported fake company "${report.companyName}"`,
      status: 'scam'
    });
  };

  const upvoteScamReport = (reportId) => {
    setState(prev => {
      const updatedDb = prev.scamReportsDatabase.map(report => {
        if (report.id === reportId) {
          return { ...report, upvotes: report.upvotes + 1 };
        }
        return report;
      });
      return { ...prev, scamReportsDatabase: updatedDb };
    });
  };

  const addCompletedInterview = (score) => {
    setState(prev => {
      const newCount = prev.interviewsCompleted + 1;
      const newScore = Math.round(((prev.readinessScore * prev.interviewsCompleted) + score) / newCount);
      return { ...prev, interviewsCompleted: newCount, readinessScore: newScore };
    });

    addActivity({
      type: 'learning',
      message: `Completed Mock Interview — Score: ${score}%`,
      status: 'genuine'
    });
  };

  // Track resume scores for real average
  const addResumeScore = (score) => {
    setState(prev => {
      const newScores = [...prev.resumeScores, score];
      const avg = Math.round(newScores.reduce((a, b) => a + b, 0) / newScores.length);
      return { ...prev, resumeScore: avg, resumeScores: newScores };
    });
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      updateState, 
      addActivity, 
      incrementAnalyses, 
      incrementScamReports,
      submitScamReport,
      upvoteScamReport,
      addCompletedInterview,
      addResumeScore,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
