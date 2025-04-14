import React from 'react';
import { HiOutlineCubeTransparent } from "react-icons/hi";
import styled from 'styled-components';

const Transparent = ({ highlighted }) => {
  return (
    <Square highlighted={highlighted}>
      <HiOutlineCubeTransparent />
    </Square>
  );
};

const Square = styled.div`
  background-color: black;
  color: ${({ highlighted }) => (highlighted ? 'white' : '#cf89ff')};
  border-radius: 4px;
  text-decoration: none;

  svg {
    width: 100px;
    height: 100px;
    transition: color 0.3s ease, filter 0.3s ease;
  }

  &:hover {
    color: white;
  }
`;

export default Transparent;