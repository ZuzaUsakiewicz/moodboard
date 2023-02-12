import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Text, Textarea, Grid, Button, Spacer } from "@nextui-org/react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { getUserName } from "@/helpers/getUserName";

const CreateMood: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const initialState = {
    title: "",
    mood: "",
  };

  const [moodData, setMoodData] = useState(initialState);

  const handleChange = (e: any) => {
    setMoodData({ ...moodData, [e.target.name]: e.target.value });
  };

  const createMood = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("moods")
        .insert([
          {
            title: moodData.title,
            mood: moodData.mood,
            user_email: user?.email?.toLowerCase(),
            user_id: user?.id,
          },
        ])
        .single();
      if (error) throw error;
      setMoodData(initialState);
      router.push("/main");
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <Grid.Container gap={1}>
      <Text h3>Title</Text>
      <Grid xs={12}>
        <Textarea
          name="title"
          aria-label="title"
          placeholder="mood title"
          fullWidth={true}
          rows={1}
          size="xl"
          onChange={handleChange}
        />
      </Grid>
      <Text h3>Mood</Text>
      <Grid xs={12}>
        <Textarea
          name="mood"
          aria-label="mood"
          placeholder="mood content"
          fullWidth={true}
          rows={6}
          size="xl"
          onChange={handleChange}
        />
      </Grid>
      <Grid xs={12}>
        <Text>{getUserName(user?.email)}&apos;s Mood</Text>
      </Grid>
      <Button onPress={createMood}>Create Mood</Button>
    </Grid.Container>
  );
};

export default CreateMood;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });
