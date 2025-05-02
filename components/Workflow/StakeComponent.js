import React from 'react';
import styled from 'styled-components';

export default function StakeComponent({
  members = [],               
  stakeStatuses = [],        
  account = '',            
  requiredStake = '0.0',      
  onStake,                    
  loading = false,            
  error = '',                
}) {
  const lowerMe = account.toLowerCase();

  return (
   
    <Container>
      <Title>Stake your share ({requiredStake})</Title>
      {error && <Error>{error}</Error>}

      <List>
        {members.map((addr, idx) => {
          const lower = addr.toLowerCase();
          const hasStaked = stakeStatuses[idx];

          // 1) Already staked → waiting message
          if (hasStaked) {
            return (
              <Item key={addr}>
                <Address>{addr}</Address>
                <Status>Waiting for others to stake…</Status>
              </Item>
            );
          }

          // 2) Connected user (and not yet staked) → show button
          if (lower === lowerMe) {
            return (
              <Item key={addr}>
                <Address>{addr}</Address>
                <Button onClick={onStake} disabled={loading}>
                  {loading ? 'Staking…' : 'Stake'}
                </Button>
              </Item>
            );
          }

          // 3) Other members who haven’t staked yet → placeholder
          return (
            <Item key={addr}>
              <Address>{addr}</Address>
              <Placeholder>—</Placeholder>
            </Item>
          );
        })}
      </List>
    </Container>
    
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;

`;

const Title = styled.h2`
  color: #cf89ff;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  color: white;
`;

const Address = styled.span`
  font-family: monospace;
`;

const Button = styled.button`
  padding: 0.4rem 0.8rem;
  margin: 10px;
  background: #cf89ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

const Placeholder = styled.span`
  color: #555;
`;

const Status = styled.span`
  color: #999;
  font-style: italic;
`;

const Error = styled.div`
  color: #ff6b6b;
  text-align: center;
`;
