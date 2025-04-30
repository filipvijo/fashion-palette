import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const LanguageLabel = styled.p`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

const LanguageSelect = styled(motion.select)`
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid rgba(255, 215, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
  backdrop-filter: blur(5px);
  
  option {
    background-color: #1A3C34;
    color: white;
  }
  
  &:hover {
    border-color: #FFD700;
  }
`;

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };
  
  return (
    <LanguageContainer>
      <LanguageLabel>{t('login.language')}:</LanguageLabel>
      <LanguageSelect 
        value={i18n.language} 
        onChange={changeLanguage}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <option value="en">English</option>
        <option value="sr">Српски</option>
        <option value="fr">Français</option>
      </LanguageSelect>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;
