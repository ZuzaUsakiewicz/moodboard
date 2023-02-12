import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";
import MoodCard from "@/components/MoodCard";

const MainPage: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [moods, setMoods] = useState<string[]>([]);

  useEffect(() => {
    getMoods();
  }, []);

  const getMoods = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("moods")
        .select("*")
        .limit(10);
      if (data != null) {
        setMoods(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <Text h2>All moods</Text>
      <Text size="$md">Check others mood</Text>
      {moods.map((mood, index) => (
        <MoodCard mood={mood} key={index} />
      ))}
    </>
  );
};

export default MainPage;
