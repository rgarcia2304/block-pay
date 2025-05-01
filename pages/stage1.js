import Head from "next/head";
import Image from "next/image";
import {styled} from 'styled-components'
import Navbar from "@/components/Navbarinfo/Navbar";
import Hero from "@/components/Workflow/Hero";
import SNavbar from "@/components/Navbarinfo/SNavbar";
import React, { useState, useEffect, useRef } from "react";
import { ethers } from 'ethers';
import { CONTRACT_ABI,CONTRACT_ADDRESS } from '@/blockchain/contract';
import Connected from "@/components/LandingPage/Connected";



export default function Home() {

  

  const getStartedRef = useRef(null);
  return (
    <>
    <BackDrop>
    <SNavbar></SNavbar>
    <Hero></Hero>
    </BackDrop>
    
    </>
  );
}


const BackDrop = styled.div`
  background-color: black;
`

