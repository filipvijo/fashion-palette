import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzePhoto } from '../services/colorAnalysis';
import uploadBg from '../assets/upload-bg.jpg';

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
    background: linear-gradient(135deg,
      rgba(201, 168, 125, 0.2),
      rgba(28, 28, 28, 0.8));
    z-index: 0;
  }
`;

const UploadBox = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.98);
  padding: 40px;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.strong};
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  font-weight: 300;
`;

const UploadArea = styled(motion.div)`
  border: 2px dashed ${props => props.theme.colors.secondary};
  border-radius: 4px;
  padding: 40px 20px;
  margin: 20px 0;
  cursor: pointer;
  transition: ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.lightGold};

  &:hover {
    border-color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.cream};
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
  margin-top: 20px;
  transition: ${props => props.theme.transitions.default};
  position: relative;
  overflow: hidden;

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 20px 0;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadows.soft};
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.lightGold};
  border-top-color: ${props => props.theme.colors.secondary};
  border-radius: 50%;
  margin: 20px auto;
`;

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      const result = await analyzePhoto(selectedFile);
      navigate('/results', { state: { results: result, photo: selectedFile } });
    } catch (error) {
      console.error('Error analyzing photo:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadContainer>
      <UploadBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Discover Your Colors</Title>
        <Subtitle>Upload a well-lit photo of yourself to reveal your perfect color palette</Subtitle>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="file-input"
        />

        <label htmlFor="file-input">
          <UploadArea
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {preview ? (
              <PreviewImage src={preview} alt="Preview" />
            ) : (
              <p>Click or drag to upload your photo</p>
            )}
          </UploadArea>
        </label>

        <AnimatePresence>
          {loading && (
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        <Button
          disabled={!selectedFile || loading}
          onClick={handleUpload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Analyzing...' : 'Analyze My Colors'}
        </Button>
      </UploadBox>
    </UploadContainer>
  );
};

export default Upload;