/**
 * Evaluates a user response against model keywords and length constraints.
 * 
 * @param {Object} question - The question object containing text and keywords.
 * @param {string} userResponse - The user's typed answer.
 * @returns {Object} Evaluation results containing score, feedback, strengths, and weaknesses.
 */
export function evaluateResponse(question, userResponse) {
  if (!userResponse || userResponse.trim().length < 10) {
    return {
      score: 10,
      strengths: 'None identified.',
      weaknesses: 'The answer is too short or empty. Please provide a detailed explanation of the concept.',
      matchedKeywords: [],
      missingKeywords: question.keywords,
      feedback: 'Your answer lacks depth. Try to define the concept, explain how it is used, and give examples.'
    };
  }

  const normalizedResponse = userResponse.toLowerCase();
  const matchedKeywords = [];
  const missingKeywords = [];

  // Keyword check
  question.keywords.forEach(keyword => {
    // Check if keyword is in response (simple match)
    if (normalizedResponse.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Calculate scores
  const keywordMatchRatio = question.keywords.length > 0 
    ? matchedKeywords.length / question.keywords.length 
    : 1.0;
  
  // Length score component (max 30 points)
  const length = userResponse.trim().length;
  let lengthScore = 0;
  if (length > 200) lengthScore = 30;
  else if (length > 100) lengthScore = 20;
  else if (length > 50) lengthScore = 10;
  else lengthScore = 5;

  // Keyword score component (max 70 points)
  const keywordScore = Math.round(keywordMatchRatio * 70);

  const totalScore = Math.min(100, lengthScore + keywordScore);

  // Generate qualitative feedback
  let strengths = '';
  let weaknesses = '';
  let feedback = '';

  if (matchedKeywords.length > 0) {
    strengths = `You correctly mentioned key concepts like: ${matchedKeywords.slice(0, 3).join(', ')}.`;
  } else {
    strengths = 'The response is structured but did not hit the core technical terminology required.';
  }

  if (missingKeywords.length > 0) {
    weaknesses = `You could improve by discussing: ${missingKeywords.slice(0, 3).join(', ')}.`;
  } else {
    weaknesses = 'Great technical coverage! No major missing concepts identified.';
  }

  if (totalScore >= 80) {
    feedback = 'Excellent answer! You demonstrated solid understanding, comprehensive technical coverage, and explained the concept clearly.';
  } else if (totalScore >= 60) {
    feedback = 'Good response. You cover the basics but missing some technical depth. Try to expand on the internal workings or use cases.';
  } else if (totalScore >= 40) {
    feedback = 'Passable response. You know the high-level definition but need to study the technical keywords and structure your explanation better.';
  } else {
    feedback = 'Weak answer. The response is either too brief or lacks key technical details. Review the model answer and focus on using accurate terminologies.';
  }

  return {
    score: totalScore,
    strengths,
    weaknesses,
    matchedKeywords,
    missingKeywords,
    feedback
  };
}
