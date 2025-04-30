import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import fabricTexture from '../assets/fabric-texture.jpg';

const ResultsContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ResultsBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.98);
  padding: 40px;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.strong};
  text-align: center;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 20px;
    width: 95%;
  }
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const PhotoContainer = styled(motion.div)`
  position: relative;
  margin: 30px auto;
  max-width: 350px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.medium};
  border: 8px solid ${props => props.borderColor || props.theme.colors.secondary};
  transition: border-color 0.3s ease;
`;

const ResultPhoto = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ColorOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background-color: ${props => props.color || 'transparent'};
  opacity: ${props => props.opacity};
  transition: all 0.3s ease;
  pointer-events: none;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const ColorSwatch = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: ${props => props.color};
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.soft};
  transition: ${props => props.theme.transitions.default};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const Button = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.secondary};
  font-weight: 500;
  cursor: pointer;
  margin: 10px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: ${props => props.theme.transitions.slow};
  }

  &:hover:before {
    left: 100%;
  }
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const SeasonDescription = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin: 20px 0 10px 0;
  line-height: 1.6;
  max-width: 600px;
  text-align: center;
`;

const ColorExplanation = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin: 0 0 20px 0;
  padding: 10px 15px;
  line-height: 1.5;
  max-width: 600px;
  text-align: center;
  background-color: ${props => props.theme.colors.lightGold};
  border-radius: 8px;
  font-style: italic;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
  padding: 15px;
  background-color: ${props => props.theme.colors.lightGold};
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 10px;
  }
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const ControlLabel = styled.label`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
`;

const ControlButton = styled(Button)`
  padding: 8px 15px;
  font-size: 0.9rem;
  background-color: ${props => props.active ? props.theme.colors.accent : props.theme.colors.primary};
  margin: 0;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 300px;
`;

const Slider = styled.input`
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  background: ${props => props.theme.colors.lightGold};
  outline: none;
  border-radius: 4px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.theme.colors.accent};
    cursor: pointer;
  }
`;

const SplitScreenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const SplitScreenHalf = styled.div`
  flex: 1;
  max-width: 48%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ExtractedColorsContainer = styled.div`
  margin: 20px 0;
`;

const ExtractedColorsTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
`;

const ExtractedColorSwatch = styled(ColorSwatch)`
  width: 60px;
  height: 60px;
`;

const ColorInfoPanel = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  padding: 20px;
  margin: 20px 0;
  text-align: left;
`;

const ColorInfoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ColorInfoSwatch = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background-color: ${props => props.color};
  margin-right: 15px;
`;

const ColorInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColorInfoName = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  margin: 0 0 5px 0;
`;

const ColorInfoHex = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 0.9rem;
  margin: 0;
  color: #666;
`;

const ColorInfoDescription = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1rem;
  line-height: 1.5;
  margin: 10px 0;
`;

const FavoritesContainer = styled.div`
  margin: 20px 0;
`;

const FavoritesTitle = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.isFavorite ? '#FFD700' : '#ccc'};
  font-size: 1.5rem;
  padding: 5px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const TutorialOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TutorialBox = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.strong};
  padding: 30px;
  max-width: 500px;
  width: 90%;
  text-align: center;
`;

const TutorialTitle = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const TutorialText = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const TutorialButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;
  const photo = location.state?.photo;
  const [selectedColor, setSelectedColor] = useState(null);
  const [overlayType, setOverlayType] = useState('none'); // 'none', 'scarf'
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [showSplitScreen, setShowSplitScreen] = useState(false);
  const [compareColor, setCompareColor] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [favoriteColors, setFavoriteColors] = useState([]);
  const [showColorInfo, setShowColorInfo] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);

  if (!results) {
    return (
      <ResultsContainer>
        <ResultsBox>
          <Title>No analysis results found.</Title>
          <Button onClick={() => navigate('/upload')}>Try Again</Button>
        </ResultsBox>
      </ResultsContainer>
    );
  }

  const { season, palette, explanation, colorExplanation } = results;

  // Set the first color as the default selected color if none is selected
  useEffect(() => {
    if (palette && palette.length > 0 && !selectedColor) {
      setSelectedColor(palette[0]);
      setCompareColor(palette[palette.length > 1 ? 1 : 0]);
    }
  }, [palette, selectedColor]);

  // Extract colors from the uploaded photo (improved simulation)
  useEffect(() => {
    if (photo && extractedColors.length === 0) {
      // In a real implementation, we would analyze the image pixels
      // For now, we'll generate some more realistic colors

      // Create a base color that's somewhat muted (like skin tones, clothing, etc.)
      const baseHue = Math.floor(Math.random() * 360); // Random hue
      const baseSaturation = 30 + Math.floor(Math.random() * 40); // Medium saturation
      const baseLightness = 40 + Math.floor(Math.random() * 30); // Medium lightness

      // Generate variations around that base color
      const simulatedExtractedColors = [
        `hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%)`,
        `hsl(${(baseHue + 30) % 360}, ${baseSaturation - 10}%, ${baseLightness + 15}%)`,
        `hsl(${(baseHue + 60) % 360}, ${baseSaturation + 10}%, ${baseLightness - 10}%)`,
        `hsl(${(baseHue + 180) % 360}, ${baseSaturation - 5}%, ${baseLightness + 5}%)`
      ];

      setExtractedColors(simulatedExtractedColors);

      // Show tutorial for first-time users (in a real app, we'd check if this is their first visit)
      if (Math.random() > 0.5) { // Randomly show tutorial for demo purposes
        setShowTutorial(true);
      }
    }
  }, [photo, extractedColors]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteColors');
    if (savedFavorites) {
      setFavoriteColors(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (favoriteColors.length > 0) {
      localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));
    }
  }, [favoriteColors]);

  // Used for both single view and split screen view
  const handleCompareColorSelect = (color) => {
    if (showSplitScreen) {
      setCompareColor(color);
    } else {
      setSelectedColor(color);
    }
  };

  const toggleOverlayType = (type) => {
    setOverlayType(overlayType === type ? 'none' : type);
  };

  const handleOpacityChange = (e) => {
    setOverlayOpacity(parseFloat(e.target.value));
  };

  const toggleSplitScreenView = () => {
    setShowSplitScreen(!showSplitScreen);
  };

  const handleShop = () => {
    navigate('/shop', { state: { selectedColor, photo, season, palette } });
  };

  const handleShareWithEffects = () => {
    // In a real implementation, this would capture the current view with effects
    // and prepare it for sharing. For now, we'll just show an alert.
    alert('This would share your photo with the current color effects applied!');
  };

  const toggleColorInfo = () => {
    setShowColorInfo(!showColorInfo);
  };

  const toggleFavorite = (color) => {
    if (favoriteColors.includes(color)) {
      setFavoriteColors(favoriteColors.filter(c => c !== color));
    } else {
      setFavoriteColors([...favoriteColors, color]);
    }
  };

  const isColorFavorite = (color) => {
    return favoriteColors.includes(color);
  };

  const getColorName = (hexColor) => {
    // In a real implementation, we would use a color naming library
    // For now, we'll return a simple description based on the color

    // Convert hex to RGB
    let r, g, b;

    if (hexColor.startsWith('#')) {
      const hex = hexColor.substring(1);
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (hexColor.startsWith('hsl')) {
      // Simple approximation for HSL colors
      const hslMatch = hexColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (hslMatch) {
        const h = parseInt(hslMatch[1]) / 360;
        const s = parseInt(hslMatch[2]) / 100;
        const l = parseInt(hslMatch[3]) / 100;

        if (s === 0) {
          r = g = b = l;
        } else {
          const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
          };

          const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          const p = 2 * l - q;

          r = hue2rgb(p, q, h + 1/3) * 255;
          g = hue2rgb(p, q, h) * 255;
          b = hue2rgb(p, q, h - 1/3) * 255;
        }
      } else {
        r = g = b = 128; // Default to gray if parsing fails
      }
    } else {
      r = g = b = 128; // Default to gray if format is unknown
    }

    // Determine the basic color name
    const hue = Math.round((Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI + 360) % 360);
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);
    const brightness = (r + g + b) / 3;

    let colorName = '';

    if (saturation < 30) {
      if (brightness < 60) colorName = 'Dark Gray';
      else if (brightness < 150) colorName = 'Gray';
      else colorName = 'Light Gray';
    } else {
      if (hue < 30 || hue >= 330) colorName = brightness < 128 ? 'Dark Red' : 'Red';
      else if (hue < 90) colorName = brightness < 128 ? 'Dark Orange' : 'Orange';
      else if (hue < 150) colorName = brightness < 128 ? 'Dark Yellow' : 'Yellow';
      else if (hue < 210) colorName = brightness < 128 ? 'Dark Green' : 'Green';
      else if (hue < 270) colorName = brightness < 128 ? 'Dark Blue' : 'Blue';
      else if (hue < 330) colorName = brightness < 128 ? 'Dark Purple' : 'Purple';
    }

    return colorName;
  };

  const getColorDescription = (color) => {
    const colorName = getColorName(color);

    // Generate a description based on the color name
    const descriptions = {
      'Dark Red': 'A deep, rich red that conveys passion and elegance. Perfect for accent pieces and evening wear.',
      'Red': 'A vibrant red that makes a bold statement. Great for adding energy to your outfit.',
      'Dark Orange': 'A warm, earthy orange with depth. Works well for fall fashion and rustic styles.',
      'Orange': 'A cheerful, vibrant orange that brings warmth and creativity to your look.',
      'Dark Yellow': 'A rich gold tone that adds luxury and sophistication to your palette.',
      'Yellow': 'A bright, sunny yellow that brings joy and optimism to your wardrobe.',
      'Dark Green': 'A deep forest green that connects with nature and tradition. Excellent for creating a grounded look.',
      'Green': 'A fresh, vibrant green that symbolizes growth and renewal. Perfect for spring and summer styles.',
      'Dark Blue': 'A deep, mysterious blue that conveys trust and professionalism. Great for business attire.',
      'Blue': 'A clear, refreshing blue that brings calm and serenity to your look.',
      'Dark Purple': 'A rich, royal purple that exudes luxury and creativity. Perfect for making a sophisticated statement.',
      'Purple': 'A vibrant purple that balances energy and calm. Great for expressing individuality.',
      'Dark Gray': 'A deep charcoal that provides sophistication and pairs well with almost any color.',
      'Gray': 'A versatile neutral that creates balance in your wardrobe and complements your seasonal colors.',
      'Light Gray': 'A soft, airy gray that adds subtle elegance to your look without overwhelming your natural coloring.'
    };

    return descriptions[colorName] || 'A beautiful color that complements your seasonal palette perfectly.';
  };

  const handleNextTutorialStep = () => {
    if (tutorialStep < 4) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const handleSkipTutorial = () => {
    setShowTutorial(false);
  };

  const getTutorialContent = () => {
    switch (tutorialStep) {
      case 1:
        return {
          title: 'Welcome to Fashion Palette!',
          text: 'This quick tutorial will show you how to use the color visualization features to find your perfect colors.'
        };
      case 2:
        return {
          title: 'Try Scarf Overlay',
          text: 'Click on the scarf overlay button to see how colors would look as a scarf around your neck.'
        };
      case 3:
        return {
          title: 'Compare Colors',
          text: 'Use the split-screen view to compare two different colors side by side and see which one suits you better.'
        };
      case 4:
        return {
          title: 'Save Your Favorites',
          text: 'Click the star icon to save colors you love to your favorites collection for future reference.'
        };
      default:
        return {
          title: 'Welcome',
          text: 'Enjoy exploring your perfect color palette!'
        };
    }
  };

  const shareUrl = window.location.href;
  const shareText = `I discovered my seasonal palette with Fashion Palette! I'm a ${season} 🎨 Check out my colors!`;

  // Tutorial content
  const tutorialContent = getTutorialContent();

  return (
    <ResultsContainer>
      <AnimatePresence>
        {showTutorial && (
          <TutorialOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TutorialBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TutorialTitle>{tutorialContent.title}</TutorialTitle>
              <TutorialText>{tutorialContent.text}</TutorialText>
              <TutorialButtons>
                <Button onClick={handleSkipTutorial}>Skip Tutorial</Button>
                <Button onClick={handleNextTutorialStep}>
                  {tutorialStep < 4 ? 'Next' : 'Finish'}
                </Button>
              </TutorialButtons>
            </TutorialBox>
          </TutorialOverlay>
        )}
      </AnimatePresence>

      <ResultsBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Your Seasonal Palette: {season}</Title>

        <SeasonDescription>
          {explanation || getSeasonDescription(season)}
        </SeasonDescription>

        {colorExplanation && (
          <ColorExplanation>
            <strong>Why these colors?</strong> {colorExplanation}
          </ColorExplanation>
        )}

        {!showSplitScreen ? (
          // Single photo view
          photo && (
            <PhotoContainer borderColor={selectedColor}>
              <ResultPhoto src={URL.createObjectURL(photo)} alt="User" />
              {overlayType !== 'none' && (
                <ColorOverlay
                  color={selectedColor}
                  overlayType={overlayType}
                  opacity={overlayOpacity}
                />
              )}
            </PhotoContainer>
          )
        ) : (
          // Split screen view
          <SplitScreenContainer>
            <SplitScreenHalf>
              {photo && (
                <PhotoContainer borderColor={selectedColor}>
                  <ResultPhoto src={URL.createObjectURL(photo)} alt="User" />
                  {overlayType !== 'none' && (
                    <ColorOverlay
                      color={selectedColor}
                      overlayType={overlayType}
                      opacity={overlayOpacity}
                    />
                  )}
                </PhotoContainer>
              )}
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Color 1</p>
            </SplitScreenHalf>
            <SplitScreenHalf>
              {photo && (
                <PhotoContainer borderColor={compareColor}>
                  <ResultPhoto src={URL.createObjectURL(photo)} alt="User" />
                  {overlayType !== 'none' && (
                    <ColorOverlay
                      color={compareColor}
                      overlayType={overlayType}
                      opacity={overlayOpacity}
                    />
                  )}
                </PhotoContainer>
              )}
              <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Color 2</p>
            </SplitScreenHalf>
          </SplitScreenContainer>
        )}

        <ControlsContainer>
          <ExtractedColorsTitle>Your Recommended Palette</ExtractedColorsTitle>
          <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Click on a color to see how it looks:
          </p>
          <PaletteContainer>
            {palette.map((color, index) => (
              <div key={color} style={{ position: 'relative', display: 'inline-block' }}>
                <ColorSwatch
                  color={color}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleCompareColorSelect(color)}
                  style={{
                    border: (showSplitScreen ? compareColor : selectedColor) === color ? '3px solid black' : 'none',
                    transform: (showSplitScreen ? compareColor : selectedColor) === color ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <FavoriteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(color);
                  }}
                  isFavorite={isColorFavorite(color)}
                  style={{ position: 'absolute', top: '-5px', right: '-5px' }}
                >
                  ★
                </FavoriteButton>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-5px',
                    right: '-5px',
                    background: '#333',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color);
                    setShowColorInfo(!showColorInfo);
                  }}
                >
                  i
                </div>
              </div>
            ))}
          </PaletteContainer>

          {showColorInfo && selectedColor && (
            <ColorInfoPanel>
              <ColorInfoHeader>
                <ColorInfoSwatch color={selectedColor} />
                <ColorInfoDetails>
                  <ColorInfoName>{getColorName(selectedColor)}</ColorInfoName>
                  <ColorInfoHex>{selectedColor}</ColorInfoHex>
                </ColorInfoDetails>
              </ColorInfoHeader>
              <ColorInfoDescription>
                {getColorDescription(selectedColor)}
              </ColorInfoDescription>
            </ColorInfoPanel>
          )}

          <ControlRow>
            <ControlLabel>Overlay Type:</ControlLabel>
            <ControlButton
              active={overlayType === 'none'}
              onClick={() => toggleOverlayType('none')}
            >
              None
            </ControlButton>
            <ControlButton
              active={overlayType === 'scarf'}
              onClick={() => toggleOverlayType('scarf')}
            >
              Scarf
            </ControlButton>
          </ControlRow>

          <ControlRow>
            <ControlLabel>Overlay Opacity:</ControlLabel>
            <SliderContainer>
              <Slider
                type="range"
                min="0.1"
                max="0.9"
                step="0.1"
                value={overlayOpacity}
                onChange={handleOpacityChange}
              />
              <span>{overlayOpacity}</span>
            </SliderContainer>
          </ControlRow>

          <ControlRow>
            <ControlButton
              onClick={toggleSplitScreenView}
              active={showSplitScreen}
            >
              {showSplitScreen ? 'Single View' : 'Compare Two Colors'}
            </ControlButton>
          </ControlRow>
        </ControlsContainer>

        {favoriteColors.length > 0 && (
          <FavoritesContainer>
            <FavoritesTitle>Your Favorite Colors</FavoritesTitle>
            <PaletteContainer>
              {favoriteColors.map((color) => (
                <div key={`fav-${color}`} style={{ position: 'relative', display: 'inline-block' }}>
                  <ColorSwatch
                    color={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCompareColorSelect(color)}
                  />
                  <FavoriteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(color);
                    }}
                    isFavorite={true}
                    style={{ position: 'absolute', top: '-5px', right: '-5px' }}
                  >
                    ★
                  </FavoriteButton>
                </div>
              ))}
            </PaletteContainer>
          </FavoritesContainer>
        )}

        {extractedColors.length > 0 && (
          <ExtractedColorsContainer>
            <ExtractedColorsTitle>Colors Extracted From Your Photo</ExtractedColorsTitle>
            <PaletteContainer>
              {extractedColors.map((color, index) => (
                <ExtractedColorSwatch
                  key={`extracted-${index}`}
                  color={color}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCompareColorSelect(color)}
                  style={{
                    border: (showSplitScreen ? compareColor : selectedColor) === color ? '3px solid black' : 'none',
                    transform: (showSplitScreen ? compareColor : selectedColor) === color ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              ))}
            </PaletteContainer>
          </ExtractedColorsContainer>
        )}

        <ControlRow style={{ marginTop: '20px' }}>
          <Button
            onClick={handleShop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Your Colors
          </Button>
          <Button
            onClick={handleShareWithEffects}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ background: '#4267B2' }}
          >
            Share With Effects
          </Button>
        </ControlRow>

        <ShareContainer>
          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl} quote={shareText}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </ShareContainer>
      </ResultsBox>
    </ResultsContainer>
  );
};

const getSeasonDescription = (season) => {
  const descriptions = {
    'Deep Winter': 'Your palette features rich, deep colors that mirror the dramatic contrast of winter landscapes. Think deep navy, burgundy, and emerald green.',
    'Cool Winter': 'Your colors are crisp and clear with blue undertones, like fresh snow and winter skies.',
    'Clear Winter': 'Your palette showcases vivid colors with high contrast, perfect for making bold statements.',
    'Warm Spring': 'Your colors are warm and fresh, like the first blooms of spring. Golden yellows and coral pinks suit you beautifully.',
    'Light Spring': 'Your palette features delicate, warm-tinted colors that echo the freshness of early spring mornings.',
    'Clear Spring': 'Your colors are bright and clear, like spring flowers in full bloom.',
    'Light Summer': 'Your palette consists of soft, light colors with cool undertones, like a misty summer morning.',
    'Cool Summer': 'Your colors are medium-intensity with cool undertones, like a serene summer garden.',
    'Soft Summer': 'Your palette features muted colors with cool undertones, like summer flowers in soft focus.',
    'Deep Autumn': 'Your colors are rich and warm, like autumn leaves at their peak.',
    'Warm Autumn': 'Your palette showcases golden-warm colors, like harvest time and autumn sunlight.',
    'Soft Autumn': 'Your colors are warm and muted, like the gentle tones of late autumn.',
  };

  return descriptions[season] || 'Your unique color palette enhances your natural beauty and helps you make confident style choices.';
};

export default Results;
