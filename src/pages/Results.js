import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import fabricTexture from '../assets/fabric-texture.jpg';
import resultsBg from '../assets/results-bg.jpg';

const ResultsContainer = styled.div`
  min-height: 100vh;
  background-image: url(${resultsBg});
  background-size: cover;
  background-position: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 228, 225, 0.3), rgba(255, 215, 0, 0.2));
    z-index: 0;
  }
`;

const ResultsBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 700px;
  width: 100%;
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, #FFD700, #FF6F61) 1;
  position: relative;
  z-index: 1;
`;

const PhotoContainer = styled(motion.div)`
  position: relative;
  margin: 30px auto;
  max-width: 350px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 8px solid ${(props) => props.borderColor || '#FFD700'};
`;

const UserPhoto = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const ColorOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, ${(props) => props.color}, transparent);
  opacity: 0.7;
  pointer-events: none;
`;

const MoodBoard = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin: 40px 0;
`;

const ColorSwatch = styled(motion.div)`
  width: 140px;
  height: 140px;
  background-color: ${(props) => props.color};
  background-image: url(${fabricTexture});
  background-size: cover;
  background-blend-mode: overlay;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1A3C34;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
  border: 2px solid #FFD700;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.15) rotate(5deg);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const ShoppingSection = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const ShoppingLink = styled.a`
  display: block;
  color: #FF6F61;
  text-decoration: none;
  margin: 15px 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #FFD700;
    transform: translateX(5px);
  }
`;

const ShareSection = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const StyledButton = styled(motion.button)`
  padding: 12px 30px;
  background: linear-gradient(135deg, #FFD700, #FF6F61);
  color: #1A3C34;
  border: none;
  border-radius: 50px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    &:before {
      left: 100%;
    }
  }
`;

const Title = styled(motion.h2)`
  color: #FFFFFF;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: #1A3C34;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 20px;
  opacity: 0.9;
`;

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisResult = location.state?.analysisResult;
  const photo = location.state?.photo;
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  if (!analysisResult) {
    return <ResultsContainer><Title>No analysis result found.</Title></ResultsContainer>;
  }

  const { season, palette } = analysisResult;

  const handleNextColor = () => {
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % palette.length);
  };

  const handleLooksGood = () => {
    navigate('/shop', { state: { selectedColor: palette[currentColorIndex], photo } });
  };

  const shoppingLinks = palette.map((color, index) => ({
    color,
    url: `https://www.amazon.com/s?k=clothing+${color.replace('#', '')}`,
    label: `Shop clothing in ${color}`,
  }));

  const shareUrl = window.location.href;
  const shareText = `I discovered my seasonal palette with Fashion Palette! I'm a ${season} 🎨 Check out my colors!`;

  return (
    <ResultsContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Your Seasonal Palette: {season}
      </Title>
      <ResultsBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {photo && (
          <PhotoContainer
            borderColor={palette[currentColorIndex]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <UserPhoto src={URL.createObjectURL(photo)} alt="User" />
            <ColorOverlay color={palette[currentColorIndex]} />
          </PhotoContainer>
        )}
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Explore your personalized color palette below!
        </Subtitle>
        <MoodBoard>
          {palette.map((color, index) => (
            <ColorSwatch
              key={index}
              color={color}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2, ease: 'easeOut' }}
              whileHover={{ rotate: 5 }}
            >
              {color}
            </ColorSwatch>
          ))}
        </MoodBoard>
        <StyledButton
          onClick={handleNextColor}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Color
        </StyledButton>
        <StyledButton
          onClick={handleLooksGood}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Looks good!
        </StyledButton>
        <ShoppingSection>
          <h3 style={{ color: '#1A3C34', fontFamily: 'Playfair Display', fontSize: '1.8rem' }}>
            Shop Your Colors
          </h3>
          {shoppingLinks.map((link, index) => (
            <ShoppingLink
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </ShoppingLink>
          ))}
        </ShoppingSection>
        <ShareSection>
          <h3 style={{ color: '#1A3C34', fontFamily: 'Playfair Display', fontSize: '1.8rem' }}>
            Share Your Palette
          </h3>
          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <FacebookShareButton url={shareUrl} quote={shareText}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </ShareSection>
      </ResultsBox>
    </ResultsContainer>
  );
};

export default Results;