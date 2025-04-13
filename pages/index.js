import Head from "next/head";
import Image from "next/image";
import {styled} from 'styled-components'
import Navbar from "@/components/Navbarinfo/Navbar";
import Hero from "@/components/LandingPage/Hero";




export default function Home() {
  return (
    <>
    <BackDrop>
    <Navbar></Navbar>
    <Hero> </Hero>
    </BackDrop>
    
    </>
  );
}


const BackDrop = styled.div`
  background-color: black;
`