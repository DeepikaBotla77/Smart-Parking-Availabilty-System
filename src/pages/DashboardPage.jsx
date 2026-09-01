import ProgressCircle from '../components/ui/ProgressCircle';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { 
    totalAnalyses, 
    scamReports,
    resumeScore, 
    scanHistory,
    learningProgress, 
    recentActivities,
    interviewsCompleted,
    readinessScore,
    userReportsCount,
  } = useApp();

  const statCards = [
    { label: 'Total Scans', value: totalAnalyses, color: '#3B82F6' },
    { label: 'Reports Filed', value: userReportsCount + scamReports, color: '#EF4444' },
    { label: 'ATS Score', value: resumeScore > 0 ? `${resumeScore}%` : '—', color: '#10B981' },
    { label: 'Interview Ready', value: readinessScore > 0 ? `${readinessScore}%` : '—', color: '#8B5CF6' },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxScan = Math.max(...scanHistory, 1);

  const getStatusIcon = (status) => {
    if (status === 'genuine') return '✓';
    if (status === 'scam') return '✗';
    if (status === 'warning') return '!';
    return 'i';
  };

  const getStatusColor = (status) => {
    if (status === 'genuine') return '#10B981';
    if (status === 'scam') return '#EF4444';
    if (status === 'warning') return '#F59E0B';
    return '#3B82F6';
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 8 }}>
            Dashboard
          </h1>
          <p className="text-gray-400">
            Track your activity across audits, resume scores, and interview performance.
          </p>
        </div>

        {/* KPI Cards — CSS Grid, 4 equal-width, 120px height, 24px gap */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 24, marginBottom: 40 }}
        >
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: 24, height: 120, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row — CSS Grid, 2 columns, 24px gap */}
        <div
          className="grid lg:grid-cols-3"
          style={{ gap: 24, marginBottom: 40 }}
        >
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-white" style={{ marginBottom: 24 }}>
              Weekly Activity
            </h3>
            <div className="flex items-end justify-between" style={{ height: 180, gap: 12, paddingTop: 16 }}>
              {scanHistory.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end" style={{ height: '100%', gap: 8 }}>
                  <span className="text-xs text-gray-400 font-medium">{value}</span>
                  <div className="w-full relative" style={{ height: `${Math.max((value / maxScan) * 75, 4)}%` }}>
                    <div
                      className="absolute bottom-0 w-full rounded-md transition-all"
                      style={{ height: '100%', backgroundColor: '#3B82F6', opacity: 0.85 }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{days[i]}</span>
                </div>
              ))}
            </div>
            {totalAnalyses === 0 && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Start scanning job postings to see your activity here.
              </p>
            )}
          </div>

          {/* Learning Progress */}
          <div className="card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-white" style={{ marginBottom: 24 }}>
              Learning Progress
            </h3>
            <div className="flex justify-center" style={{ marginBottom: 24 }}>
              <ProgressCircle
                value={learningProgress}
                max={100}
                size={110}
                strokeWidth={9}
                sublabel="% complete"
                label="Roadmap"
                color="#8B5CF6"
              />
            </div>
            <div className="space-y-4">
              {[
                { name: 'Java Basics', progress: 100, color: '#10B981' },
                { name: 'Spring Boot', progress: 65, color: '#3B82F6' },
                { name: 'React', progress: 30, color: '#8B5CF6' },
                { name: 'DevOps', progress: 10, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm" style={{ marginBottom: 6 }}>
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-gray-500">{item.progress}%</span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: 6, backgroundColor: '#1F2937' }}>
                    <div className="rounded-full" style={{ height: '100%', width: `${item.progress}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity — Full width, scrollable */}
        <div
          className="grid lg:grid-cols-3"
          style={{ gap: 24 }}
        >
          <div className="lg:col-span-2 card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-white" style={{ marginBottom: 16 }}>
              Recent Activity
            </h3>
            <div className="overflow-y-auto" style={{ maxHeight: 300 }}>
              {recentActivities.length === 0 ? (
                <p className="text-sm text-gray-500 py-8 text-center">
                  No activity yet. Start analyzing job postings or resumes.
                </p>
              ) : (
                <div className="space-y-2">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center rounded-xl transition-colors hover:bg-white/[0.03]"
                      style={{ gap: 12, padding: 12 }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ backgroundColor: `${getStatusColor(activity.status)}15`, color: getStatusColor(activity.status) }}
                      >
                        {getStatusIcon(activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-200 truncate">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card" style={{ padding: 24 }}>
            <h3 className="text-base font-semibold text-white" style={{ marginBottom: 16 }}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Check Job Legitimacy', path: '/scam-detector' },
                { label: 'Scan Resume', path: '/resume-analyzer' },
                { label: 'Mock Interview', path: '/interview-prep' },
                { label: 'Report Fraud', path: '/community-reports' },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex items-center justify-between rounded-xl border border-[rgba(255,255,255,0.08)] hover:bg-white/[0.03] transition-colors"
                  style={{ padding: 12 }}
                >
                  <span className="text-sm font-medium text-gray-300">{action.label}</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
