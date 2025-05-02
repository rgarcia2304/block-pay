import styled from 'styled-components';
import React, { useState } from 'react';

export default function CreateGroupForm({ onSubmit }) {
  const [bill, setBill] = useState('');
  const [membersInput, setMembersInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    const members = membersInput
      .split(',')
      .map(addr => addr.trim())
      .filter(addr => addr);

    if (!bill) {
      setError('Please enter a bill amount');
      return;
    }
    if (members.length < 2) {
      setError('Enter at least two member addresses');
      return;
    }

    onSubmit({ bill, members });
  };

  return (
    <Section>
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="bill">Total Bill (AVAX)</Label>
        <Input
          id="bill"
          type="text"
          value={bill}
          placeholder="Amount in AVAX"
          onChange={e => setBill(e.target.value)}
          required
        />
      </Field>

      <Field>
        <Label htmlFor="members">Member Addresses</Label>
        <Textarea
          id="members"
          value={membersInput}
          placeholder="place comma seperated addresses here"
          onChange={e => setMembersInput(e.target.value)}
          required
        />
      </Field>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Submit type="submit">Create Group</Submit>
    </Form>
    </Section>
  );
}
const Section = styled.div`
  display:flex;
  flex-direction: row;
  justify-content:center;
`
const Form = styled.form`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: #cf89ff;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 10px;
  color: white;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  resize: vertical;
  min-height: 4rem;
  color: white;
`;

const Submit = styled.button`
  padding: 0.75rem;
  background-color: #cf89ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
`;