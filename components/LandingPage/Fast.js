import React from 'react';
import { FaRunning } from "react-icons/fa";
import styled from 'styled-components';

const Fast = () => {
  return (
    <Square>
      <FaRunning />
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

export default Fast;