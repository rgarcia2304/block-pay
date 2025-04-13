import React from 'react';
import { HiOutlineCubeTransparent } from "react-icons/hi";
import styled from 'styled-components';

const Transparent = () => {
  return (
    <Square>
      <HiOutlineCubeTransparent />
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

export default Transparent;