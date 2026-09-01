import { useState, useRef } from 'react';

/**
 * FileUpload — dark theme drag-and-drop.
 */
export default function FileUpload({ 
  onFileSelect, 
  accept = '.pdf', 
  label = 'Upload File',
  sublabel = 'Drag and drop or click to browse',
  maxSize = 10,
  icon,
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const validateFile = (file) => {
    if (file.size > maxSize * 1024 * 1024) { setError(`File exceeds ${maxSize}MB`); return false; }
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!accept.split(',').map(a => a.trim()).includes(ext)) { setError(`Invalid type. Accepted: ${accept}`); return false; }
    setError('');
    return true;
  };

  const handleFile = (file) => { if (validateFile(file)) { setSelectedFile(file); onFileSelect?.(file); } };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); };
  const handleChange = (e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); };
  const removeFile = () => { setSelectedFile(null); setError(''); if (inputRef.current) inputRef.current.value = ''; };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
          dragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-[rgba(255,255,255,0.12)] hover:border-primary/40 hover:bg-white/[0.02]'
        } ${error ? 'border-danger bg-danger/5' : ''}`}
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag}
        onDrop={handleDrop} onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
        
        {selectedFile ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-white">{selectedFile.name}</p>
              <p className="text-sm text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); removeFile(); }}
              className="ml-2 p-1 rounded-full hover:bg-red-500/10 text-red-400 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              {icon || (
                <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
            <p className="font-semibold text-white mb-1">{label}</p>
            <p className="text-sm text-gray-400">{sublabel}</p>
            <p className="text-xs text-gray-500 mt-2">Max: {maxSize}MB • {accept}</p>
          </>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
