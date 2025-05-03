import React, { useState } from "react";
import styled from "styled-components";

export default function VoteComponent({
  members = [],
  account = "",
  hasVoted = false,
  onVote,
  loading = false,
  error = "",
}) {
  const me       = account.toLowerCase();
  const others   = members.filter(addr => addr.toLowerCase() !== me);
  const [voteAddr, setVoteAddr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onVote(voteAddr);
  };

  // if already voted → waiting message
  if (hasVoted) {
    return <Waiting> You’ve voted. Waiting for others to vote…</Waiting>;
  }

  return (
    <Container>
      <Title>Vote for who pays</Title>
      {error && <Error>{error}</Error>}

      <MembersList>
        {others.map((addr) => (
          <Member key={addr}>
            <Address>{addr}</Address>
          </Member>
        ))}
      </MembersList>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter address from above"
          value={voteAddr}
          onChange={(e) => setVoteAddr(e.target.value)}
        />
        <Button
          type="submit"
          disabled={
            loading ||
            !others.map(a => a.toLowerCase()).includes(voteAddr.toLowerCase())
          }
        >
          {loading ? "Submitting vote…" : "Submit Vote"}
        </Button>
      </Form>
    </Container>
  );
}

const Container   = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
`;
const Title       = styled.h2`
  color: #cf89ff;
  margin-bottom: 1rem;
`;
const Error       = styled.div`
  color: #ff6b6b;
  margin-bottom: 1rem;
`;
const Waiting     = styled.p`
  font-size: 1.1rem;
  color: #999;
`;
const MembersList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;
const Member      = styled.li`
  font-family: sans-serif;
  margin: 0.3rem 0;
`;
const Address     = styled.span`
  color: white;
`;
const Form        = styled.form`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  border-radius: 10px;
`;
const Input       = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-family: sans-serif;
  color: white;
  border-radius: 10px;
`;
const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #cf89ff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  &:disabled {
    background: #888;
    cursor: not-allowed;
  }
`;


  