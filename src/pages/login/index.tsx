import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { Container, Row } from "@nextui-org/react";

const Login: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/main");
  }

  return (
    <Container>
      <Row justify="center" align="center">
        <Auth
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "blue",
                  brandAccent: "darkblue",
                },
                radii: {
                  borderRadiusButton: "8px",
                  buttonBorderRadius: "8px",
                  inputBorderRadius: "8px",
                },
              },
            },
          }}
          supabaseClient={supabaseClient}
        />
      </Row>
    </Container>
  );
};

export default Login;
