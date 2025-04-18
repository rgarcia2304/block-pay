import React from 'react';
import styled from 'styled-components';
import  { useState, useEffect, useRef } from "react";


const useInView = (options = {}) => {
    const ref = useRef();
    const [inView, setInView] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      }, options);
  
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [options]);
  
    return [ref, inView];
  };
  
  const Hero = () => {
    const [ref1, inView1] = useInView({ threshold: 0.2 });
    const [ref2, inView2] = useInView({ threshold: 0.2 });
    const [ref3, inView3] = useInView({ threshold: 0.2 });
  
    return (
      <Section>
        <Container>
          <Top>
            <HeaderContainer>
              <Header1>Redefining</Header1>
              <Header2>the way</Header2>
              <Header5>Payment</Header5>
              <Header4>is done</Header4>
            </HeaderContainer>
            <Image src="/images/pay.jpg" />
          </Top>
        </Container>
  
        <AnimatedContainer ref={ref1} inView={inView1}>
          <Headerabout>Bringing it to an end</Headerabout>
          <Headeraboutcont>
            After endless fights, arguments, and disagreements. 
            <Space />
            We thought why not design a solution that all could use to pay in groups. 
            <Space />
            Sure others make paying others easy but we all know that feeling of 
            having a month-old money request never fulfilled.
          </Headeraboutcont>
        </AnimatedContainer>
  
        <AnimatedContainer ref={ref2} inView={inView2}>
          <Headeraboutcont>
            Here we are leveraging the blockchain to make every single transaction visible for all to see
          </Headeraboutcont>
          <Headerabout>Built using web3</Headerabout>
        </AnimatedContainer>
  
        <AnimatedContainer ref={ref3} inView={inView3}>
        <Footer>We look future to you helping us change payment
        </Footer>
        </AnimatedContainer>
      </Section>
    );
  };
  



const Section = styled.section`
width: 100%;
height: 150vh;
`;

const Space = styled.br`
    margin-top:20px;
`;

const HeaderContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:center;

`
const Container = styled.div`
    margin-top: 10%;
    display:flex;
    flex-direction: column;
    justify-content:center;
    margin-left: 10%;
    margin-right: 10%;
`;

const Top = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`;

const Header1 = styled.h1`
    font-family: sans-serif;
    color: #cf89ff;
    font-size: 80px;
    margin-left: 10%;

`;
const Header2 = styled.h1`
    font-family: sans-serif;
    color: #cf89ff;
    font-size: 40px;
    margin-left: 15%
`;
const Header5 = styled.h1`
    font-family: sans-serif;
    font-size: 80px;
    color: #cf89ff;
    margin-left: 20%

`;

const Header4 = styled.h1`
   font-family: sans-serif;
    font-size: 40px;
    color: #cf89ff;
    margin-left: 25%
`;

const Header3 = styled.h1`
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    font-size: 40px;
    text-align:center;
    color: #cf89ff;


`;
const Headerabout = styled.h1`
    font-family: sans-serif;
    display: flex;
    font-size: 50px;
    text-align:center;
    margin-top:150px;
    margin-bottom: 20px;
    margin-left: 10%;
    margin-right:30%;
     color: #cf89ff;

`;
const Footer = styled.h1`
    font-family: sans-serif;
    display: flex;
    font-size: 50px;
    text-align:center;
    margin-top:150px;
    margin-bottom: 20px;
    display:flex;
    justify-content:center;
     color: #cf89ff;
    margin-bottom: 150px;

`;
const Headeraboutcont = styled.h1`
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    font-size: 30px;
    margin-top:150px;
    margin-bottom: 20px;
    margin-left: 10%;
    margin-right:10%;
     color: #cf89ff;
     display:flex;
     flex-direction:column;

`;


const Image = styled.img`
  margin-top: 10px;
  width: 20%;
  height: 15%;
  border-radius: 10px; 
  margin-bottom: 30px;
`;
const Container2 = styled.div`
  margin-top:400px;
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
`;
const AnimatedContainer = styled(Container2)`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: ${({ inView }) => (inView ? "translateY(0)" : "translateY(40px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;
  margin-bottom: 50px;
`;
export default Hero;