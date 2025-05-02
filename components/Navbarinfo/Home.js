import React from 'react';
import Link  from 'next/link';
import { IoMdHome } from 'react-icons/io'; 
import styled from 'styled-components';

const Home = () => {
  return (
    <Square href="/">
      <IoMdHome />
    </Square>
  );
};

const Square = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; // Adjust the size as needed
  height: 50px; // Adjust the size as needed
  background-color: black; // Adjust the background color as needed
  color:  #cf89ff ;
  border-radius: 4px; // Adjust for square or rounded corners
  text-decoration: none;
  
  svg {
    width: 24px; // Adjust icon size as needed
    height: 24px; // Adjust icon size as needed
  }

  &:hover {
    color: white;
  }
`;

export default Home;