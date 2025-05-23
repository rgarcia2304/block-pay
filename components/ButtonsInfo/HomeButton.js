import React from 'react';
import Link  from 'next/link';
import styled from 'styled-components';

const HomeButton = (props) => {
  return (
    <HomeButtons onClick = {props.connectWallet}>
      Get Started
    </HomeButtons>
  );
};

const HomeButtons = styled.button`
      font-family: sans-serif;
      background-color: #cf89ff;
      border: none;
      color:  white;
      padding: 10px 15px;
      text-align: center;
      border-radius:12px;
      font-size: 16px;
      text-decoration:none;
      font-weight: 600;

       &:hover {
    background-color: grey ; 
    color: white;

  }

`;

export default HomeButton;