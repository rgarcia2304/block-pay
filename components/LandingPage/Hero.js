import React from 'react';
import styled from 'styled-components';
import Group from './Group';
import Arrow from './Arrow';
import Vote from './Vote';
import Pay from './Pay';
import Fair from './Fair';
import Transparent from './Transparent';
import Fast from './Fast';

const Hero = () => {
  return (
    
    <Section>

        <Container>
            <Header>Paying in a group should be
                fast, transparent, and fair. </Header>
    
        </Container>
        <IconsContainer>
            <Fast></Fast>
            <Transparent></Transparent>
            <Fair></Fair>
            
        </IconsContainer>
        <SummaryContainer> <Summary>We make it as easy as</Summary></SummaryContainer>

        
        <IconsContainer>
            
            <Group></Group>
            <Arrow></Arrow>
            <Vote></Vote>
            <Arrow></Arrow>
            <Pay></Pay>

        </IconsContainer>

        <Container2>
        
        <Right_side_div>
          <Headeraboutcont>Form a payment group</Headeraboutcont>
          <Headersmall> Users in a group form a group providing eachothers
            digital wallet addresses to make the groups
          </Headersmall>
        </Right_side_div>
        <Headerabout>
        <Group></Group>

        </Headerabout>

        </Container2>

        <Container2>
        <Headerabout>
        <Vote></Vote>

          </Headerabout>

        <Right_side_div>
        <Headeraboutcont> Voting </Headeraboutcont>
        <Headersmall> Elect someone in the group to pay, to ensure its fair everyone must stake money
      
        </Headersmall>
        </Right_side_div>

        </Container2>

        <Container2>
        
        <Right_side_div>
          <Headeraboutcont>Payment </Headeraboutcont>
          <Headersmall> Elected User receives payment and everythingis recorded on the blockchain for transparency.
          </Headersmall>
        </Right_side_div>
        <Headerabout>
        <Pay></Pay>

        </Headerabout>
        </Container2>
        
    </Section>
  );
};

const Section = styled.section`
width: 100%;
`;

const Container = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    margin-top:150px;
    color: #cf89ff;
`;
const SummaryContainer = styled.div`
    margin-top: 100px;
    
    display:flex;
    flex-direction: row;
    font-family: sans-serif;
    justify-content:center;
    align-items:center;
    color: #cf89ff;
`;

const Header = styled.div`
    font-family: sans-serif;
    font-size: 50px;
    text-align:center;
    width: 55%;
    font-weight: 600;
    margin-bottom: 100px;

`
const Summary = styled.div`
    font-family: sans-serif;
    display: flex;
    justify-content:center;
    flex-direction:row:
    align-items:center;
    font-size: 20px;
    text-align:center;
    width: 35%;
    color: #cf89ff;

`
const IconsContainer = styled.div`
    width: 100%;
    font-size: 10px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    margin-top: 20px;
    color: #cf89ff;
`;
const Container2 = styled.div`
    display:flex;
    justify-content:space-between;
    margin-left:20%;
    margin-right:20%;
    
`;
const Header1 = styled.div`
    font-family: sans-serif;
    color: #cf89ff;
    font-size: 100px;
    font-weight:600;
    display:flex;
    justify-content:center;
    margin-top:40px;
    `
    ;


const Headerabout = styled.h1`
    font-family: sans-serif;
    display: flex;
    font-size: 50px;
    text-align:center;
    margin-top:150px;
    flex-direction: row;
    color: white;
  

`;

const Right_side_div = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    width:50%;
    text-align:center;
    font-family:sans-serif;
    
`;
const Headersmall = styled.p`
    font-size: 20px;
    color: white;
`;
const Headeraboutcont = styled.div`
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    font-size: 30px;
    margin-top:150px;
    margin-bottom: 20px;
    margin-left: 100px;
    margin-right:20%;
    font-weight:600;
    color: #cf89ff;

`;

const Image = styled.img`
  margin-top: 10px;
  width: 250px;
  height:200px;
  border-radius: 10px; /* Optional for styling */
  margin-bottom: 30px;
`;

export default Hero;