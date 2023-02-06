import Head from "next/head";
import { Text } from "@nextui-org/react";
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Moodboard!</title>
        <meta name="description" content="share your mood!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text h1>Share your mood with everyone!</Text>
    </>
  );
}
