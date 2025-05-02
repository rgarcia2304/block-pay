import styled from 'styled-components';
import HomeButton from '../ButtonsInfo/HomeButton';
import React, { useState, useEffect, useRef } from "react";
import { ethers } from 'ethers';
import { CONTRACT_ABI,CONTRACT_ADDRESS } from '@/blockchain/contract';
import GroupForm from './CreateGroupForm';
import StakeComponent from './StakeComponent';
import VoteComponent from './VoteComponent';
import ResultsComponent from './Results';

const Hero = () => {
 
  const [provider,         setProvider]         = useState(null);
  const [contract,         setContract]         = useState(null);
  const [account,          setAccount]          = useState("");
  const [isConnected,      setIsConnected]      = useState(false);

 
  const [stage,            setStage]            = useState("connect");
  const [groupId,          setGroupId]          = useState(null);
  const [members,          setMembers]          = useState([]);
  const [requiredStake,    setRequiredStake]    = useState("");   // string in AVAX
  const [stakeStatuses,    setStakeStatuses]    = useState([]);   // [bool,bool,…]
  const [voteStatuses,     setVoteStatuses]     = useState([]);   // [bool,bool,…]
  const [winner,           setWinner]           = useState("");

  const [loading,          setLoading]          = useState(false);
  const [error,            setError]            = useState("");

 
  useEffect(() => {
    if (!provider) return;
    const signer = provider.getSigner();
    const ctr    = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setContract(ctr);
  }, [provider]);


  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        // user disconnected
        setAccount("");
        setIsConnected(false);
        setStage("connect");
      }
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);


  useEffect(() => {
    if (stage !== "stake" || !contract || !groupId) return;

    async function reloadStakeStatuses() {
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);

      
      const arr = await Promise.all(
        info.members.map((addr) =>
          contract.hasStakedInGroup(groupId, addr)
        )
      );
      setStakeStatuses(arr);
    }

    reloadStakeStatuses();
  }, [stage, contract, groupId, account]);


  
  useEffect(() => {
    if (stage !== "vote" || !contract || !groupId) return;

    async function reloadVoteStatuses() {
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);

      const arr = await Promise.all(
        info.members.map((addr) =>
          contract.hasVotedInGroup(groupId, addr)
        )
      );
      setVoteStatuses(arr);
    }

    reloadVoteStatuses();
  }, [stage, contract, groupId, account]);

 
  async function connectToMetamask() {
    if (!window.ethereum) {
      console.error("MetaMask not found");
      return;
    }
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    await prov.send("eth_requestAccounts", []);
    const signer  = prov.getSigner();
    const address = await signer.getAddress();

    setProvider(prov);
    setAccount(address);
    setIsConnected(true);
    setStage("create");
  }

 
  async function createGroupHandler({ bill, members }) {
    setError("");
    setLoading(true);
    try {
      const wei = ethers.utils.parseEther(bill);
      const tx  = await contract.createGroup(wei, members);
      const { events } = await tx.wait();

      const newId = events
        .find((e) => e.event === "GroupCreated")
        .args.id.toNumber();
      setGroupId(newId);

  
      const info = await contract.getGroupInfo(newId);
      setMembers(info.members);
      setRequiredStake(ethers.utils.formatEther(info.requiredStake));

      setStage("stake");
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  
  async function stakeHandler() {
    setError("");
    setLoading(true);
    try {
      const wei = ethers.utils.parseEther(requiredStake);
      const tx  = await contract.individualStake(groupId, { value: wei });
      await tx.wait();

      // re-fetch to see if we move to voting
      const info = await contract.getGroupInfo(groupId);
      if (info.stakesAmount.toNumber() === info.members.length) {
        setStage("vote");
      } else {
        // reloadIndividual statuses so button disappears
        const arr = await Promise.all(
          info.members.map((addr) =>
            contract.hasStakedInGroup(groupId, addr)
          )
        );
        setStakeStatuses(arr);
      }
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

 
  async function votingHandler(member) {
    setError("");
    setLoading(true);
    try {
      const tx = await contract.voting(groupId, member);
      await tx.wait();

      const stageOnChain = await contract.getStage(groupId);
      const n = stageOnChain._isBigNumber
        ? stageOnChain.toNumber()
        : Number(stageOnChain);

      if (n === 3) {
        await presentWinner();
      } else {
        
        const arr = await Promise.all(
          members.map((addr) =>
            contract.hasVotedInGroup(groupId, addr)
          )
        );
        setVoteStatuses(arr);
      }
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }


  async function presentWinner() {
    setError("");
    setLoading(true);
    try {
      await contract.electDelegate(groupId);
      const w = await contract.currentVoteLeader(groupId);
      setWinner(w);
      setStage("completed");
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <Section>
      {stage === "connect" && (
        <>
        <HeaderBig> Create Your Group</HeaderBig>
        <ButtonContainer>
          <HomeButton connectWallet={connectToMetamask}>
            Connect Wallet
          </HomeButton>
        </ButtonContainer>
        </>
      )}

      {stage === "create" && (
        <GroupForm
          onSubmit={createGroupHandler}
          loading={loading}
          error={error}
        />
      )}

      {stage === "stake" && (
        <StakeComponent
          members={members}
          stakeStatuses={stakeStatuses}
          account={account}
          requiredStake={requiredStake}
          onStake={stakeHandler}
          loading={loading}
          error={error}
        />
      )}

      {stage === "vote" && (
        <VoteComponent
          members={members}
          voteStatuses={voteStatuses}
          account={account}
          onVote={votingHandler}
          loading={loading}
          error={error}
        />
      )}

      {stage === "completed" && (
        <ResultsComponent winner={winner} />
      )}
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  text-align: center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-top: 10%;
`;
const ButtonContainer = styled.div`
  margin-top: 2rem;
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
  align-items:center;
  color:white;
`;



export default Hero;