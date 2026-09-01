import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { scamTypes, calculateTrustScore } from '../data/communityData';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressCircle from '../components/ui/ProgressCircle';
import Modal from '../components/ui/Modal';

export default function CommunityReportsPage() {
  const { scamReportsDatabase, submitScamReport, upvoteScamReport, userReportsCount, scamReports } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScamType, setSelectedScamType] = useState('All');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '', website: '', role: '', scamType: 'Registration Fee', description: '', evidence: null
  });

  const handleInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.description) { alert("Fill required fields."); return; }
    submitScamReport(formData);
    setFormData({ companyName: '', website: '', role: '', scamType: 'Registration Fee', description: '', evidence: null });
    setIsReportModalOpen(false);
  };

  const filteredReports = scamReportsDatabase.filter(r => {
    const matchesSearch = r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.website.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && (selectedScamType === 'All' || r.scamType === selectedScamType);
  });

  const inputStyle = {
    width: '100%', padding: '10px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#111827',
    color: '#F9FAFB', fontSize: 14,
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-6xl mx-auto px-6">
        
        <div style={{ marginBottom: 40 }}>
          <p className="text-sm font-medium text-red-400" style={{ marginBottom: 8 }}>Community Reports</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>Scam Board</h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Verify companies based on reports from real candidates. Report fake offers and vote to flag suspicious entities.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 24, marginBottom: 32 }}>
          {[
            { label: 'Flagged Companies', value: scamReportsDatabase.length, color: '#EF4444' },
            { label: 'Community Upvotes', value: scamReportsDatabase.reduce((a, c) => a + c.upvotes, 0), color: '#F9FAFB' },
            { label: 'Your Reports', value: userReportsCount, color: '#F9FAFB' },
            { label: 'Resolution Rate', value: '92%', color: '#10B981' },
          ].map((s, i) => (
            <div key={i} className="card text-center" style={{ padding: 20 }}>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center" style={{ gap: 12, marginBottom: 32 }}>
          <div className="relative flex-1 w-full">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company..." style={{ ...inputStyle, paddingLeft: 40, backgroundColor: '#0B0F19' }} />
          </div>
          <select value={selectedScamType} onChange={(e) => setSelectedScamType(e.target.value)}
            style={{ ...inputStyle, width: 'auto', backgroundColor: '#0B0F19' }}>
            <option value="All">All Types</option>
            {scamTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <Button variant="primary" onClick={() => setIsReportModalOpen(true)}>Report Company</Button>
        </div>

        <div className="grid md:grid-cols-2" style={{ gap: 24 }}>
          {filteredReports.length === 0 ? (
            <div className="md:col-span-2 card text-center" style={{ padding: 48 }}>
              <h3 className="text-base font-semibold text-white mb-1">No reports found</h3>
              <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
            </div>
          ) : (
            filteredReports.map((report) => {
              const score = calculateTrustScore(report.reportsCount, report.upvotes);
              return (
                <div key={report.id} className="card flex flex-col justify-between" style={{ padding: 24 }}>
                  <div>
                    <div className="flex justify-between items-start" style={{ gap: 12, marginBottom: 12 }}>
                      <div>
                        <h3 className="text-base font-semibold text-white">{report.companyName}</h3>
                        <a href={report.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{report.website}</a>
                      </div>
                      <ProgressCircle value={score} max={100} size={50} strokeWidth={5} label="" sublabel="" />
                    </div>
                    <div className="flex flex-wrap" style={{ gap: 6, marginBottom: 12 }}>
                      <Badge variant="danger">{report.scamType}</Badge>
                      <Badge variant="default">{report.role}</Badge>
                      {report.evidenceUploaded && <Badge variant="success">Evidence</Badge>}
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 rounded-xl" style={{ padding: 12, backgroundColor: '#0B0F19', marginBottom: 16 }}>
                      "{report.description}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] text-sm text-gray-500" style={{ paddingTop: 12 }}>
                    <span className="text-xs">{report.date}</span>
                    <button onClick={() => upvoteScamReport(report.id)}
                      className="flex items-center px-3 py-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer text-sm font-medium"
                      style={{ gap: 6 }}>▲ Upvote ({report.upvotes})</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="Report a Fake Company">
          <form onSubmit={handleSubmit} className="space-y-4" style={{ paddingTop: 8 }}>
            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Company Name *</label>
              <input type="text" name="companyName" required value={formData.companyName} onChange={handleInputChange}
                placeholder="e.g. Apex Recruiting" style={inputStyle} />
            </div>
            <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Website</label>
                <input type="url" name="website" value={formData.website} onChange={handleInputChange}
                  placeholder="https://..." style={inputStyle} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Job Title</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange}
                  placeholder="e.g. Data Entry" style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Scam Category</label>
              <select name="scamType" value={formData.scamType} onChange={handleInputChange} style={inputStyle}>
                {scamTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Description *</label>
              <textarea name="description" required rows={4} value={formData.description} onChange={handleInputChange}
                placeholder="What happened?" style={{ ...inputStyle, resize: 'none' }} />
            </div>
            <div className="flex justify-end border-t border-[rgba(255,255,255,0.06)]" style={{ gap: 12, paddingTop: 12 }}>
              <Button variant="ghost" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
              <Button variant="danger" type="submit">Submit Report</Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
