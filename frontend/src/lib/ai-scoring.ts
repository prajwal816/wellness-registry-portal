
// AI Scoring System for AYUSH Applications

// Define scoring criteria and weight
const SCORING_CRITERIA = {
  innovation: {
    weight: 0.25,
    keywords: ['innovative', 'novel', 'breakthrough', 'new', 'first', 'pioneering', 'revolutionary', 'unique', 'cutting-edge', 'groundbreaking', 'disruptive', 'research-based', 'patent', 'invention']
  },
  marketViability: {
    weight: 0.25,
    keywords: ['market', 'demand', 'customers', 'growth', 'scale', 'revenue', 'business model', 'profit', 'sustainable', 'commercial', 'monetize', 'projection', 'viable', 'sales', 'consumer', 'adoption', 'traction', 'return', 'investment']
  },
  compliance: {
    weight: 0.25,
    keywords: ['compliance', 'regulation', 'guidelines', 'standard', 'certification', 'quality', 'safety', 'ethical', 'authentic', 'traditional', 'natural', 'organic', 'sustainable', 'tested', 'verified', 'approved', 'legal', 'protocol', 'procedure']
  },
  teamStrength: {
    weight: 0.15,
    keywords: ['team', 'experience', 'expertise', 'background', 'qualified', 'skilled', 'professional', 'founder', 'leadership', 'education', 'degree', 'PhD', 'MBA', 'management', 'industry', 'years', 'knowledge', 'track record', 'success']
  },
  relevance: {
    weight: 0.10,
    keywords: ['ayurveda', 'yoga', 'unani', 'siddha', 'homeopathy', 'traditional medicine', 'ayush', 'herbal', 'wellness', 'holistic', 'healing', 'natural remedy', 'ancient', 'wisdom', 'balance', 'health', 'therapy', 'alternative medicine', 'complementary']
  }
};

// Sentiment analysis dictionary (simplified)
const SENTIMENT = {
  positive: ['success', 'beneficial', 'effective', 'proven', 'reliable', 'opportunity', 'solution', 'improve', 'advantage', 'excellent', 'optimal', 'enhance', 'promising', 'potential', 'growth'],
  negative: ['challenge', 'difficult', 'problem', 'issue', 'concern', 'risk', 'failure', 'obstacle', 'limitation', 'drawback', 'downside', 'constraint', 'complication', 'setback']
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
      const regex = new RegExp(`\\b${keyword}\\b|\\b${keyword}s\\b|\\b${keyword}es\\b|\\b${keyword}ing\\b|\\b${keyword}ed\\b`, 'gi');
      const count = (textToAnalyze.match(regex) || []).length;
      matches += count;
    });
    
    // Calculate raw score based on keyword density and text length
    const textLength = textToAnalyze.length;
    const keywordDensity = matches / Math.max(1, textLength / 100);
    let rawScore = Math.min(100, keywordDensity * 200);
    
    // Add length bonus (longer explanations tend to be more thought-out)
    if (textLength > 300) rawScore += 5;
    if (textLength > 600) rawScore += 10;
    if (textLength > 1000) rawScore += 15;
    
    // Adjust by text sentiment
    let sentimentScore = 0;
    SENTIMENT.positive.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b|\\b${term}s\\b|\\b${term}ing\\b|\\b${term}ed\\b`, 'gi');
      sentimentScore += (textToAnalyze.match(regex) || []).length;
    });
    
    SENTIMENT.negative.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b|\\b${term}s\\b|\\b${term}ing\\b|\\b${term}ed\\b`, 'gi');
      const negativeMatches = (textToAnalyze.match(regex) || []).length;
      // Negative terms count less if they're presented as solutions to problems
      const solutionContexts = ['solve', 'address', 'overcome', 'mitigate', 'resolve'];
      let inSolutionContext = 0;
      
      solutionContexts.forEach(context => {
        const regex = new RegExp(`${context}.*${term}|${term}.*${context}`, 'gi');
        inSolutionContext += (textToAnalyze.match(regex) || []).length;
      });
      
      sentimentScore -= Math.max(0, negativeMatches - inSolutionContext);
    });
    
    // Apply sentiment adjustment (max ±15 points)
    rawScore += Math.min(15, Math.max(-15, sentimentScore * 2));
    
    // Store the weighted score (0-100)
    criteriaScores[criteria] = Math.min(100, Math.max(0, rawScore));
  });
  
  // Document bonus (more documents usually indicates better preparation)
  const documentBonus = Math.min(15, documents.length * 3);
  
  // Calculate overall score (weighted average)
  let overallScore = 0;
  Object.entries(SCORING_CRITERIA).forEach(([criteria, { weight }]) => {
    overallScore += criteriaScores[criteria] * weight;
  });
  
  // Add document bonus
  overallScore = Math.min(100, overallScore + documentBonus);
  
  // Round the final score
  overallScore = Math.round(overallScore);
  
  // Determine application status based on score
  // Updated threshold from 70 to 45 as per requirement
  let status = 'under-review';
  if (overallScore >= 45) {
    status = 'approved';
  } else {
    status = 'rejected';
  }
  
  return {
    overallScore,
    criteriaScores,
    status
  };
};
