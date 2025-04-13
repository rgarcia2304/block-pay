import React from 'react';
import { MdOutlineHowToVote } from "react-icons/md";
import styled from 'styled-components';

const Vote = () => {
  return (
    <Square>
      <MdOutlineHowToVote />
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

export default Vote;