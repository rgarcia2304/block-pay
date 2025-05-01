// components/VoteComponent.jsx
import React from 'react';
import styled from 'styled-components';

export default function VoteComponent({
  members = [],
  account,
  onVote,
  loading = false,
  error = '',
}) {
  // normalize for comparison
  const lowerMe = account?.toLowerCase();

  // filter out self
  const choices = members.filter(
    addr => addr.toLowerCase() !== lowerMe
  );

  return (
    <Container>
      <Title>Who should pay?</Title>
      {error && <Error>{error}</Error>}

      <List>
        {choices.map(addr => (
          <Item key={addr}>
            <Button
              onClick={() => onVote(addr)}
              disabled={loading}
            >
              {addr}
            </Button>
          </Item>
        ))}
      </List>

      {loading && <Status>Submitting your vote</Status>}
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
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #cf89ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: monospace;
  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: #ff6b6b;
`;

const Status = styled.div`
  color: #999;
`;
