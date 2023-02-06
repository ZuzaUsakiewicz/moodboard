import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar, Button, Text, Spacer } from "@nextui-org/react";

const NavbarMenu = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  function signOutUser() {
    supabaseClient.auth.signOut();
    router.push("/");
  }

  return (
    <Navbar
      isCompact
      variant="floating"
      css={{ pt: "$8", px: "$8" }}
      isBordered
    >
      <Navbar.Brand as={Link} href="/">
        <Text h2 size={30} weight="bold">
          M😁😎Dboard
        </Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs" variant="underline" activeColor="secondary">
        <Navbar.Link href="/main" color="secondary">
          Main moods
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
              <Text>Hey, {user?.email}</Text>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={() => signOutUser()}>
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
