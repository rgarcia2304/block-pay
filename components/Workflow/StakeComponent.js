import React from 'react';
import styled from 'styled-components';

export default function StakeComponent({
  members = [],
  account = '',
  requiredStake = '0.0',
  onStake,
  loading = false,
  error = '',
}) {
  const lowerMe = account.toLowerCase();

  return (
    <Container>
      <Title>Stake your share ({requiredStake} AVAX)</Title>
      {error && <Error>{error}</Error>}

      <List>
        {members.map(addr => {
          const isMe = addr.toLowerCase() === lowerMe;
          return (
            <Item key={addr}>
              <Address>{addr}</Address>
              {isMe ? (
                <Button onClick={onStake} disabled={loading}>
                  {loading ? 'Staking…' : 'Stake'}
                </Button>
              ) : (
                <Placeholder>—</Placeholder>
              )}
            </Item>
          );
        })}
      </List>

      {loading && <Status>Waiting for transaction…</Status>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  color: #cf89ff;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Address = styled.span`
  font-family: monospace;
`;

const Button = styled.button`
  padding: 0.4rem 0.8rem;
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

const Error = styled.div`
  color: #ff6b6b;
`;

const Status = styled.div`
  color: #999;
`;