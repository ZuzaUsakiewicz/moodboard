import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { Button, Text, User } from "@nextui-org/react";
import { getUserName } from "@/helpers/getUserName";

const Mood: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
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

  const deleteMood = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("moods")
        .delete()
        .eq("id", id);

      if (error) throw error;
      router.push("/main");
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <>
      <Text h2>{moodboard.title}</Text>
      <User name={getUserName(moodboard.user_email)} size="md" />
      <Text size="$md">{moodboard.mood}</Text>
      {user && moodboard.user_id ? (
        <>
          <Button
            size="xs"
            color="primary"
            onPress={() => router.push("/editMood?id=" + id)}
          >
            Edit{" "}
          </Button>
          <Button size="xs" color="error" onPress={() => deleteMood()}>
            Delete
          </Button>
        </>
      ) : null}
    </>
  );
};

export default Mood;
