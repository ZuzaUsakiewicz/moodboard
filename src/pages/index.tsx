import Head from "next/head";
import { Text } from "@nextui-org/react";
import MoodCard from "@/components/MoodCard";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const [moods, setMoods] = useState<string[]>([]);

  useEffect(() => {
    getMoods();
  }, []);

  const getMoods = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("moods")
        .select("*")
        .order("inserted_at", { ascending: false })
        .limit(3);
      if (data != null) {
        setMoods(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <Head>
        <title>Moodboard!</title>
        <meta name="description" content="share your mood!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text h1>Share your mood with everyone!</Text>
      <Text color="success">Newest Moods:</Text>
      {moods.map((mood, index) => (
        <MoodCard key={index} mood={mood} />
      ))}
    </>
  );
}
