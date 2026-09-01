/**
 * Scam Analysis Engine
 * Performs heuristic-based analysis of job postings and companies.
 * Returns a trust score (0-100) with detailed reasons.
 */

// Suspicious keywords and patterns
const SUSPICIOUS_PATTERNS = {
  moneyRequest: [
    'registration fee', 'processing fee', 'security deposit', 'advance payment',
    'pay first', 'send money', 'wire transfer', 'western union', 'bitcoin payment',
    'pay for training', 'pay for materials', 'upfront cost', 'investment required',
  ],
  unrealisticSalary: [
    'earn \\$\\d{4,}.*per day', 'earn \\$\\d{5,}.*per week', '\\$\\d{6,}.*per month',
    'unlimited earning', 'guaranteed income', 'make millions', 'six figure.*easy',
    'earn from home.*\\$\\d{4,}',
  ],
  genericEmail: [
    '@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@aol.com',
    '@mail.com', '@ymail.com', '@protonmail.com',
  ],
  suspiciousWording: [
    'no experience needed', 'no interview required', 'instant hiring',
    'guaranteed job', 'work from home.*easy', 'congratulations.*selected',
    'urgent hiring', 'limited spots', 'act now', 'too good to be true',
    'immediate start', 'no questions asked', 'selected randomly',
    'you have been chosen', 'lucky winner',
  ],
  missingInfo: [
    'confidential company', 'undisclosed', 'anonymous employer',
    'company name withheld', 'details upon joining',
  ],
  fakeInterview: [
    'interview via chat', 'whatsapp interview', 'telegram interview',
    'interview on hangouts', 'google chat interview', 'text interview',
  ],
};

const POSITIVE_SIGNALS = [
  { pattern: /\.(com|org|io|co|net)$/i, message: 'Has a professional domain', weight: 10 },
  { pattern: /linkedin\.com/i, message: 'LinkedIn presence detected', weight: 8 },
  { pattern: /glassdoor/i, message: 'Glassdoor presence', weight: 7 },
  { pattern: /established|founded|since \d{4}/i, message: 'Established company history', weight: 6 },
  { pattern: /benefits|health insurance|401k|pto/i, message: 'Mentions standard benefits', weight: 5 },
  { pattern: /interview process|rounds|technical assessment/i, message: 'Structured interview process', weight: 8 },
];

/**
 * Analyze a job posting for scam indicators.
 * @param {Object} params - Analysis parameters
 * @param {string} params.companyName - Name of the company
 * @param {string} params.companyWebsite - Company website URL
 * @param {string} params.jobDescription - Full job description text
 * @returns {Object} Analysis result with score, status, and reasons
 */
export function analyzeJobPosting({ companyName, companyWebsite, jobDescription }) {
  let score = 70; // Start with neutral-positive score
  const warnings = [];
  const positives = [];
  const factors = [];

  const fullText = `${companyName} ${companyWebsite} ${jobDescription}`.toLowerCase();

  // Check for money requests (critical red flag)
  const moneyMatches = SUSPICIOUS_PATTERNS.moneyRequest.filter(p => fullText.includes(p));
  if (moneyMatches.length > 0) {
    score -= 30;
    warnings.push('Requests payment or fees from applicants');
    factors.push({ label: 'Payment requests detected', passed: false, severity: 'high' });
  } else {
    positives.push('No payment requested');
    factors.push({ label: 'No payment requests', passed: true });
  }

  // Check for unrealistic salary claims
  const salaryRegexes = SUSPICIOUS_PATTERNS.unrealisticSalary.map(p => new RegExp(p, 'i'));
  const hasSalaryFlag = salaryRegexes.some(r => r.test(fullText));
  if (hasSalaryFlag) {
    score -= 20;
    warnings.push('Contains unrealistic salary promises');
    factors.push({ label: 'Salary claims realistic', passed: false, severity: 'high' });
  } else {
    factors.push({ label: 'Salary claims realistic', passed: true });
  }

  // Check for generic email addresses
  const emailFlag = SUSPICIOUS_PATTERNS.genericEmail.some(e => fullText.includes(e));
  if (emailFlag) {
    score -= 15;
    warnings.push('Uses personal/generic email address');
    factors.push({ label: 'Professional email domain', passed: false, severity: 'medium' });
  } else {
    positives.push('Uses professional communication channels');
    factors.push({ label: 'Professional email domain', passed: true });
  }

  // Check for suspicious wording
  const wordingMatches = SUSPICIOUS_PATTERNS.suspiciousWording.filter(p => fullText.includes(p));
  if (wordingMatches.length > 0) {
    score -= wordingMatches.length * 8;
    warnings.push(`Contains suspicious wording (${wordingMatches.length} flags)`);
    factors.push({ label: 'Professional language used', passed: false, severity: 'medium' });
  } else {
    positives.push('Professional language used');
    factors.push({ label: 'Professional language used', passed: true });
  }

  // Check for missing company info
  const missingInfoFlag = SUSPICIOUS_PATTERNS.missingInfo.some(p => fullText.includes(p));
  if (missingInfoFlag) {
    score -= 15;
    warnings.push('Company information is hidden or vague');
    factors.push({ label: 'Company information provided', passed: false, severity: 'medium' });
  } else {
    factors.push({ label: 'Company information provided', passed: true });
  }

  // Check for fake interview patterns
  const fakeInterviewFlag = SUSPICIOUS_PATTERNS.fakeInterview.some(p => fullText.includes(p));
  if (fakeInterviewFlag) {
    score -= 15;
    warnings.push('Uses unofficial interview channels');
    factors.push({ label: 'Standard interview process', passed: false, severity: 'medium' });
  } else {
    factors.push({ label: 'Standard interview process', passed: true });
  }

  // Check website
  if (companyWebsite && companyWebsite.trim()) {
    try {
      const url = new URL(companyWebsite.startsWith('http') ? companyWebsite : `https://${companyWebsite}`);
      if (url.hostname && url.hostname.includes('.')) {
        score += 10;
        positives.push('Has a company website');
        factors.push({ label: 'Company website exists', passed: true });
      }
    } catch {
      score -= 5;
      factors.push({ label: 'Company website exists', passed: false, severity: 'low' });
    }
  } else {
    score -= 10;
    warnings.push('No company website provided');
    factors.push({ label: 'Company website exists', passed: false, severity: 'medium' });
  }

  // Check company name
  if (companyName && companyName.trim().length > 2) {
    positives.push('Company name provided');
    factors.push({ label: 'Company name identified', passed: true });
  } else {
    score -= 10;
    warnings.push('No valid company name provided');
    factors.push({ label: 'Company name identified', passed: false, severity: 'medium' });
  }

  // Check positive signals
  POSITIVE_SIGNALS.forEach(signal => {
    if (signal.pattern.test(fullText)) {
      score += signal.weight;
      positives.push(signal.message);
    }
  });

  // Check job description length
  if (jobDescription && jobDescription.length > 200) {
    score += 5;
    positives.push('Detailed job description');
    factors.push({ label: 'Detailed job description', passed: true });
  } else if (jobDescription && jobDescription.length < 50) {
    score -= 10;
    warnings.push('Very short or vague job description');
    factors.push({ label: 'Detailed job description', passed: false, severity: 'low' });
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  // Determine status
  let status;
  if (score >= 70) status = 'genuine';
  else if (score >= 40) status = 'suspicious';
  else status = 'scam';

  return {
    score,
    status,
    statusLabel: status === 'genuine' ? 'Genuine' : status === 'suspicious' ? 'Suspicious' : 'High Risk Scam',
    warnings,
    positives,
    factors,
    companyName: companyName || 'Unknown Company',
  };
}
