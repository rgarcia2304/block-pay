import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Home from './Home';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Navbar = ({ scrollTargetRef }) => {
  const [open, setOpen] = useState(false);


  return (
    <Nav>
      <Logo href="/">Block-pay</Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </Hamburger>

      <Right_Items open={open}>
        <Home />
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
        <GetStarted onClick={() => scrollTargetRef?.current?.scrollIntoView({ behavior: 'smooth' })}>
          How it Works
        </GetStarted>
      </Right_Items>
    </Nav>
  );
};

const GetStarted = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: #cf89ff;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const NavItem = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: #cf89ff;
  &:hover {
    color: white;
  }
`;

const Right_Items = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 100px;
    left: 0;
    flex-direction: column;
    width: 100%;
    background: black;
    padding: 20px 0;
    transition: 0.3s ease;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-200%)')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  margin-right: 25px;
  color: #cf89ff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: sans-serif;
  height: 100px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: black;
`;

const Logo = styled(Link)`
  margin-left: 20px;
  font-size: 35px;
  font-weight: 1000;
  text-decoration: none;
  color: #cf89ff;
`;

export default Navbar;