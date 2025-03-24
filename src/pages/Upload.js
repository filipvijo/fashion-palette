import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { analyzePhoto } from '../services/colorAnalysis';
import uploadBg from '../assets/upload-bg.jpg'; // Make sure this matches your background image path

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url(${uploadBg});
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

const UploadBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, #FFD700, #FF6F61) 1;
  max-width: 400px;
  width: 100%;
  transform: translateX(-10%);
  overflow: hidden;
`;

const StyledInput = styled(motion.input)`
  margin: 20px 0;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #FFD700;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: #1A3C34;
  outline: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 245, 240, 0.9));
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  &:focus {
    border-color: #FF6F61;
    box-shadow: 0 0 5px rgba(255, 111, 97, 0.5);
    transform: scale(1.02);
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
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
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Title = styled(motion.h2)`
  color: white; /* Now white as requested! */
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
`;

const Subtitle = styled(motion.p)`
  color: #1A3C34;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 20px;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.5);
`;

const PhotoPreview = styled(motion.img)`
  max-width: 200px;
  margin: 20px 0;
  border-radius: 10px;
  border: 2px solid #FFD700;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Upload = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!photo) {
      alert('Please select a photo to upload.');
      return;
    }

    setLoading(true);
    try {
      const result = await analyzePhoto(photo);
      navigate('/results', { state: { analysisResult: result, photo } });
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Upload Your Photo
      </Title>
      <UploadBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Please upload a front-facing photo with no makeup.
        </Subtitle>
        <StyledInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        {photo && (
          <PhotoPreview
            src={URL.createObjectURL(photo)}
            alt="Preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          />
        )}
        <StyledButton
          onClick={handleUpload}
          disabled={loading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          {loading ? 'Analyzing...' : 'Analyze Photo'}
        </StyledButton>
      </UploadBox>
    </UploadContainer>
  );
};

export default Upload;