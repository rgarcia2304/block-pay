import styled from 'styled-components';
import Group from './Group';
import Arrow from './Arrow';
import Vote from './Vote';
import Pay from './Pay';
import Fair from './Fair';
import Transparent from './Transparent';
import Fast from './Fast';
import React, { useState, useEffect, useRef } from "react";

const word_lst = ["fast", "transparent", "fair"];

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

const Hero = ({ scrollRef }) => {
  const [highlightedWord, setHighlightedWord] = useState(word_lst[0]);

  const [groupRef, groupInView] = useInView({ threshold: 0.2 });
  const [voteRef, voteInView] = useInView({ threshold: 0.2 });
  const [payRef, payInView] = useInView({ threshold: 0.2 });

  const cycleWords = async () => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setHighlightedWord((prevWord) => {
        const currentIndex = word_lst.indexOf(prevWord);
        const nextIndex = (currentIndex + 1) % word_lst.length;
        return word_lst[nextIndex];
      });
    }
  };

  useEffect(() => {
    cycleWords();
  }, []);

  return (
    <Section>
      <Container>
        <Header>Paying in a group should be</Header>
        <Header style={{ gap: "1rem" }}>
          {word_lst.map((word, idx) => (
            <span
              key={idx}
              style={{
                color: word === highlightedWord ? "white" : "#cf89ff",
                transition: "color 0.4s ease",
                fontWeight: "bold",
              }}
            >
              {word}
            </span>
          ))}
        </Header>
      </Container>

      <IconsContainer>
        <Fast highlighted={highlightedWord === "fast"} />
        <Transparent highlighted={highlightedWord === "transparent"} />
        <Fair highlighted={highlightedWord === "fair"} />
      </IconsContainer>

      <SummaryContainer ref={scrollRef}>
        <Summary>We make it as easy as</Summary>
      </SummaryContainer>

      <IconsContainer>
        <Group />
        <Arrow />
        <Vote />
        <Arrow />
        <Pay />
      </IconsContainer>

      {/* Animated Sections */}
      <AnimatedContainer ref={groupRef} inView={groupInView}>
        <Right_side_div>
          <Headeraboutcont>Form a payment group</Headeraboutcont>
          <Headersmall>
            Users in a group form a group providing each other's digital wallet
            addresses to make the groups
          </Headersmall>
        </Right_side_div>
        <Headerabout>
          <Group />
        </Headerabout>
      </AnimatedContainer>

      <AnimatedContainer ref={voteRef} inView={voteInView}>
        <Headerabout>
          <Vote />
        </Headerabout>
        <Right_side_div>
          <Headeraboutcont>Voting</Headeraboutcont>
          <Headersmall>
            Elect someone in the group to pay, to ensure it's fair everyone must stake money
          </Headersmall>
        </Right_side_div>
      </AnimatedContainer>

      <AnimatedContainer ref={payRef} inView={payInView}>
        <Right_side_div>
          <Headeraboutcont>Payment</Headeraboutcont>
          <Headersmall>
            Elected User receives payment and everything is recorded on the blockchain for transparency.
          </Headersmall>
        </Right_side_div>
        <Headerabout>
          <Pay />
        </Headerabout>
      </AnimatedContainer>
      <FooterContainer></FooterContainer>
    </Section>
  );
};



const Section = styled.section`
  width: 100%;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  color: #cf89ff;
`;

const SummaryContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  font-family: sans-serif;
  justify-content: center;
  align-items: center;
  color: #cf89ff;
`;

const Header = styled.div`
  font-family: sans-serif;
  font-size: 50px;
  text-align: center;
  width: 55%;
  font-weight: 600;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`;

const Summary = styled.div`
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  width: 35%;
  color: #cf89ff;
`;

const IconsContainer = styled.div`
  width: 100%;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #cf89ff;
`;

const Container2 = styled.div`
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

const FooterContainer = styled.div`
  margin-top:250px;
  display: flex;
  justify-content: space-between;
  margin-left: 20%;
  margin-right: 20%;
`;

const Headerabout = styled.h1`
  font-family: sans-serif;
  display: flex;
  font-size: 50px;
  text-align: center;
  margin-top: 150px;
  flex-direction: row;
  color: white;
`;

const Right_side_div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
  font-family: sans-serif;
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
  margin-top: 150px;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-right: 20%;
  font-weight: 600;
  color: #cf89ff;
`;

const HighlightableIcon = styled.div`
  filter: ${({ active }) => (active ? "brightness(200%)" : "brightness(100%)")};
  transition: filter 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Hero;
