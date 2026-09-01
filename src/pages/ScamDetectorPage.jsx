import { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import FileUpload from '../components/ui/FileUpload';
import ProgressCircle from '../components/ui/ProgressCircle';
import { analyzeJobPosting } from '../utils/scamAnalyzer';
import { useApp } from '../context/AppContext';

export default function ScamDetectorPage() {
  const [formData, setFormData] = useState({ companyName: '', companyWebsite: '', jobDescription: '' });
  const [offerFile, setOfferFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { incrementAnalyses, incrementScamReports, addActivity } = useApp();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAnalyze = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    let extraText = offerFile ? ' offer letter uploaded for analysis' : '';
    const analysis = analyzeJobPosting({
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite,
      jobDescription: formData.jobDescription + extraText,
    });
    setResult(analysis);
    setLoading(false);
    incrementAnalyses();
    if (analysis.status === 'scam') incrementScamReports();
    addActivity({
      type: 'scam',
      message: `Analyzed "${formData.companyName || 'Unknown'}" — ${analysis.statusLabel}`,
      status: analysis.status === 'genuine' ? 'genuine' : analysis.status === 'suspicious' ? 'warning' : 'scam',
    });
  };

  const resetForm = () => { setFormData({ companyName: '', companyWebsite: '', jobDescription: '' }); setOfferFile(null); setResult(null); };

  const getStatusColor = (status) => {
    if (status === 'genuine') return 'success';
    if (status === 'suspicious') return 'warning';
    return 'danger';
  };

  const inputStyle = {
    width: '100%', padding: '10px 16px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0B0F19',
    color: '#F9FAFB', fontSize: 14,
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-5xl mx-auto px-6">
        
        <div style={{ marginBottom: 40 }}>
          <p className="text-sm font-medium text-primary" style={{ marginBottom: 8 }}>Scam Detection</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>
            Verify Job Postings & Companies
          </h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Audit job listings against common scam indicators like payment requests, suspicious platforms, and phishing domains.
          </p>
        </div>

        <div className="grid lg:grid-cols-2" style={{ gap: 24, alignItems: 'start' }}>
          
          {/* Form */}
          <div className="space-y-6">
            <div className="card" style={{ padding: 24 }}>
              <h2 className="text-base font-semibold text-white" style={{ marginBottom: 24 }}>Job Details</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Company Name</label>
                  <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                    placeholder="e.g., Google, TCS..." style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Company Website</label>
                  <input type="url" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange}
                    placeholder="e.g., https://company.com" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>Job Description</label>
                  <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange}
                    placeholder="Paste the full job description..." rows={5}
                    style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300" style={{ marginBottom: 6 }}>
                    Offer Document <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <FileUpload accept=".pdf" label="Upload Offer Letter" sublabel="Drop your offer letter PDF" onFileSelect={setOfferFile} />
                </div>
                <Button variant="primary" size="lg" className="w-full" onClick={handleAnalyze} loading={loading}
                  disabled={!formData.companyName && !formData.jobDescription}>
                  {loading ? 'Analyzing...' : 'Run Analysis'}
                </Button>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 className="text-sm font-semibold text-white" style={{ marginBottom: 12 }}>Common Red Flags</h3>
              <ul className="grid sm:grid-cols-2 text-sm text-gray-400" style={{ gap: 8 }}>
                {['Upfront deposits or fees', 'Gmail-based recruiters', 'Inflated salaries', 'Telegram/WhatsApp only', 'No interview selection', 'Vague roles'].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {loading && (
              <div className="card" style={{ padding: 48 }}>
                <div className="flex flex-col items-center space-y-5">
                  <div className="relative" style={{ width: 56, height: 56 }}>
                    <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: '#1F2937' }} />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: '#3B82F6' }} />
                  </div>
                  <p className="font-medium text-white">Analyzing...</p>
                </div>
              </div>
            )}

            {result && !loading && (
              <>
                <div className="card" style={{ padding: 24 }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Audited Entity</p>
                      <h3 className="text-xl font-bold text-white">{result.companyName}</h3>
                      <Badge variant={getStatusColor(result.status)} className="mt-2">{result.statusLabel}</Badge>
                    </div>
                    <ProgressCircle value={result.score} max={100} size={80} strokeWidth={7} sublabel="" label="Trust" />
                  </div>
                  <div className="space-y-2">
                    {result.factors.map((factor, i) => (
                      <div key={i} className="flex items-center rounded-xl" style={{
                        gap: 12, padding: 12,
                        backgroundColor: factor.passed ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
                        border: `1px solid ${factor.passed ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`,
                      }}>
                        {factor.passed ? (
                          <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className="text-sm text-gray-300">{factor.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2" style={{ gap: 16 }}>
                  {result.warnings.length > 0 && (
                    <div className="card" style={{ padding: 24 }}>
                      <h4 className="text-sm font-semibold text-red-400" style={{ marginBottom: 12 }}>Warnings</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        {result.warnings.map((w, i) => <li key={i} className="flex items-start gap-2"><span className="text-red-400 mt-0.5">•</span>{w}</li>)}
                      </ul>
                    </div>
                  )}
                  {result.positives.length > 0 && (
                    <div className="card" style={{ padding: 24 }}>
                      <h4 className="text-sm font-semibold text-emerald-400" style={{ marginBottom: 12 }}>Positives</h4>
                      <ul className="space-y-2 text-sm text-gray-400">
                        {result.positives.map((p, i) => <li key={i} className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5">•</span>{p}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex" style={{ gap: 12 }}>
                  <Button variant="primary" onClick={resetForm}>Audit Another</Button>
                  <Button variant="outline">Print Report</Button>
                </div>
              </>
            )}

            {!result && !loading && (
              <div className="card border-dashed" style={{ padding: 48 }}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">Analysis Console</h3>
                  <p className="text-sm text-gray-400" style={{ maxWidth: 280 }}>
                    Fill in job details to run a security audit.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
