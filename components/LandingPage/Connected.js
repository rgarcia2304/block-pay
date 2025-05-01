import React from 'react';
import styled from 'styled-components';

const Connected = (props) => {
  return (
    <ConnectorHeader onClick = {props.connectWallet}>
      You are connected to Metamask
    <WalletInfo> {props.account}   </WalletInfo>
    </ConnectorHeader>
  );
};

const ConnectorHeader = styled.div`
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

const WalletInfo = styled.p`

`;

export default Connected;