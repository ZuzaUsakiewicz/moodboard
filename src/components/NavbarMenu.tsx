import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar, Button, Text, Badge } from "@nextui-org/react";
import { getUserName } from "@/helpers/getUserName";

const NavbarMenu = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push("/");
  }

  return (
    <Navbar isCompact variant="floating" isBordered>
      <Navbar.Brand as={Link} href="/">
        <Text h4 size={20} weight="bold" css={{ margin: "0 auto" }}>
          M😁😎Dboard
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline" activeColor="secondary">
        <Navbar.Link href="/main" color="secondary">
          Daily Moods
        </Navbar.Link>
        <Navbar.Link href="/createMood" color="error">
          Create Mood
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {!user ? (
          <>
            <Navbar.Link href="/login">
              <Button color="gradient" auto size="sm">
                Login
              </Button>
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Item>
              <Badge
                content=""
                color="success"
                placement="top-right"
                shape="circle"
                variant="dot"
                size="md"
              >
                <Text hideIn="xs">Hey, {getUserName(user?.email)}</Text>
              </Badge>
            </Navbar.Item>
            <Navbar.Item>
              <Button
                color="gradient"
                auto
                size="sm"
                onPress={() => signOutUser()}
              >
                Sign Out
              </Button>
            </Navbar.Item>
          </>
        )}{" "}
      </Navbar.Content>
    </Navbar>
  );
};

export default NavbarMenu;
