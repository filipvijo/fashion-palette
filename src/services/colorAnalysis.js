// Mock API for color analysis with 12 seasons
export const analyzePhoto = async (photo) => {
    console.log('Analyzing photo:', photo);
  
    if (!photo) {
      throw new Error('No photo provided for analysis');
    }
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Expanded to 12 seasons
      const seasons = [
        'Deep Winter', 'Cool Winter', 'Clear Winter',
        'Warm Spring', 'Light Spring', 'Clear Spring',
        'Light Summer', 'Cool Summer', 'Soft Summer',
        'Deep Autumn', 'Warm Autumn', 'Soft Autumn',
      ];
      const palettes = {
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
  
      const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
      const result = {
        season: randomSeason,
        palette: palettes[randomSeason],
      };
  
      console.log('Analysis result:', result);
      return result;
    } catch (error) {
      console.error('Error in analyzePhoto:', error);
      throw error;
    }
  };