import { API_CONFIG, isApiConfigured } from '../config/api';

/**
 * Converts an image file to base64 encoding
 * @param {File} imageFile - The image file to convert
 * @returns {Promise<string>} - A promise that resolves to the base64 encoded image
 */
export const convertImageToBase64 = (imageFile) => {
  return new Promise((resolve, reject) => {
    if (!imageFile) {
      reject(new Error('No image file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Get the base64 string (remove the data:image/jpeg;base64, part)
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(imageFile);
  });
};

/**
 * Analyzes an image using the Grok-2-Vision1212 API
 * @param {string} base64Image - Base64 encoded image
 * @returns {Promise<Object>} - A promise that resolves to the API response
 */
export const analyzeImageWithGrok = async (base64Image) => {
  if (!isApiConfigured()) {
    throw new Error('Grok API key is not configured');
  }

  try {
    const response = await fetch(API_CONFIG.GROK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.GROK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this person\'s photo and suggest a seasonal color palette that would complement them. Provide 4 specific hex color codes that would look good on them based on their skin tone, hair color, and overall coloring. Also determine which of the 12 color seasons they belong to (Deep Winter, Cool Winter, Clear Winter, Warm Spring, Light Spring, Clear Spring, Light Summer, Cool Summer, Soft Summer, Deep Autumn, Warm Autumn, or Soft Autumn). Provide a brief explanation of why these colors would suit them.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing image with Grok:', error);
    throw error;
  }
};

/**
 * Extracts color palette, season, and explanation from Grok API response
 * @param {Object} grokResponse - The response from the Grok API
 * @returns {Object} - An object containing the extracted information
 */
export const extractColorAnalysis = (grokResponse) => {
  try {
    // Get the assistant's message content
    const assistantMessage = grokResponse.choices[0]?.message?.content || '';

    // Extract hex color codes using regex
    const hexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
    const hexColors = assistantMessage.match(hexColorRegex) || [];

    // Take up to 4 colors, fill with defaults if needed
    const palette = hexColors.slice(0, 4);
    while (palette.length < 4) {
      palette.push('#C9A87D'); // Default color if not enough colors found
    }

    // Extract the season using regex for any of the 12 seasons
    const seasonRegex = /(Deep Winter|Cool Winter|Clear Winter|Warm Spring|Light Spring|Clear Spring|Light Summer|Cool Summer|Soft Summer|Deep Autumn|Warm Autumn|Soft Autumn)/i;
    const seasonMatch = assistantMessage.match(seasonRegex);
    const season = seasonMatch ? seasonMatch[0] : 'Warm Autumn'; // Default season if not found

    // Extract explanation from the message
    let explanation = assistantMessage;

    // Remove technical parts like hex codes
    explanation = explanation.replace(hexColorRegex, '');

    // Clean up the text to get a concise explanation
    explanation = explanation.replace(/\n+/g, ' ').trim();

    // Extract a more focused explanation about why these colors were chosen
    let colorExplanation = '';

    // Look for common phrases that introduce explanations
    const explanationMarkers = [
      'These colors would suit you because',
      'These colors suit you because',
      'These colors complement your',
      'I chose these colors because',
      'I selected these colors because',
      'These colors were selected because',
      'These colors will complement your',
      'This palette suits you because',
      'This color palette complements your'
    ];

    // Try to find a more specific explanation using the markers
    for (const marker of explanationMarkers) {
      const markerIndex = explanation.indexOf(marker);
      if (markerIndex !== -1) {
        // Extract the text after the marker
        const extractedText = explanation.substring(markerIndex);
        // Limit to a reasonable length (about 2 sentences)
        const sentenceEndMarkers = ['. ', '! ', '? '];
        let endIndex = extractedText.length;

        // Find the end of the second sentence
        let sentenceCount = 0;
        for (let i = 0; i < extractedText.length; i++) {
          for (const endMarker of sentenceEndMarkers) {
            if (extractedText.substring(i).startsWith(endMarker)) {
              sentenceCount++;
              if (sentenceCount >= 2) {
                endIndex = i + 1;
                break;
              }
            }
          }
          if (sentenceCount >= 2) break;
        }

        colorExplanation = extractedText.substring(0, endIndex).trim();
        break;
      }
    }

    // If we couldn't find a specific explanation, create a generic one
    if (!colorExplanation) {
      colorExplanation = `These colors were selected to complement your natural features based on your photo analysis.`;
    }

    return {
      palette,
      season,
      explanation,
      colorExplanation
    };
  } catch (error) {
    console.error('Error extracting color analysis:', error);
    throw new Error('Failed to extract color analysis from API response');
  }
};
