import React from 'react';
import { GiShakingHands } from "react-icons/gi";
import styled from 'styled-components';

const Fair = ({ highlighted }) => {
  return (
    <Square highlighted={highlighted}>
      <GiShakingHands />
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

export default Fair;