// API Configuration
export const API_CONFIG = {
  GROK_API_KEY: process.env.REACT_APP_GROK_API_KEY || '',
  GROK_API_ENDPOINT: 'https://api.groq.com/openai/v1/chat/completions', // Grok API endpoint
};

// Check if API key is configured
export const isApiConfigured = () => {
  return !!API_CONFIG.GROK_API_KEY;
};
