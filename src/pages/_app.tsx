import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ContainerBox } from "../components/ContainerBox";
import NavbarMenu from "@/components/NavbarMenu";

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <NextUIProvider>
        <NavbarMenu />
        <ContainerBox
          css={{
            px: "$12",
            py: "$15",
            mt: "$12",
            "@xsMax": { px: "$10" },
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Component {...pageProps} />
        </ContainerBox>
      </NextUIProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
