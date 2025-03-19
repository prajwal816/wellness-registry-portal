
// AI Scoring System for AYUSH Applications

// Define scoring criteria and weight
const SCORING_CRITERIA = {
  innovation: {
    weight: 0.25,
    keywords: ['innovative', 'novel', 'breakthrough', 'new', 'first', 'pioneering', 'revolutionary', 'unique', 'cutting-edge', 'groundbreaking', 'disruptive']
  },
  marketViability: {
    weight: 0.25,
    keywords: ['market', 'demand', 'customers', 'growth', 'scale', 'revenue', 'business model', 'profit', 'sustainable', 'commercial', 'monetize', 'projection']
  },
  compliance: {
    weight: 0.25,
    keywords: ['compliance', 'regulation', 'guidelines', 'standard', 'certification', 'quality', 'safety', 'ethical', 'authentic', 'traditional', 'natural']
  },
  teamStrength: {
    weight: 0.15,
    keywords: ['team', 'experience', 'expertise', 'background', 'qualified', 'skilled', 'professional', 'founder', 'leadership']
  },
  relevance: {
    weight: 0.10,
    keywords: ['ayurveda', 'yoga', 'unani', 'siddha', 'homeopathy', 'traditional medicine', 'ayush', 'herbal', 'wellness', 'holistic']
  }
};

// Function to analyze text and generate scores
export const scoreApplication = (
  ideaExplanation: string,
  companyDescription: string,
  type: string,
  documents: string[]
): { overallScore: number; criteriaScores: Record<string, number>; status: string } => {
  // Combine all text data for analysis
  const textToAnalyze = `${ideaExplanation} ${companyDescription}`.toLowerCase();
  
  // Calculate scores for each criteria
  const criteriaScores = {} as Record<string, number>;
  
  Object.entries(SCORING_CRITERIA).forEach(([criteria, { keywords, weight }]) => {
    // Count keyword matches
    let matches = 0;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const count = (textToAnalyze.match(regex) || []).length;
      matches += count;
    });
    
    // Calculate raw score based on keyword density
    let rawScore = Math.min(100, matches * 10);
    
    // Add length bonus (longer explanations tend to be more thought-out)
    if (textToAnalyze.length > 300) rawScore += 10;
    if (textToAnalyze.length > 600) rawScore += 10;
    
    // Adjust by text sentiment (simplified)
    // In a real implementation, you would use an NLP library for sentiment analysis
    // This is just a placeholder simulation
    const hasPositiveIndicators = [
      'successful', 'proven', 'growing', 'effective', 'solution'
    ].some(word => textToAnalyze.includes(word));
    
    if (hasPositiveIndicators) rawScore += 10;
    
    // Store the weighted score (0-100)
    criteriaScores[criteria] = Math.min(100, Math.max(0, rawScore));
  });
  
  // Document bonus (more documents usually indicates better preparation)
  const documentBonus = Math.min(20, documents.length * 5);
  
  // Calculate overall score (weighted average)
  let overallScore = 0;
  Object.entries(SCORING_CRITERIA).forEach(([criteria, { weight }]) => {
    overallScore += criteriaScores[criteria] * weight;
  });
  
  // Add document bonus
  overallScore = Math.min(100, overallScore + documentBonus);
  
  // Determine application status based on score
  let status = 'under-review';
  if (overallScore >= 70) {
    status = 'approved';
  } else if (overallScore < 40) {
    status = 'rejected';
  }
  
  return {
    overallScore: Math.round(overallScore),
    criteriaScores,
    status
  };
};
