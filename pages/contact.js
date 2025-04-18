import Head from "next/head";
import Image from "next/image";
import {styled} from 'styled-components'
import Navbar from "@/components/Navbarinfo/Navbar";
import React, { useRef } from 'react';
import Hero from "@/components/ContactPage/Hero";




export default function Home() {
  const getStartedRef = useRef(null);
  return (
    <>
    <BackDrop>
    <Navbar scrollTargetRef={getStartedRef} />
    <Hero></Hero>
    </BackDrop>
    
    </>
  );
}


const BackDrop = styled.div`
  background-color: black;
`