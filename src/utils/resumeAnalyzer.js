/**
 * Resume Analysis Engine
 * Analyzes resume text to extract skills, calculate ATS score, and provide suggestions.
 */

// Comprehensive skill database organized by category
const SKILL_DATABASE = {
  'Programming Languages': ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'scala', 'r', 'matlab'],
  'Frontend': ['react', 'angular', 'vue', 'next.js', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'redux', 'webpack', 'vite', 'jquery', 'svelte'],
  'Backend': ['node.js', 'express', 'spring boot', 'django', 'flask', 'fastapi', '.net', 'laravel', 'rails', 'spring', 'hibernate', 'servlets', 'jsp'],
  'Database': ['mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite', 'cassandra', 'dynamodb', 'firebase', 'elasticsearch'],
  'Cloud & DevOps': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'terraform', 'ansible', 'ci/cd', 'linux', 'nginx', 'apache'],
  'Data Science & AI': ['machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'nlp', 'computer vision', 'data analysis'],
  'Tools & Others': ['git', 'github', 'jira', 'agile', 'scrum', 'rest api', 'graphql', 'microservices', 'api', 'postman', 'figma', 'vs code'],
};

// All skills flattened for matching
const ALL_SKILLS = Object.values(SKILL_DATABASE).flat();

// Role-based recommended skills
const ROLE_SKILLS = {
  'Java Developer': ['java', 'spring boot', 'spring', 'hibernate', 'mysql', 'rest api', 'microservices', 'maven', 'junit', 'git'],
  'Frontend Developer': ['react', 'javascript', 'typescript', 'html', 'css', 'redux', 'next.js', 'tailwind', 'webpack', 'git'],
  'Backend Developer': ['node.js', 'python', 'java', 'sql', 'rest api', 'docker', 'git', 'microservices', 'redis', 'mongodb'],
  'Full Stack Developer': ['react', 'node.js', 'javascript', 'html', 'css', 'mongodb', 'sql', 'git', 'docker', 'rest api'],
  'Data Scientist': ['python', 'machine learning', 'pandas', 'numpy', 'tensorflow', 'sql', 'data analysis', 'statistics', 'r', 'jupyter'],
  'DevOps Engineer': ['docker', 'kubernetes', 'aws', 'ci/cd', 'jenkins', 'terraform', 'linux', 'git', 'ansible', 'monitoring'],
  'Software Engineer Intern': ['java', 'python', 'javascript', 'html', 'css', 'sql', 'git', 'data structures', 'algorithms', 'oop'],
};

/**
 * Extract skills from resume text.
 * @param {string} text - Resume text content
 * @returns {string[]} Array of detected skills
 */
function extractSkills(text) {
  const lowerText = text.toLowerCase();
  return ALL_SKILLS.filter(skill => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(lowerText);
  });
}

/**
 * Extract basic info from resume text.
 */
function extractInfo(text) {
  const lines = text.split('\n').filter(l => l.trim());
  
  // Try to extract name (usually first non-empty line)
  const name = lines[0]?.trim() || 'Unknown';
  
  // Try to extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const email = emailMatch ? emailMatch[0] : '';
  
  // Try to extract phone
  const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}/);
  const phone = phoneMatch ? phoneMatch[0] : '';
  
  // Detect sections
  const sections = {
    education: /education|academic|university|college|degree|bachelor|master/i.test(text),
    experience: /experience|work history|employment|internship/i.test(text),
    projects: /projects|portfolio|personal projects/i.test(text),
    certifications: /certifications|certificates|certified/i.test(text),
    skills: /skills|technical skills|technologies/i.test(text),
  };

  return { name, email, phone, sections };
}

/**
 * Calculate ATS compatibility score.
 */
function calculateATSScore(text, skills) {
  let score = 0;
  
  // Skill density (up to 30 points)
  score += Math.min(30, skills.length * 3);
  
  // Section completeness (up to 25 points)
  const { sections } = extractInfo(text);
  const sectionCount = Object.values(sections).filter(Boolean).length;
  score += sectionCount * 5;
  
  // Length and detail (up to 15 points)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 300) score += 15;
  else if (wordCount > 150) score += 10;
  else if (wordCount > 50) score += 5;
  
  // Formatting indicators (up to 15 points)
  if (/\d+%|\d+ percent/i.test(text)) score += 5; // Quantifiable achievements
  if (/https?:\/\//i.test(text)) score += 5; // Links (GitHub, portfolio)
  if (/\b\d{4}\b/.test(text)) score += 5; // Dates
  
  // Action verbs (up to 15 points)
  const actionVerbs = ['developed', 'implemented', 'designed', 'managed', 'created', 'built', 'led', 'improved', 'optimized', 'deployed'];
  const verbCount = actionVerbs.filter(v => text.toLowerCase().includes(v)).length;
  score += Math.min(15, verbCount * 3);

  return Math.min(100, Math.max(0, score));
}

/**
 * Generate resume improvement suggestions.
 */
function generateSuggestions(text, skills, atsScore) {
  const suggestions = [];
  const { sections } = extractInfo(text);

  if (!sections.projects) suggestions.push('Add a Projects section with detailed descriptions');
  if (!sections.certifications) suggestions.push('Include relevant certifications to stand out');
  if (!sections.education) suggestions.push('Add your Education details with GPA if strong');
  if (!/github\.com|gitlab\.com/i.test(text)) suggestions.push('Include your GitHub profile link');
  if (!/linkedin\.com/i.test(text)) suggestions.push('Add your LinkedIn profile URL');
  if (!/\d+%|\d+ percent|increased|reduced|improved by/i.test(text)) {
    suggestions.push('Add measurable achievements (e.g., "Improved performance by 40%")');
  }
  if (skills.length < 5) suggestions.push('List more technical skills relevant to your target role');
  if (text.split(/\s+/).length < 200) suggestions.push('Add more detail to your experience descriptions');
  if (!/summary|objective|about/i.test(text)) suggestions.push('Add a professional summary at the top');
  
  return suggestions.slice(0, 6);
}

/**
 * Find missing skills based on detected skills and common role requirements.
 */
function findMissingSkills(detectedSkills) {
  // Find the best matching role
  let bestRole = 'Software Engineer Intern';
  let bestMatch = 0;

  Object.entries(ROLE_SKILLS).forEach(([role, required]) => {
    const matches = required.filter(s => detectedSkills.includes(s)).length;
    if (matches > bestMatch) {
      bestMatch = matches;
      bestRole = role;
    }
  });

  const required = ROLE_SKILLS[bestRole] || [];
  const missing = required.filter(s => !detectedSkills.includes(s));

  return { missing: missing.slice(0, 8), suggestedRole: bestRole };
}

/**
 * Main resume analysis function.
 * @param {string} text - Raw text content from the resume
 * @returns {Object} Complete analysis results
 */
export function analyzeResume(text) {
  if (!text || text.trim().length < 20) {
    return {
      atsScore: 0,
      detectedSkills: [],
      missingSkills: [],
      suggestions: ['Upload a valid resume to get analysis'],
      info: { name: 'Unknown', email: '', phone: '', sections: {} },
      suggestedRole: '',
      skillCategories: {},
    };
  }

  const detectedSkills = extractSkills(text);
  const atsScore = calculateATSScore(text, detectedSkills);
  const { missing, suggestedRole } = findMissingSkills(detectedSkills);
  const suggestions = generateSuggestions(text, detectedSkills, atsScore);
  const info = extractInfo(text);

  // Categorize detected skills
  const skillCategories = {};
  Object.entries(SKILL_DATABASE).forEach(([category, skills]) => {
    const matched = skills.filter(s => detectedSkills.includes(s));
    if (matched.length > 0) {
      skillCategories[category] = matched;
    }
  });

  return {
    atsScore,
    detectedSkills,
    missingSkills: missing,
    suggestions,
    info,
    suggestedRole,
    skillCategories,
  };
}

export { ROLE_SKILLS, SKILL_DATABASE };
