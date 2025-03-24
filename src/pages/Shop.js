import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import shopBg from '../assets/shop-bg.jpg'; // Add a background image if you have one

const ShopContainer = styled.div`
  min-height: 100vh;
  background-image: url(${shopBg});
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

const ShopBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
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
  border: 3px solid ${(props) => props.borderColor || '#FFD700'};
`;

const UserPhoto = styled.img`
  width: 100%;
  border-radius: 20px;
`;

const ShoppingSection = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const ShoppingCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ShoppingCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  background: linear-gradient(135deg, #fff, #f5f5f5);
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: #1A3C34;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  border: 2px solid #FFD700;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const StoreName = styled.span`
  font-weight: 600;
`;

const ItemName = styled.span`
  font-size: 0.9rem;
  color: #FF6F61;
  margin-top: 5px;
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

const ColorReference = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const ColorBar = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.color};
  border: 2px solid #FFD700;
  border-radius: 8px;
  margin-right: 10px;
`;

const ColorLabel = styled.span`
  color: #1A3C34;
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedColor, photo } = location.state || {};

  if (!selectedColor) {
    return <ShopContainer><Title>No color selected.</Title></ShopContainer>;
  }

  // Placeholder for gender - replace with actual user data later
  const gender = 'female'; // You can change this to 'male' for testing, or get it from user input

  // Define shopping links based on gender
  const shoppingLinks = gender === 'male' ? [
    {
      store: 'Amazon',
      item: 'Shirt',
      url: `https://www.amazon.com/s?k=men+shirt+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Zara',
      item: 'Pants',
      url: `https://www.zara.com/us/en/search?searchTerm=men+pants+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'ASOS',
      item: 'Shoes',
      url: `https://www.asos.com/us/search/?q=men+shoes+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Nordstrom',
      item: 'Jacket',
      url: `https://www.nordstrom.com/sr?origin=keywordsearch&keyword=men+jacket+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'H&M',
      item: 'Sweater',
      url: `https://www2.hm.com/en_us/search-results.html?q=men+sweater+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Shein',
      item: 'Accessories',
      url: `https://us.shein.com/recommend/Men-Accessories-${selectedColor.replace('#', '')}-d?ici=men_accessories`,
    },
  ] : [
    {
      store: 'Amazon',
      item: 'Dress',
      url: `https://www.amazon.com/s?k=women+dress+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Zara',
      item: 'Skirt',
      url: `https://www.zara.com/us/en/search?searchTerm=women+skirt+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'ASOS',
      item: 'Shoes',
      url: `https://www.asos.com/us/search/?q=women+shoes+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Nordstrom',
      item: 'Handbag',
      url: `https://www.nordstrom.com/sr?origin=keywordsearch&keyword=women+handbag+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'H&M',
      item: 'Blouse',
      url: `https://www2.hm.com/en_us/search-results.html?q=women+blouse+${selectedColor.replace('#', '')}`,
    },
    {
      store: 'Shein',
      item: 'Jewelry',
      url: `https://us.shein.com/recommend/Women-Jewelry-${selectedColor.replace('#', '')}-d?ici=women_jewelry`,
    },
  ];

  return (
    <ShopContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Shop Your Color
      </Title>
      <ShopBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {photo && (
          <PhotoContainer
            borderColor={selectedColor}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <UserPhoto src={URL.createObjectURL(photo)} alt="User" />
          </PhotoContainer>
        )}
        <ColorReference>
          <ColorBar color={selectedColor} />
          <ColorLabel>Your Color: {selectedColor}</ColorLabel>
        </ColorReference>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Explore clothing options in your selected color!
        </Subtitle>
        <ShoppingSection>
          <h3 style={{ color: '#1A3C34', fontFamily: 'Playfair Display', fontSize: '1.8rem' }}>
            Shop Now
          </h3>
          <ShoppingCards>
            {shoppingLinks.map((link, index) => (
              <ShoppingCard
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2, ease: 'easeOut' }}
              >
                <StoreName>{link.store}</StoreName>
                <ItemName>{link.item}</ItemName>
              </ShoppingCard>
            ))}
          </ShoppingCards>
        </ShoppingSection>
        <StyledButton
          onClick={() => navigate('/results', { state: { analysisResult: location.state?.analysisResult, photo } })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Results
        </StyledButton>
      </ShopBox>
    </ShopContainer>
  );
};

export default Shop;