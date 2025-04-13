import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Home from './Home';

const Navbar = () => {

  return (
    <Nav>
      <Logo href="/">Block-pay</Logo>
      <Right_Items>
          <Home></Home>
          <About>About</About>
          <Contact> Contact</Contact>
         
      </Right_Items>
    </Nav>
  );
};

const Contact = styled.div`
    display:flex;
    font-size: 16px;
    font-weight: 600;
    text-decoration:none;
    color: #cf89ff;
    &:hover {
    color: white;
  }

`;
const About = styled.div`
    display:flex;
    font-size: 16px;
    font-weight: 600;
    text-decoration:none;
    color:  #cf89ff;

    &:hover {
    color: white;
  }

`;
const Right_Items = styled.div`
      display:flex;
      width: 25%;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-right: 25px;

`;

const Buttons = styled.div`
  display:flex;
  width: 175px;
  justify-content: space-between;
`;
const Nav = styled.nav`
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-family: sans-serif;
    height: 100px;
    position: sticky;
    top: 0;
    background: white;
    z-index:1000;
    background: black;
`;
const Logo = styled(Link)`
    margin-left:20px;
    font-size: 35px;
    font-weight: 1000;
    text-decoration:none;
    color: #cf89ff;
`;



export default Navbar;