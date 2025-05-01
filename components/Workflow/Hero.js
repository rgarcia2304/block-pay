import styled from 'styled-components';
import HomeButton from '../ButtonsInfo/HomeButton';
import SNavbar from "@/components/Navbarinfo/SNavbar";
import React, { useState, useEffect, useRef } from "react";
import { ethers } from 'ethers';
import { CONTRACT_ABI,CONTRACT_ADDRESS } from '@/blockchain/contract';
import Connected from "@/components/LandingPage/Connected";



const Hero = ({ scrollRef }) => {
  //functionallity to connect to metamask
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  const[isConnected, setIsConnected] = useState(false);
  const[groupSize,setGroupSize] = useState(null);

  useEffect( ()=> {
    getCurrentStatus()
    if(window.ethereum){
      window.ethereum.on("accountsChanged",handleAccountsChanged);
    }
    return() =>{
      if(window.ethereum){
        window.ethereum.removeListener("accountsChanged",handleAccountsChanged);
      }
    }
  })

  async function getCurrentStatus(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts",[]);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      CONTRACT_ADDRESS,CONTRACT_ABI,signer
    );
    const status = await contractInstance.getGroupSize(1);
    setGroupSize(status);
    console.log(groupSize);
  }
  function handleAccountsChanged(accounts){
    if(accounts.length > 0 && account != accounts[0]){
      setAccount(accounts[0]);
    }
    else{
      setIsConnected(false);
      setAccount(null);
    }
  }
  async function connectToMetamask(){
    if(window.ethereum){
      try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner(); //whos connected to current account
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected: ", address);
        setIsConnected(true);
      }catch(err){
        console.error(err);
      } 
    }
    else{
      console.error("Metamask is not detected in the browser");
    }
  }


  return (
    <Section>
         
      <Container>
        <Header>Stage 1 "Under Construction until Soldity contracts are written" </Header>
        <HeaderBig>Form Your Group</HeaderBig>
      </Container>
      <ButtonContainer>{isConnected ? (<Connected account = {account} />) : (<HomeButton connectWallet = {connectToMetamask}></HomeButton>)} </ButtonContainer>
      <FooterContainer> </FooterContainer>
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
