import React from 'react';
import styled from 'styled-components';

export default function ResultsComponent({ winner }) {
  if (!winner) return null;

  return (
    <Container>
      <Heading>Payout Complete!</Heading>
      <Label>Funds have been sent to:</Label>
      <Winner>{winner}</Winner>
      <ByeMessage>THANK YOU FOR CHOOSING BLOCK-PAY</ByeMessage>
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
  width:30%
`;

const Winner = styled.code`
  background: #222;
  color: #cf89ff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: sans-serif;
  width:400px;
`;

const ByeMessage = styled.code`
  color: #cf89ff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: sans-serif;
  font-weight: 600;
  width:400px;
  font-size: 30px;
`;
