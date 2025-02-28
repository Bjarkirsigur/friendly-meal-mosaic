
/**
 * Calculate protein-to-calorie ratio and return the classification
 * 
 * High: >= 0.075 (7.5g protein per 100 calories or more)
 * Medium: >= 0.04 and < 0.075 (Between 4g and 7.5g protein per 100 calories)
 * Low: < 0.04 (Less than 4g protein per 100 calories)
 */
export const getProteinRatio = (calories: number, protein: number): {
  ratio: number;
  classification: 'Low' | 'Medium' | 'High';
  color: string;
} => {
  if (calories === 0) return { ratio: 0, classification: 'Low', color: 'text-red-500' };
  
  const ratio = protein / calories;
  
  if (ratio >= 0.075) {
    return { ratio, classification: 'High', color: 'text-green-600' };
  } else if (ratio >= 0.04) {
    return { ratio, classification: 'Medium', color: 'text-amber-500' };
  } else {
    return { ratio, classification: 'Low', color: 'text-red-500' };
  }
};

/**
 * Get a human-readable description of the protein ratio
 */
export const getProteinRatioDescription = (calories: number, protein: number): string => {
  const { ratio, classification } = getProteinRatio(calories, protein);
  const proteinPer100Cal = (ratio * 100).toFixed(1);
  
  return `${classification} protein ratio (${proteinPer100Cal}g per 100 calories)`;
};
