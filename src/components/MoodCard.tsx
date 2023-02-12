import { NextPage } from "next";
import { useRouter } from "next/router";
import { Card, Text } from "@nextui-org/react";
import { getUserName } from "@/helpers/getUserName";

interface Props {
  mood: any;
}

const MoodCard: NextPage<Props> = (props) => {
  const router = useRouter();
  const { mood } = props;

  function getDateFromString() {
    let time = Date.parse(mood.inserted_at);
    let date = new Date(time);
    return date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
  }

  return (
    <Card
      isPressable
      css={{ mb: "$10" }}
      onPress={() => router.push("mood?id=" + mood.id)}
    >
      <Card.Body>
        <Text h3>{mood.title}</Text>
        <Text h4 size="$sm">
          mood of the day: {getDateFromString()}
        </Text>
        {/* <Text b>By: {mood.user_email}</Text> */}
        <Text h5 size="$xs">
          {/* By: {mood.user_email.substring(0, mood.user_email.indexOf("@"))} */}
          By: {getUserName(mood.user_email)}
        </Text>
      </Card.Body>
    </Card>
  );
};

export default MoodCard;
