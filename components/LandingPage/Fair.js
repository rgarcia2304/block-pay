import React from 'react';
import { GiShakingHands } from "react-icons/gi";import styled from 'styled-components';

const Fair = () => {
  return (
    <Square>
      <GiShakingHands />
    </Square>
  );
};

const Square = styled.div`
  

  background-color: black; 
  color:  #cf89ff ;
  border-radius: 4px; // Adjust for square or rounded corners
  text-decoration: none;
  svg {
    width: 100px;
    height: 100px; 
  }
  &:hover {
    color: white;
  }
`;

export default Fair;