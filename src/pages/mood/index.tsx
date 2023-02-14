import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Text, User } from "@nextui-org/react";
import { getUserName } from "@/helpers/getUserName";

const Mood: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [moodboard, setMoodboard] = useState<any>({});

  const { id } = router.query;
  useEffect(() => {
    async function getMood() {
      const { data, error } = await supabaseClient
        .from("moods")
        .select("*")
        .filter("id", "eq", id)
        .single();
      if (error) {
        alert(error.message);
      } else {
        setMoodboard(data);
      }
    }

    if (typeof id !== "undefined") {
      getMood();
    }
  }, [id]);

  return (
    <>
      <Text h2>{moodboard.title}</Text>
      <User name={getUserName(moodboard.user_email)} size="md" />
      <Text size="$md">{moodboard.mood}</Text>
    </>
  );
};

export default Mood;
