import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeBg from '../assets/homepage-bg.jpg';
import winterImg from '../assets/winter.jpg';
import springImg from '../assets/spring.jpg';
import summerImg from '../assets/summer.jpg';
import autumnImg from '../assets/autumn.jpg';
// Placeholder visuals for the other sections (replace with your actual visuals)
import twelveSeasonsImg from '../assets/twelve-seasons.jpg';
import makeupSimulationImg from '../assets/makeup-simulation.jpg';
import wardrobeManagementImg from '../assets/wardrobe-management.jpg';
import colorConfidenceImg from '../assets/color-confidence.jpg';

const HomeContainer = styled.div`
  min-height: 100vh;
  background-image: url(${homeBg});
  background-size: cover;
  background-position: center;
  padding: 40px;
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

const Title = styled(motion.h1)`
  color: white; /* Changed to white */
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const SeasonGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  position: relative;
  z-index: 1;
  margin-bottom: 30px; /* Reduced margin to bring button closer */
`;

const SeasonCard = styled(motion.div)`
  position: relative;
  width: 280px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid #FFD700;
  perspective: 1000px;
  margin: 0 auto;
`;

const CardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Playfair Display', serif;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(135deg, #FFD700, #FF6F61);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #1A3C34;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  transform: rotateY(180deg);
  box-sizing: border-box;
`;

const CardBackContent = styled.div`
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  p {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
  }
`;

const Section = styled(motion.div)`
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  color: white; /* Changed to white */
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  text-align: center;
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
  margin: 20px auto; /* Adjusted margin for better spacing */
  display: block;
  z-index: 1;
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

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid #FFD700;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Playfair Display', serif;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const FeatureText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    font-weight: 300;
  }
`;

const PaywallOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
`;

const seasons = [
  {
    name: 'Winter',
    bgImage: winterImg,
    desc: 'Winter colors are cool, bold, and high-contrast, often suiting people with striking features like dark hair and pale skin or deep skin tones with cool undertones.',
  },
  {
    name: 'Spring',
    bgImage: springImg,
    desc: 'Spring colors are warm, fresh, and vibrant, perfect for people with light, warm-toned skin, golden hair, and bright eyes.',
  },
  {
    name: 'Summer',
    bgImage: summerImg,
    desc: 'Summer colors are soft, cool, and muted, ideal for those with light, cool-toned skin, ash-blonde or light brown hair, and soft eye colors.',
  },
  {
    name: 'Autumn',
    bgImage: autumnImg,
    desc: 'Autumn colors are warm, rich, and earthy, complementing people with warm-toned skin, red or golden-brown hair, and deep, warm eyes.',
  },
];

const features = [
  {
    name: '12 Seasons Analysis',
    bgImage: twelveSeasonsImg,
    desc: 'Discover your precise seasonal palette with our advanced 12-season analysis.',
  },
  {
    name: 'Makeup Simulation',
    bgImage: makeupSimulationImg,
    desc: 'Try on makeup in your recommended colors virtually.',
  },
  {
    name: 'Wardrobe Management',
    bgImage: wardrobeManagementImg,
    desc: 'Build and manage a wardrobe with your best colors.',
  },
  {
    name: 'Color Confidence Score',
    bgImage: colorConfidenceImg,
    desc: 'Get a confidence score for how well colors suit you.',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (seasonName) => {
    setFlippedCard(flippedCard === seasonName ? null : seasonName);
  };

  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Fashion Palette
      </Title>

      {/* Main Seasons Section */}
      <Section>
        <SectionTitle>Explore the Four Seasons</SectionTitle>
        <SeasonGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {seasons.map((season, index) => (
            <SeasonCard
              key={season.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
              onClick={() => handleCardClick(season.name)}
            >
              <CardInner
                animate={{ rotateY: flippedCard === season.name ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <CardFront bgImage={season.bgImage}>
                  <h3>{season.name}</h3>
                </CardFront>
                <CardBack>
                  <CardBackContent>
                    <h3>{season.name}</h3>
                    <p>{season.desc}</p>
                  </CardBackContent>
                </CardBack>
              </CardInner>
            </SeasonCard>
          ))}
        </SeasonGrid>
        {/* Moved the button here, right below the seasons cards */}
        <StyledButton
          onClick={() => navigate('/upload')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Find Your Colors
        </StyledButton>
      </Section>

      {/* Features Section */}
      <Section>
        <SectionTitle>Discover More Features</SectionTitle>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.name}
              bgImage={feature.bgImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <FeatureText>
                <h3>{feature.name}</h3>
                <p>{feature.desc}</p>
              </FeatureText>
              <PaywallOverlay>Coming Soon - Premium Feature</PaywallOverlay>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>
    </HomeContainer>
  );
};

export default Home;