import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage, GetServerSidePropsContext } from "next";
import { Text, Textarea, Grid, Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getUserName } from "@/helpers/getUserName";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const EditMood: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { id } = router.query;

  const initialState = {
    title: "",
    mood: "",
  };

  const [moodData, setMoodData] = useState(initialState);

  const handleChange = (e: any) => {
    setMoodData({ ...moodData, [e.target.name]: e.target.value });
  };

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
        setMoodData(data);
      }
    }

    if (typeof id !== "undefined") {
      getMood();
    }
  }, [id]);

  const updateMood = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("moods")
        .update([
          {
            title: moodData.title,
            mood: moodData.mood,
          },
        ])
        .eq("id", id);
      if (error) throw error;
      router.push("/mood?id=" + id);
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
          initialValue={moodData.title}
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
          initialValue={moodData.mood}
        />
      </Grid>
      <Grid xs={12}>
        <Text>{getUserName(user?.email)}&apos;s Mood</Text>
      </Grid>
      <Button onPress={updateMood}>Update Mood</Button>
    </Grid.Container>
  );
};

export default EditMood;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
