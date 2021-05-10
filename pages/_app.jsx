import { useEffect, useState } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core"
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'
import ThemePicker from '../components/ThemePicker'

function JSSTheme({ children }) {
  const { theme } = useTheme()
  return (
    <MantineProvider
      theme={{
        /** Put your mantine theme override here */
        colorScheme: theme,
      }}
    >
      {children}
      <ThemePicker />
    </MantineProvider>
  )
}


export default function App(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider defaultTheme="light">
        <JSSTheme>
          <Component {...pageProps} />
        </JSSTheme>
      </ThemeProvider>
    </>
  );
}
