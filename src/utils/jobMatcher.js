/**
 * Job matching engine.
 * Matches user skills against job requirements and returns ranked results.
 */

/**
 * Calculate match percentage between user skills and job requirements.
 */
export function calculateMatch(userSkills, requiredSkills) {
  if (!requiredSkills || requiredSkills.length === 0) return 0;
  const normalizedUser = userSkills.map(s => s.toLowerCase());
  const matches = requiredSkills.filter(s => normalizedUser.includes(s.toLowerCase()));
  return Math.round((matches.length / requiredSkills.length) * 100);
}

/**
 * Get job recommendations sorted by match percentage.
 */
export function getRecommendations(userSkills, jobs) {
  return jobs
    .map(job => ({
      ...job,
      matchPercentage: calculateMatch(userSkills, job.requiredSkills),
      matchedSkills: job.requiredSkills.filter(s => 
        userSkills.map(u => u.toLowerCase()).includes(s.toLowerCase())
      ),
      missingSkills: job.requiredSkills.filter(s => 
        !userSkills.map(u => u.toLowerCase()).includes(s.toLowerCase())
      ),
    }))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
