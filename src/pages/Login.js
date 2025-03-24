import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import loginBg from '../assets/login-bg.jpg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${loginBg});
  background-size: cover;
  background-position: center;
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

const AppTitle = styled(motion.h1)`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  font-family: 'Playfair Display', serif;
  text-align: center;
`;

const LoginForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  border: 2px solid transparent;
  border-image: linear-gradient(135deg, #FFD700, #FF6F61) 1;
`;

const StyledSelect = styled.select`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #FFD700;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: #1A3C34;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #FF6F61;
    box-shadow: 0 0 5px rgba(255, 111, 97, 0.5);
  }
`;

const StyledInput = styled.input`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #FFD700;
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: #1A3C34;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #FF6F61;
    box-shadow: 0 0 5px rgba(255, 111, 97, 0.5);
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
`;

const Login = () => {
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <LoginContainer>
      <AppTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Fashion Palette
      </AppTitle>
      <LoginForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <StyledSelect value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
          <option value="neutral">Neutral</option>
        </StyledSelect>
        <StyledInput type="email" placeholder="Email" />
        <StyledInput type="password" placeholder="Password" />
        <StyledButton
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </StyledButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;