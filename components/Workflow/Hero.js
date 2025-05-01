import styled from 'styled-components';
import HomeButton from '../ButtonsInfo/HomeButton';
import SNavbar from "@/components/Navbarinfo/SNavbar";
import React, { useState, useEffect, useRef } from "react";
import { ethers } from 'ethers';
import { CONTRACT_ABI,CONTRACT_ADDRESS } from '@/blockchain/contract';
import Connected from "@/components/LandingPage/Connected";
import GroupForm from './CreateGroupForm';


const Hero = ({ scrollRef }) => {
  //functionallity to connect to metamask
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  const[isConnected, setIsConnected] = useState(false);
  const[groupSize,setGroupSize] = useState(null);
  const[stage,setStage] = useState("connect");
  const [groupId, setGroupId] = useState(null);
  const [winner,setWinner] = useState(null);
  
  // after you’ve connected and have `provider` and `account`…
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider.getSigner());
  const [requiredStakeString, setRequiredStakeString] = useState('');  // e.g. "0.1"
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  


  useEffect( ()=> {
    // getCurrentStatus()
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
        setStage("create");
      }catch(err){
        console.error(err);
      } 
    }
    else{
      console.error("Metamask is not detected in the browser");
    }
  }

  async function createGroupHandler({bill,members}){

    //do the conversion to wei
    const wei = ethers.utils.parseEther(bill);
    const tx  = await contract.createGroup(wei, members);
    const receipt = await tx.wait();
    const id = receipt.events.find(e => e.event === 'GroupCreated').args.id.toNumber();
    const groupIdNumber = await contract.groupCount()
    setStage('stake')
    setGroupId(groupIdNumber)

  }

  async function stakeHandler() {
    setError('');
    setLoading(true);
    try {
      // 1. kick off the transaction, sending exactly the required stake
      const wei = ethers.utils.parseEther(requiredStakeString);
      const tx  = await contract.individualStake(groupId);
      
      // 2. wait for it to mine
      const receipt = await tx.wait();
      
      // optional: pull info from the event
      const evt = receipt.events.find(e => e.event === 'MemberHasStaked');
      console.log(`Member ${evt.args.payer} staked in group ${evt.args.id}`);
      
      // 3. fetch the updated group info
      // correct destructure
      const [
        owner, billAmount, requiredStake,
        staking_start, staking_deadline,
        state, stakesAmount, totalStaked,
        members
      ] = await contract.getGroupInfo(groupId);
      if (stakesAmount.toNumber() === members.length) {
        setStage('vote');
      }

      // 4. if everyone has now staked, move on
      if (stakesAmount.toNumber() === members.length) {
        setStage('vote');
      }
    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function votingHandler({member}){
    setError('');
    setLoading(true);
    try {
      // 1. kick off the transaction, sending exactly the required stake
      const tx  = await contract.voting(groupId,member);
      
      // 2. wait for it to mine
      const receipt = await tx.wait();
      
      // 3. fetch the updated group info
      const [
        owner,            
        billAmount,              
        requiredStake,              
        staking_start,
        staking_deadline,              
        totalStaked,        
        state,
        stakesAmount,             
        members,        
      ] = await contract.getGroupInfo(groupId);
      
    

    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function presentWinner(){
    const tx = await contract.electDelegate(groupId);
    await tx.wait();
    const winner = await contract.currentVoteLeader(groupId);
    setWinner(winner);
  }


  return (
    <Section>
         
      <Container>
        <Header>Stage 1 "Under Construction until Soldity contracts are written" </Header>
        <HeaderBig>Form Your Group</HeaderBig>
      </Container>
      <ButtonContainer>
      {stage === 'connect' && (
        <ButtonContainer>
          <HomeButton connectWallet={connectToMetamask}>
            Connect Wallet
          </HomeButton>
        </ButtonContainer>
      )}

      {stage === 'create' && (
        <GroupForm onSubmit={createGroupHandler} />
      )}
      </ButtonContainer>
      <FooterContainer> </FooterContainer>

      {stage === 'stake'} &&{
        <Header>On to this stage</Header>
      }
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
