import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { FaConnectdevelop } from 'react-icons/fa';
import { GrStakeholder, GrAtm } from 'react-icons/gr';
import HomeButton from '../ButtonsInfo/HomeButton';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/blockchain/contract';
import Group from '../LandingPage/Group';
import Vote from '../LandingPage/Vote';
import GroupForm from './CreateGroupForm';
import StakeComponent from './StakeComponent';
import VoteComponent from './VoteComponent';
import ResultsComponent from './Results';

export default function Hero() {
  const [provider, setProvider]             = useState(null);
  const [contract, setContract]             = useState(null);
  const [account, setAccount]               = useState('');
  const [isConnected, setIsConnected]       = useState(false);

  const [stage, setStage]                   = useState('connect');
  const [groupId, setGroupId]               = useState(null);
  const [members, setMembers]               = useState([]);
  const [requiredStake, setRequiredStake]   = useState('');  
  const [stakeStatuses, setStakeStatuses]   = useState([]);  
  const [voteStatuses, setVoteStatuses]     = useState([]); 
  const [winner, setWinner]                 = useState('');

  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');

  //
  // 1) Whenever provider *and* account change, rebuild the contract
  //
  useEffect(() => {
    if (!provider || !account) return;
    const signer = provider.getSigner();
    setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
  }, [provider, account]);


  useEffect(() => {
    if (!window.ethereum) return;

    // fetch currently unlocked accounts
    window.ethereum.request({ method: 'eth_accounts' })
      .then(accts => {
        if (accts.length) {
          setAccount(accts[0]);
          setIsConnected(true);
        }
      })
      .catch(console.error);

    // listen for subsequent changes
    const handler = accts => {
      if (accts.length) {
        setAccount(accts[0]);
        setIsConnected(true);
      } else {
        setAccount('');
        setIsConnected(false);
        setStage('connect');
      }
    };
    window.ethereum.on('accountsChanged', handler);
    return () => window.ethereum.removeListener('accountsChanged', handler);
  }, []);


  useEffect(() => {
    if (stage !== 'stake' || !contract || !groupId) return;
    (async () => {
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);
      const arr = await Promise.all(
        info.members.map(addr => contract.hasStakedInGroup(groupId, addr))
      );
      setStakeStatuses(arr);
    })();
  }, [stage, contract, groupId, account]);


  useEffect(() => {
    if (stage !== 'vote' || !contract || !groupId) return;
    (async () => {
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);
      const arr = await Promise.all(
        info.members.map(addr => contract.hasVotedInGroup(groupId, addr))
      );
      setVoteStatuses(arr);
    })();
  }, [stage, contract, groupId, account]);

  useEffect(() => {
    if (
      stage === 'stake' &&
      stakeStatuses.length === members.length &&
      stakeStatuses.every(Boolean)
    ) {
      setStage('vote');
    }
  }, [stakeStatuses, stage, members.length]);


  useEffect(() => {
    if (
      stage === 'vote' &&
      voteStatuses.length === members.length &&
      voteStatuses.every(Boolean)
    ) {
      presentWinner();
    }
  }, [voteStatuses, stage, members.length]);

  async function connectToMetamask() {
    if (!window.ethereum) {
      console.error('MetaMask not found');
      return;
    }
    try {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      await prov.send('eth_requestAccounts', []);
      const signer = prov.getSigner();
      const addr   = await signer.getAddress();
      setProvider(prov);
      setAccount(addr);
      setIsConnected(true);
      setStage('create');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function createGroupHandler({ bill, members: initialMembers }) {
    setError(''); setLoading(true);
    try {
      const wei = ethers.utils.parseEther(bill);
      const tx  = await contract.createGroup(wei, initialMembers);
      const receipt = await tx.wait();

      const newId = receipt.events
        .find(e => e.event === 'GroupCreated')
        .args.id.toNumber();
      setGroupId(newId);

      const info = await contract.getGroupInfo(newId);
      setMembers(info.members);
      setRequiredStake(ethers.utils.formatEther(info.requiredStake));

      setStage('stake');
    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function stakeHandler() {
    setError(''); setLoading(true);
    try {
      const wei = ethers.utils.parseEther(requiredStake);
      const tx  = await contract.individualStake(groupId, { value: wei });
      await tx.wait();

      // refresh just‐in‐case
      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);
      const arr = await Promise.all(
        info.members.map(addr => contract.hasStakedInGroup(groupId, addr))
      );
      setStakeStatuses(arr);
    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function votingHandler(member) {
    setError(''); setLoading(true);
    try {
      const tx = await contract.voting(groupId, member);
      await tx.wait();

      const info = await contract.getGroupInfo(groupId);
      setMembers(info.members);
      const arr = await Promise.all(
        info.members.map(addr => contract.hasVotedInGroup(groupId, addr))
      );
      setVoteStatuses(arr);
    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function presentWinner() {
    setError(''); setLoading(true);
    try {
      await contract.electDelegate(groupId);
      const w = await contract.currentVoteLeader(groupId);
      setWinner(w);
      setStage('completed');
    } catch (err) {
      console.error(err);
      setError(err.errorArgs?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  // — the JSX: preserve your icons & styling exactly —
  return (
    <Section>
      {stage === 'connect' && (
        <>
          <HeaderBig>Connect your wallet</HeaderBig>
          <Biglogo><FaConnectdevelop/></Biglogo>
          <ButtonContainer>
            <HomeButton connectWallet={connectToMetamask}>
              Connect Wallet
            </HomeButton>
          </ButtonContainer>
        </>
      )}

      {stage === 'create' && (
        <>
          <HeaderBig>Set Bill & Members</HeaderBig>
          <Group/>
          <GroupForm
            onSubmit={createGroupHandler}
            loading={loading}
            error={error}
          />
        </>
      )}

      {stage === 'stake' && (
        <>
          <HeaderBig>Pay your piece</HeaderBig>
          <Biglogo><GrStakeholder/></Biglogo>
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

      {stage === 'vote' && (
        <>
          <HeaderBig>Vote for who pays</HeaderBig>
          <Vote/>
          <VoteComponent
            members={members}
            voteStatuses={voteStatuses}
            account={account}
            onVote={votingHandler}
            loading={loading}
            error={error}
          />
        </>
      )}

      {stage === 'completed' && (
        <>
          <ResultsComponent winner={winner}/>
          <Biggishlogo><GrAtm/></Biggishlogo>
        </>
      )}
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  text-align: center;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #cf89ff;
  padding: 1rem;
  svg {
    width: 200px;
    height: 200px;
  }
  
  &hover{
  color:white;
  }
`;

const Biggishlogo = styled(Biglogo)`
  svg {
    width: 200px;
    height: 200px;
  }
`;

