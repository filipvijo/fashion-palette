import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
import { FaCamera, FaPalette, FaTshirt, FaCheck } from 'react-icons/fa';
import LanguageSwitcher from '../components/LanguageSwitcher';

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
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4));
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
  cursor: pointer;
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
    background-color: rgba(0, 0, 0, 0.2);
  }

  h3 {
    position: relative;
    z-index: 1;
    font-size: 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    font-weight: 700;
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
  padding: 0 10px;
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin-bottom: 15px;
    font-weight: 700;
  }
  p {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.5;
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
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const FeatureText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 15px;
  h3 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    font-weight: 700;
  }
  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
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

const WelcomeSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto 60px;
`;

const WelcomeText = styled(motion.p)`
  color: white;
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 30px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const HowItWorksSection = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 40px;
  margin: 60px auto;
  max-width: 1000px;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;

const HowItWorksTitle = styled.h2`
  color: #1A3C34;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD700, #FF6F61);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #1A3C34;
  font-size: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #1A3C34;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

const TestimonialsSection = styled(motion.div)`
  margin: 60px auto;
  max-width: 1000px;
  position: relative;
  z-index: 1;
`;

const TestimonialsTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const TestimonialCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: #1A3C34;
  text-align: right;
`;

const Footer = styled.footer`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 30px;
  text-align: center;
  color: white;
  margin-top: 60px;
  border-radius: 10px;
  position: relative;
  z-index: 1;
`;

const FooterText = styled.p`
  margin-bottom: 15px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const FooterLink = styled.a`
  color: #FFD700;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const getSeasons = (t) => [
  {
    name: t('seasons.winter.name'),
    bgImage: winterImg,
    desc: t('seasons.winter.desc'),
  },
  {
    name: t('seasons.spring.name'),
    bgImage: springImg,
    desc: t('seasons.spring.desc'),
  },
  {
    name: t('seasons.summer.name'),
    bgImage: summerImg,
    desc: t('seasons.summer.desc'),
  },
  {
    name: t('seasons.autumn.name'),
    bgImage: autumnImg,
    desc: t('seasons.autumn.desc'),
  },
];

const getFeatures = (t) => [
  {
    name: t('features.twelveSeasons.name'),
    bgImage: twelveSeasonsImg,
    desc: t('features.twelveSeasons.desc'),
  },
  {
    name: t('features.makeup.name'),
    bgImage: makeupSimulationImg,
    desc: t('features.makeup.desc'),
  },
  {
    name: t('features.wardrobe.name'),
    bgImage: wardrobeManagementImg,
    desc: t('features.wardrobe.desc'),
  },
  {
    name: t('features.confidence.name'),
    bgImage: colorConfidenceImg,
    desc: t('features.confidence.desc'),
  },
];

const getSteps = (t) => [
  {
    icon: <FaCamera />,
    title: t('home.uploadPhoto'),
    description: t('home.uploadPhotoDesc')
  },
  {
    icon: <FaPalette />,
    title: t('home.getAnalysis'),
    description: t('home.getAnalysisDesc')
  },
  {
    icon: <FaTshirt />,
    title: t('home.tryColors'),
    description: t('home.tryColorsDesc')
  },
  {
    icon: <FaCheck />,
    title: t('home.shopConfidence'),
    description: t('home.shopConfidenceDesc')
  }
];

const testimonials = [
  {
    text: "Fashion Palette completely transformed my wardrobe! I now understand which colors truly complement my features.",
    author: "Sarah T."
  },
  {
    text: "I've always struggled with choosing clothes that look good on me. This app made it so simple to find my perfect colors.",
    author: "Michael R."
  },
  {
    text: "The virtual try-on feature is amazing. I can see exactly how a color will look on me before buying anything.",
    author: "Jennifer L."
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState(null);
  const { t } = useTranslation();

  const seasons = getSeasons(t);
  const features = getFeatures(t);
  const steps = getSteps(t);

  const handleCardClick = (seasonName) => {
    setFlippedCard(flippedCard === seasonName ? null : seasonName);
  };

  return (
    <HomeContainer>
      <LanguageSwitcher />
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {t('home.title')}
      </Title>

      {/* Welcome Section */}
      <WelcomeSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <WelcomeText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('home.welcome')}
        </WelcomeText>
        <StyledButton
          onClick={() => navigate('/upload')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('home.getStarted')}
        </StyledButton>
      </WelcomeSection>

      {/* Main Seasons Section */}
      <Section>
        <SectionTitle>{t('home.exploreSeasons')}</SectionTitle>
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
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
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
        <StyledButton
          onClick={() => navigate('/upload')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('home.findColors')}
        </StyledButton>
      </Section>

      {/* How It Works Section */}
      <HowItWorksSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HowItWorksTitle>{t('home.howItWorks')}</HowItWorksTitle>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIcon>{step.icon}</StepIcon>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Step>
          ))}
        </StepsContainer>
      </HowItWorksSection>

      {/* Testimonials Section */}
      <TestimonialsSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <TestimonialsTitle>{t('home.testimonials')}</TestimonialsTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>— {testimonial.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* Features Section */}
      <Section>
        <SectionTitle>{t('home.features')}</SectionTitle>
        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.name}
              bgImage={feature.bgImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
            >
              <FeatureText>
                <h3>{feature.name}</h3>
                <p>{feature.desc}</p>
              </FeatureText>
              <PaywallOverlay>{t('home.comingSoon')}</PaywallOverlay>
            </FeatureCard>
          ))}
        </FeatureGrid>
      </Section>

      {/* Footer */}
      <Footer>
        <FooterText>{t('app.name')} - {t('app.tagline')}</FooterText>
        <FooterText>{t('home.copyright')}</FooterText>
        <FooterLinks>
          <FooterLink href="#">{t('home.about')}</FooterLink>
          <FooterLink href="#">{t('home.privacy')}</FooterLink>
          <FooterLink href="#">{t('home.terms')}</FooterLink>
          <FooterLink href="#">{t('home.contact')}</FooterLink>
        </FooterLinks>
      </Footer>
    </HomeContainer>
  );
};

export default Home;