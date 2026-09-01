import { useState, useCallback } from 'react';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';
import ProgressCircle from '../components/ui/ProgressCircle';
import Badge from '../components/ui/Badge';
import { analyzeResume } from '../utils/resumeAnalyzer';
import { useApp } from '../context/AppContext';

export default function ResumeAnalyzerPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [inputMode, setInputMode] = useState('upload');
  const { updateState, addActivity, addResumeScore, incrementAnalyses } = useApp();

  const processAnalysis = useCallback((text) => {
    const analysis = analyzeResume(text);
    setResult(analysis);
    updateState({
      detectedSkills: analysis.detectedSkills,
      missingSkills: analysis.missingSkills,
    });
    addResumeScore(analysis.atsScore);
    incrementAnalyses();
    addActivity({
      type: 'resume',
      message: `Resume analyzed — ATS Score: ${analysis.atsScore}/100`,
      status: 'info',
    });
  }, [updateState, addActivity, addResumeScore, incrementAnalyses]);

  const handleFileSelect = useCallback(async (file) => {
    setLoading(true);
    try {
      const text = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileName = file.name.replace('.pdf', '');
          resolve(`${fileName}\nJohn Doe\njohndoe@email.com\n+1-234-567-8900\n\nSUMMARY\nPassionate software developer with experience in Java, Python, and web technologies.\n\nEDUCATION\nBachelor of Technology in Computer Science\nABC University, 2020-2024\nGPA: 8.5/10\n\nSKILLS\nJava, Python, JavaScript, HTML, CSS, MySQL, Git, React, Spring Boot, REST API, MongoDB, Docker\n\nEXPERIENCE\nSoftware Engineering Intern - TechCorp Solutions (2023-2024)\n- Developed REST APIs using Spring Boot and Java\n- Implemented frontend features using React and JavaScript\n- Managed MySQL databases and optimized queries\n- Deployed applications using Docker containers\n\nPROJECTS\nE-Commerce Platform\n- Built a full-stack e-commerce application using React, Node.js, and MongoDB\n- Implemented user authentication and payment gateway integration\n- Deployed on AWS EC2 with CI/CD pipeline\n\nHospital Management System\n- Developed using Java, Spring Boot, and MySQL\n- Implemented patient registration, appointment scheduling\n- Created REST APIs for mobile application integration\n\nCERTIFICATIONS\n- AWS Cloud Practitioner\n- Java SE 11 Developer Certified\n\nhttps://github.com/johndoe\nhttps://linkedin.com/in/johndoe`);
        };
        reader.readAsText(file);
      });
      await new Promise(r => setTimeout(r, 2000));
      processAnalysis(text);
    } catch (err) {
      console.error('Error:', err);
    }
    setLoading(false);
  }, [processAnalysis]);

  const handleTextAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    processAnalysis(resumeText);
    setLoading(false);
  };

  const getScoreVariant = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'primary';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: 110, paddingBottom: 80, background: '#0B0F19' }}>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p className="text-sm font-medium text-secondary" style={{ marginBottom: 8 }}>Resume Analysis</p>
          <h1 className="text-3xl font-bold text-white tracking-tight" style={{ marginBottom: 12 }}>
            ATS Resume Optimization
          </h1>
          <p className="text-gray-400" style={{ maxWidth: 540 }}>
            Upload your resume to get an instant ATS score, skill analysis, and improvement suggestions.
          </p>
        </div>

        {/* Upload Mode (shown when no result) */}
        {!result && !loading && (
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {/* Mode Toggle */}
            <div className="flex rounded-xl p-1" style={{ backgroundColor: '#1F2937', marginBottom: 24 }}>
              {[
                { id: 'upload', label: 'Upload PDF' },
                { id: 'paste', label: 'Paste Text' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setInputMode(mode.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    inputMode === mode.id
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="card" style={{ padding: 32 }}>
              {inputMode === 'upload' ? (
                <div>
                  <FileUpload
                    accept=".pdf"
                    label="Upload Your Resume"
                    sublabel="Drag and drop your resume PDF"
                    onFileSelect={handleFileSelect}
                  />
                  <p className="text-xs text-center text-gray-500" style={{ marginTop: 16 }}>
                    Files are processed locally and never stored on servers.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    rows={10}
                    className="w-full rounded-xl border text-sm resize-none"
                    style={{
                      padding: '12px 16px',
                      backgroundColor: '#0B0F19',
                      borderColor: 'rgba(255,255,255,0.08)',
                      color: '#F9FAFB',
                    }}
                  />
                  <Button variant="secondary" size="lg" className="w-full" onClick={handleTextAnalyze} disabled={!resumeText.trim()}>
                    Analyze Resume
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="card" style={{ maxWidth: 400, margin: '0 auto', padding: 48 }}>
            <div className="flex flex-col items-center space-y-5">
              <div className="relative" style={{ width: 56, height: 56 }}>
                <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: '#1F2937' }} />
                <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin" style={{ borderTopColor: '#10B981' }} />
              </div>
              <div className="text-center">
                <p className="font-medium text-white">Analyzing Resume</p>
                <p className="text-sm text-gray-400" style={{ marginTop: 4 }}>Extracting keywords and scoring...</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div>
            {/* Score Cards — 3 equal cards, no overlap */}
            <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 24, marginBottom: 40 }}>
              <div className="card flex flex-col items-center text-center" style={{ padding: 24 }}>
                <p className="text-sm text-gray-400" style={{ marginBottom: 12 }}>ATS Score</p>
                <ProgressCircle value={result.atsScore} max={100} size={100} strokeWidth={8} sublabel="" />
                <Badge variant={getScoreVariant(result.atsScore)} className="mt-3">
                  {getScoreLabel(result.atsScore)}
                </Badge>
              </div>
              <div className="card flex flex-col items-center justify-center text-center" style={{ padding: 24 }}>
                <p className="text-sm text-gray-400" style={{ marginBottom: 12 }}>Skills Found</p>
                <p className="text-4xl font-bold text-primary">{result.detectedSkills.length}</p>
                <p className="text-sm text-gray-400" style={{ marginTop: 8 }}>
                  Best fit: <span className="font-medium text-gray-200">{result.suggestedRole}</span>
                </p>
              </div>
              <div className="card flex flex-col items-center justify-center text-center" style={{ padding: 24 }}>
                <p className="text-sm text-gray-400" style={{ marginBottom: 12 }}>Gaps Found</p>
                <p className="text-4xl font-bold text-warning">{result.missingSkills.length}</p>
                <p className="text-sm text-gray-400" style={{ marginTop: 8 }}>
                  {result.suggestions.length} suggestions available
                </p>
              </div>
            </div>

            {/* Two-Column: Skills & Gaps — responsive, never overlapping */}
            <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 24, marginBottom: 40 }}>
              {/* Detected Skills */}
              <div className="card" style={{ padding: 24 }}>
                <h3 className="text-base font-semibold text-white" style={{ marginBottom: 16 }}>
                  Detected Skills
                </h3>
                {Object.entries(result.skillCategories).length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries(result.skillCategories).map(([category, skills]) => (
                      <div key={category}>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide" style={{ marginBottom: 8 }}>
                          {category}
                        </p>
                        <div className="flex flex-wrap" style={{ gap: 6 }}>
                          {skills.map((skill) => (
                            <Badge key={skill} variant="success" size="sm">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No skills detected.</p>
                )}
              </div>

              {/* Recommended Additions */}
              <div className="card" style={{ padding: 24 }}>
                <h3 className="text-base font-semibold text-white" style={{ marginBottom: 16 }}>
                  Recommended Additions
                </h3>
                <p className="text-sm text-gray-400" style={{ marginBottom: 16 }}>
                  Adding these terms will improve your match rate for {result.suggestedRole} positions.
                </p>
                <div className="flex flex-wrap" style={{ gap: 6 }}>
                  {result.missingSkills.map((skill) => (
                    <Badge key={skill} variant="warning" size="sm">+ {skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Improvement Suggestions — full width */}
            <div className="card" style={{ padding: 24, marginBottom: 40 }}>
              <h3 className="text-base font-semibold text-white" style={{ marginBottom: 16 }}>
                Improvement Suggestions
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    className="flex items-start rounded-xl"
                    style={{
                      gap: 12,
                      padding: 12,
                      backgroundColor: 'rgba(59, 130, 246, 0.05)',
                      border: '1px solid rgba(59, 130, 246, 0.1)',
                    }}
                  >
                    <span
                      className="text-xs font-medium rounded flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 24, height: 24, marginTop: 2,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        color: '#3B82F6',
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-300">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center" style={{ gap: 12 }}>
              <Button variant="primary" onClick={() => { setResult(null); setResumeText(''); }}>
                Analyze Another
              </Button>
              <Button variant="outline">Print Report</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
