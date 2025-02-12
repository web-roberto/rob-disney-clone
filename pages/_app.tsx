// @ts-nocheck
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider, DefaultTheme } from "styled-components";
import Header from "../components/Header";
import GlobalStyle from "../globalstyles";
require('dotenv').config()


const theme: DefaultTheme = {
  primary: "#040714",
  secondary: "#0070f3",
  white: "#fff",
  brightBlue: "#3E64E5",
  silver: "silver",
  darkGrey: "#31343e",
};

export default function App({ Component, pageProps }: AppProps) {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return null; //no hagas nada en el 1er despliegue y que me asigne una url vercel y la pondre en variasble entorno de vercel NEXT_PUBLIC_API_BASE_URL
 console.log('--en App--NEXT_PUBLIC_API_BASE_URL true- ',process.env.NEXT_PUBLIC_API_BASE_URL)
  return (
    <>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
