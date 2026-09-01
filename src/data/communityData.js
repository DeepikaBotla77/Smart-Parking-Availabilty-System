export const initialScamReports = [
  {
    id: '1',
    companyName: 'Apex Hire Solutions',
    website: 'https://apexhired.com',
    role: 'Remote Data Entry Clerk',
    scamType: 'Registration Fee',
    description: 'Requested ₹2,500 for "mandatory background check software" after a 5-minute Telegram text interview. Promised a laptop that never arrived.',
    reportsCount: 5,
    upvotes: 42,
    date: '2026-06-05',
    evidenceUploaded: true,
  },
  {
    id: '2',
    companyName: 'Fintech Global LLC',
    website: 'https://fintechglobal-hr.net',
    role: 'Junior Software Engineer',
    scamType: 'Fake Check',
    description: 'Sent a counterfeit cheque for $2,000 to purchase home office equipment, then asked for a refund of the "excess amount" via cryptocurrency.',
    reportsCount: 3,
    upvotes: 28,
    date: '2026-06-04',
    evidenceUploaded: true,
  },
  {
    id: '3',
    companyName: 'SwiftReach Marketing Group',
    website: 'https://swiftreachmarket.com',
    role: 'Social Media Evaluator',
    scamType: 'Identity Theft',
    description: 'Required uploading high-resolution photos of Aadhaar card, PAN card, and bank account details before any official contract or interview.',
    reportsCount: 4,
    upvotes: 19,
    date: '2026-06-02',
    evidenceUploaded: false,
  },
  {
    id: '4',
    companyName: 'DevForce Tech',
    website: 'https://devforcetech-jobs.org',
    role: 'React Developer (Internship)',
    scamType: 'Bait-and-Switch',
    description: 'Advertised as a paid internship, but upon selection, demanded a training fee of ₹12,000 to "unlock" the project repository.',
    reportsCount: 2,
    upvotes: 15,
    date: '2026-05-30',
    evidenceUploaded: true,
  },
  {
    id: '5',
    companyName: 'CloudSphere Consulting',
    website: 'https://cloudspherejobs.com',
    role: 'Virtual Assistant',
    scamType: 'Unpaid Trial Scam',
    description: 'Made me work for 2 weeks on a "mandatory test project" with no pay, then ghosted and blocked me after submitting the completed work.',
    reportsCount: 3,
    upvotes: 8,
    date: '2026-05-28',
    evidenceUploaded: false,
  }
];

export const scamTypes = [
  'Registration Fee',
  'Fake Check',
  'Identity Theft',
  'Bait-and-Switch',
  'Unpaid Trial Scam',
  'Phishing Recruiters'
];

/**
 * Calculates the Community Trust Score based on report count and upvotes.
 * Score ranges from 10% to 100%.
 */
export function calculateTrustScore(reports, upvotes) {
  const penalty = (reports * 12) + (upvotes * 2);
  return Math.max(10, 100 - penalty);
}
