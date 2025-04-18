import styled from 'styled-components';
import HomeButton from '../ButtonsInfo/HomeButton';
import React, { useState, useEffect, useRef } from "react";



const Hero = ({ scrollRef }) => {



  return (
    <Section>
      <Container>
        <Header>Contact Us</Header>
        <HeaderBig>Get in touch with our team</HeaderBig>
      </Container>
        
        <ImageContainer>
        <Image src= "/images/phone.jpg"></Image>
        </ImageContainer>
        
      <ButtonContainer>

      <HomeButton></HomeButton>
      </ButtonContainer>
       


      <FooterContainer></FooterContainer>
    </Section>
  );
};



const Section = styled.section`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: #cf89ff;

`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: #cf89ff;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: sans-serif;
  justify-content: center;
  align-items: center;
  color: #cf89ff;
`;

const Header = styled.div`
  font-family: sans-serif;
  font-size: 15px;
  text-align: center;
  width: 55%;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;
const HeaderBig = styled.div`
  font-family: sans-serif;
  font-size: 45px;
  text-align: center;
  width: 55%;
  font-weight: 600;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;
const Summary = styled.div`
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  width: 35%;
  color: #cf89ff;
`;

const IconsContainer = styled.div`
  width: 100%;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #cf89ff;
`;

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
`;

const AnimatedContainer = styled(Container2)`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? "translateY(0)" : "translateY(40px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin-bottom: 50px;
`;

const FooterContainer = styled.div`
  margin-top:250px;
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
`;

const Headerabout = styled.h1`
  font-family: sans-serif;
  display: flex;
  font-size: 50px;
  text-align: center;
  margin-top: 150px;
  flex-direction: row;
  color: white;
`;

const Right_side_div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
  font-family: sans-serif;
`;

const Headersmall = styled.p`
  font-size: 20px;
  color: white;
`;

const Headeraboutcont = styled.div`
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  font-size: 30px;
  margin-top: 150px;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-right: 20%;
  font-weight: 600;
  color: #cf89ff;
`;

const HighlightableIcon = styled.div`
  filter: ${({ active }) => (active ? "brightness(200%)" : "brightness(100%)")};
  transition: filter 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  margin-top: 10px;
  width: 20%; 
  height:30%;
  border-radius: 10px; /* Optional for styling */
  margin-bottom: 30px;
`;


export default Hero;
