import React from 'react';
import styled from 'styled-components';

export default function ResultsComponent({ winner }) {
  if (!winner) return null;

  return (
    <Container>
      <Heading>Payout Complete!</Heading>
      <Label>Funds have been sent to:</Label>
      <Winner>{winner}</Winner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Heading = styled.h2`
  color: #cf89ff;
`;

const Label = styled.p`
  color: #fff;
`;

const Winner = styled.code`
  background: #222;
  color: #0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: monospace;
`;