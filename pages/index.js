import Head from "next/head";
import Image from "next/image";
import {styled} from 'styled-components'
import Navbar from "@/components/Navbarinfo/Navbar";
import Hero from "@/components/LandingPage/Hero";
import React, { useRef } from 'react';




export default function Home() {
  const getStartedRef = useRef(null);
  return (
    <>
    <BackDrop>
    <Navbar scrollTargetRef={getStartedRef} />
      <Hero scrollRef={getStartedRef} />
    </BackDrop>
    
    </>
  );
}


const BackDrop = styled.div`
  background-color: black;
`