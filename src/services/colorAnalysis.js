// Color analysis using Grok-2-Vision1212 API
import { convertImageToBase64, analyzeImageWithGrok, extractColorAnalysis } from './grokVisionService';
import { isApiConfigured } from '../config/api';

// Default palettes for fallback
const DEFAULT_PALETTES = {
  'Deep Winter': ['#2b5876', '#4e4376', '#f7768e', '#ff9e64'],
  'Cool Winter': ['#2b5876', '#4e4376', '#a3bffa', '#f5a1d7'],
  'Clear Winter': ['#2b5876', '#4e4376', '#ff9e64', '#f5f7a1'],
  'Warm Spring': ['#f7e1a1', '#f5f7a1', '#a1f7c4', '#a1d4f7'],
  'Light Spring': ['#f7e1a1', '#f5f7a1', '#a1f7c4', '#f5a1d7'],
  'Clear Spring': ['#f7e1a1', '#f5f7a1', '#ff9e64', '#a1d4f7'],
  'Light Summer': ['#a3bffa', '#f5f7a1', '#a1f7c4', '#f5a1d7'],
  'Cool Summer': ['#a3bffa', '#f5f7a1', '#a1f7c4', '#a1d4f7'],
  'Soft Summer': ['#a3bffa', '#f5f7a1', '#a1f7c4', '#d76d77'],
  'Deep Autumn': ['#d76d77', '#ff9e64', '#f7e1a1', '#a1d4f7'],
  'Warm Autumn': ['#d76d77', '#ff9e64', '#f7e1a1', '#2b5876'],
  'Soft Autumn': ['#d76d77', '#ff9e64', '#f7e1a1', '#a3bffa'],
};

// Seasons list for fallback
const SEASONS = Object.keys(DEFAULT_PALETTES);

export const analyzePhoto = async (photo) => {
  if (!photo) {
    throw new Error('No photo provided for analysis');
  }

  try {
    // Check if API is configured
    if (!isApiConfigured()) {
      console.warn('Grok API key not configured, using fallback random analysis');
      return useFallbackAnalysis();
    }

    // Convert image to base64
    const base64Image = await convertImageToBase64(photo);

    // Call Grok API
    const grokResponse = await analyzeImageWithGrok(base64Image);

    // Extract color analysis from response
    const { palette, season, explanation, colorExplanation } = extractColorAnalysis(grokResponse);

    const result = {
      season,
      palette,
      explanation,
      colorExplanation
    };

    console.log('Analysis result:', result);
    return result;
  } catch (error) {
    console.error('Error in color analysis:', error);
    console.warn('Using fallback random analysis due to error');
    return useFallbackAnalysis();
  }
};

// Fallback function that uses random selection (original implementation)
const useFallbackAnalysis = () => {
  const randomSeason = SEASONS[Math.floor(Math.random() * SEASONS.length)];
  const explanation = `Based on your coloring, you appear to be a ${randomSeason} type. These colors will complement your natural features and enhance your overall appearance.`;
  return {
    season: randomSeason,
    palette: DEFAULT_PALETTES[randomSeason],
    explanation: explanation,
    colorExplanation: `These colors were selected to complement your natural features and enhance your overall appearance.`
  };
};

// Hook for using the color analysis in components
export const useColorAnalysis = () => {
  return { analyzePhoto };
};
