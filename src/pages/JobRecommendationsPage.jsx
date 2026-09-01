import { useState, useMemo } from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { jobListings } from '../data/jobsData';
import { getRecommendations } from '../utils/jobMatcher';
import { useApp } from '../context/AppContext';

export default function JobRecommendationsPage() {
  const { detectedSkills } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customSkills, setCustomSkills] = useState('');
  const [usingCustom, setUsingCustom] = useState(false);

  const activeSkills = useMemo(() => {
    if (usingCustom && customSkills.trim()) return customSkills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    return detectedSkills.length > 0 ? detectedSkills : ['java', 'python', 'javascript', 'html', 'css', 'sql', 'git'];
  }, [detectedSkills, customSkills, usingCustom]);

  const recommendations = useMemo(() => {
    let jobs = getRecommendations(activeSkills, jobListings);
    if (selectedFilter !== 'all') jobs = jobs.filter(j => j.type.toLowerCase() === selectedFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
    }
    return jobs;
  }, [activeSkills, selectedFilter, searchQuery]);

  const getMatchColor = (pct) => {
    if (pct >= 75) return '#10B981';
    if (pct >= 50) return '#F59E0B';
    return '#6B7280';
  };

  const inputStyle = {
    width: '100%', padding: '10px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0B0F19',
    color: '#F9FAFB', fontSize: 14,
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div style={{ marginBottom: 40 }}>
          <p className="text-sm font-medium text-accent" style={{ marginBottom: 8 }}>Job Matching</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>
            Job Recommendations
          </h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Verified job openings matched to your technical skills and experience level.
          </p>
        </div>

        {/* Skills & Filters */}
        <div style={{ marginBottom: 32 }}>
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <h3 className="text-sm font-semibold text-white">Your Skills ({activeSkills.length})</h3>
              <button onClick={() => setUsingCustom(!usingCustom)} className="text-sm text-primary hover:underline cursor-pointer">
                {usingCustom ? 'Use resume profile' : 'Edit manually'}
              </button>
            </div>
            {usingCustom ? (
              <input type="text" value={customSkills} onChange={(e) => setCustomSkills(e.target.value)}
                placeholder="Enter skills separated by commas..." style={inputStyle} />
            ) : (
              <div className="flex flex-wrap" style={{ gap: 6 }}>
                {activeSkills.map((skill) => <Badge key={skill} variant="primary" size="sm">{skill}</Badge>)}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center" style={{ gap: 12 }}>
            <div className="flex-1 relative w-full">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles or companies..." style={{ ...inputStyle, paddingLeft: 40 }} />
            </div>
            <div className="flex rounded-xl p-1 w-full md:w-auto" style={{ backgroundColor: '#1F2937' }}>
              {[{ id: 'all', label: 'All' }, { id: 'full-time', label: 'Full-time' }, { id: 'internship', label: 'Internships' }].map((f) => (
                <button key={f.id} onClick={() => setSelectedFilter(f.id)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    selectedFilter === f.id ? 'bg-[#111827] text-white shadow-sm' : 'text-gray-400'
                  }`}>{f.label}</button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500" style={{ marginBottom: 24 }}>{recommendations.length} opportunities found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
          {recommendations.map((job) => (
            <div key={job.id} className="card flex flex-col justify-between" style={{ padding: 24 }}>
              <div>
                <div className="flex items-start justify-between" style={{ gap: 12, marginBottom: 12 }}>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-white leading-tight truncate">{job.title}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: getMatchColor(job.matchPercentage) }}>
                    {job.matchPercentage}%
                  </span>
                </div>
                <div className="flex flex-wrap text-xs text-gray-500" style={{ gap: 8, marginBottom: 12 }}>
                  <span>{job.location}</span><span>·</span><span>{job.type}</span><span>·</span><span>{job.experience}</span>
                </div>
                <p className="text-sm font-medium text-primary" style={{ marginBottom: 12 }}>{job.salary}</p>
                <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 16 }}>
                  {job.requiredSkills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant={job.matchedSkills.includes(skill) ? 'success' : 'default'} size="sm">{skill}</Badge>
                  ))}
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 4, backgroundColor: '#1F2937' }}>
                  <div className="rounded-full" style={{ height: '100%', width: `${job.matchPercentage}%`, backgroundColor: getMatchColor(job.matchPercentage) }} />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)]" style={{ paddingTop: 16, marginTop: 16 }}>
                <span className="text-xs text-gray-500">{job.postedDate}</span>
                <Button variant="primary" size="sm">Apply →</Button>
              </div>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="card text-center" style={{ padding: 48 }}>
            <h3 className="text-base font-semibold text-white mb-1">No jobs found</h3>
            <p className="text-sm text-gray-400">Try adjusting your skills or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
