import React from 'react';
import Link  from 'next/link';
import styled from 'styled-components';

const HomeButton = () => {
  return (
    <HomeButtons href="/">
      Get Started
    </HomeButtons>
  );
};

const HomeButtons = styled(Link)`
      background-color:white; 
      border: none;
      color:  #cf89ff;
      padding: 10px 15px;
      text-align: center;
      border-radius:12px;
      font-size: 16px;
      text-decoration:none;
      font-weight: 600;

       &:hover {
    background-color: #cf89ff; 
    color: black;

  }

`;

export default HomeButton;