import React from 'react';
import { FaRunning } from "react-icons/fa";
import styled from 'styled-components';

const Fast = ({ highlighted }) => {
  return (
    <Square highlighted={highlighted}>
      <FaRunning />
    </Square>
  );
};

const Square = styled.div`
  background-color: black;
  color: ${({ highlighted }) => (highlighted ? 'white' : '#cf89ff')};
  border-radius: 4px;
  text-decoration: none;

  svg {
    width: 100px;
    height: 100px;
    transition: color 0.3s ease, filter 0.3s ease;
  }

  &:hover {
    color: white;
  }
`;

export default Fast;