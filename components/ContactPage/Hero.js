import styled from 'styled-components';
import React, { useState, useEffect, useRef } from "react";
const Hero = () => {



  return (
    <Section>
         
      <Container>
        <Header>Contact Us</Header>
        <HeaderBig>Get in touch with our team</HeaderBig>
      </Container>
        
        <ImageContainer>
        <Image src= "/images/globefinal.jpg"></Image>
        </ImageContainer>
        
        <InformationContainer> 
            <InformationContainerLayer>
                <InformationWordLayer> Chat To Support</InformationWordLayer>
                <InformationWordLayersub>Connect with a real person</InformationWordLayersub>
                <Contactfield>lol@psu.edu</Contactfield>
            </InformationContainerLayer>
        </InformationContainer>

      <FooterContainer> </FooterContainer>
    </Section>
  );
};



const Section = styled.section`
  width: 100%;
`;


const InformationContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    color: #cf89ff;
    font-family: sans-serif;
    width: 100%
`;
const InformationContainerLayer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    width: 25%;
    padding: 5px;
    border-radius: 10px;
    border-style: solid;
    border-color: #cf89ff;
`;

const InformationWordLayer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-family: sans-serif;
    background-color: black;
    width: 80%;
    font-size: 16px;
`;
const InformationWordLayersub = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-family: sans-serif;
    background-color: black;
    width: 80%;
    font-size: 10px;
    margin-bottom: 10px;
`;

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
  color: white;
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




const FooterContainer = styled.div`
  margin-top:250px;
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
`;

const Image = styled.img`
  margin-top: 10px;
  width: 30%; 
  height:100%;
  border-radius: 50px; 
  margin-bottom: 30px;
`;
const Contactfield = styled.div`
      background-color:white; 
      border: none;
      color:  #cf89ff;
      padding: 10px 15px;
      text-align: center;
      border-radius:12px;
      font-size: 16px;
      text-decoration:none;
      font-weight: 600;

       &:hover {
    background-color: #cf89ff; 
    color: black;

  }

`;


export default Hero;
