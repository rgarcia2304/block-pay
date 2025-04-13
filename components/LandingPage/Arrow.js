import React from 'react';
import { HiArrowSmRight } from "react-icons/hi";
import styled from 'styled-components';

const Arrow = () => {
  return (
    <Square>
      <HiArrowSmRight />
    </Square>
  );
};

const Square = styled.div`
  

  background-color: black; 
  color:  #cf89ff ;
  border-radius: 4px; // Adjust for square or rounded corners
  text-decoration: none;
  svg {
    width: 50px;
    height: 50px; 
  }
  &:hover {
    color: white;
  }
`;

export default Arrow;