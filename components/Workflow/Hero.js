import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { FaConnectdevelop } from "react-icons/fa";
import HomeButton from '../ButtonsInfo/HomeButton';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/blockchain/contract';
import GroupForm from './CreateGroupForm';
import StakeComponent from './StakeComponent';
import VoteComponent from './VoteComponent';
import ResultsComponent from './Results';
import Group from '../LandingPage/Group';
import { GrStakeholder } from "react-icons/gr";
import Vote from '../LandingPage/Vote';
import { GrAtm } from "react-icons/gr";

export default function Hero() {
  const [provider, setProvider]       = useState(null);
  const [contract, setContract]       = useState(null);
  const [account, setAccount]         = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [stage, setStage]         = useState("connect");
  const [groupId, setGroupId]     = useState(null);
  const [members, setMembers]     = useState([]);
  const [requiredStake, setRequiredStake] = useState("");  
  const [stakeStatuses, setStakeStatuses] = useState([]);  
  const [voteStatuses, setVoteStatuses]   = useState([]); 
  const [winner, setWinner]               = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // — on provider set, wire up your contract
  useEffect(() => {
    if (!provider) return;
    const signer = provider.getSigner();
    setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
  }, [provider]);

  // — watch for account changes
  useEffect(() => {
    if (!window.ethereum) return;
    const handler = (accounts) => {
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        // user locked / disconnected
        setAccount("");
        setIsConnected(false);
        setStage("connect");
      }
    };
    window.ethereum.on("accountsChanged", handler);
    return () => window.ethereum.removeListener("accountsChanged", handler);
  }, []);

  // — auto-advance when EVERY stakeStatuses entry flips true
  useEffect(() => {
    if (stage === "stake" && stakeStatuses.length === members.length) {
      if (stakeStatuses.every(Boolean)) {
        console.log("everyone has stake");
        setStage("vote");
      }
    }
  }, [stakeStatuses, stage, members.length]);

  useEffect(() => {
    if (stage === "vote" &&
        voteStatuses.length === members.length &&
        voteStatuses.every(Boolean)
    ) {
      console.log("all voted, triggering payout");
      presentWinner();
    }
  }, [voteStatuses, stage, members.length]);


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

  async function createGroupHandler({ bill, members: initialMembers }) {
    setError(""); setLoading(true);
    try {
      const wei = ethers.utils.parseEther(bill);
      const tx  = await contract.createGroup(wei, initialMembers);
      const receipt = await tx.wait();

      const newId = receipt.events
        .find(e => e.event === "GroupCreated")
        .args.id.toNumber();
      setGroupId(newId);

      // seed UI with on-chain info
      const info = await contract.getGroupInfo(newId);
      setMembers(info.members);
      setRequiredStake(ethers.utils.formatEther(info.requiredStake));

      // initial stakeStatuses
      const stArr = await Promise.all(
        info.members.map(addr => contract.hasStakedInGroup(newId, addr))
      );
      setStakeStatuses(stArr);

      setStage("stake");
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function stakeHandler() {
    setError(""); setLoading(true);
    try {
      const wei = ethers.utils.parseEther(requiredStake);
      const tx  = await contract.individualStake(groupId, { value: wei });
      await tx.wait();

      const info = await contract.getGroupInfo(groupId);

   
      console.log(
        `stakesAmount = ${info.stakesAmount.toNumber()} / ${info.members.length}`
      );

      setMembers(info.members);
      const stArr = await Promise.all(
        info.members.map(addr => contract.hasStakedInGroup(groupId, addr))
      );
      setStakeStatuses(stArr);

      if (info.stakesAmount.toNumber() === info.members.length) {
        console.log("all have staked");
        setStage("vote");
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
      // 1) send the vote tx
      const tx = await contract.voting(groupId, member);
      await tx.wait();
  
      // 2) pull down the fresh member list + who has voted
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);
      const arr = await Promise.all(
        info.members.map(addr => contract.hasVotedInGroup(groupId, addr))
      );
      setVoteStatuses(arr);
  
    } catch (err) {
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function presentWinner() {
    setError(""); setLoading(true);
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
          <HeaderBig>Connect your wallet</HeaderBig>
          <Biglogo>
            <FaConnectdevelop/>
          </Biglogo>
          <ButtonContainer>
            <HomeButton connectWallet={connectToMetamask}>
              Connect Wallet
            </HomeButton>
          </ButtonContainer>
        </>
      )}

      {stage === "create" && (
        <>
        <HeaderBig>Set Bill And Members of Your Group</HeaderBig>
        <Group></Group>
        <GroupForm
          onSubmit={createGroupHandler}
          loading={loading}
          error={error}
        />
        </>
      )}

      {stage === "stake" && (
        <>
        <HeaderBig>Pay your piece</HeaderBig>
    
        <StakeComponent
          members={members}
          stakeStatuses={stakeStatuses}
          account={account}
          requiredStake={requiredStake}
          onStake={stakeHandler}
          loading={loading}
          error={error}
        />
        </>
      )}

      {stage === "vote" && (
        <>
        <Vote></Vote>
        <VoteComponent
          members={members}
          account={account}
          hasVoted={ voteStatuses[members.findIndex(a => a.toLowerCase() === account.toLowerCase())] }
          onVote={votingHandler}
          loading={loading}
          error={error}
        />
        </>
      )}

      {stage === "completed" && (
        <>
        
          
          <ResultsComponent winner={winner} />
          <Biggishlogo><GrAtm></GrAtm></Biggishlogo>
        </>
        
      )}
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  text-align: center;
  margin-top: 5%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
`;

const HeaderBig = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Biglogo = styled.div`
background-color: black;
border-radius: 4px;
text-decoration: none;
color:  #cf89ff ;
svg {
  width: 300px;
  height: 300px;
  transition: color 0.3s ease, filter 0.3s ease;
}

&:hover {
  color: white;
}
`;

const Biggishlogo = styled.div`
background-color: black;
border-radius: 4px;
text-decoration: none;
color:  #cf89ff ;
svg {
  width: 100px;
  height: 100px;
  transition: color 0.3s ease, filter 0.3s ease;
}

&:hover {
  color: white;
}
`;
