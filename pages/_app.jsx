import { useEffect, useState } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'

function ThemePicker({ onThemeChange }) {
  const { theme, setTheme } = useTheme('light')
  console.log('theme', theme)
  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => {
        console.log('set light')
        setTheme('light')
        onThemeChange('light')
      }}>
        Light Mode
      </button>
      <button onClick={() => {
        console.log('set dark')
        setTheme('dark')
        onThemeChange('dark')
      }}>
        Dark Mode
      </button>
    </div>
  )
}

export default function App(props) {
  const { Component, pageProps } = props;
  const [ currentTheme, setCurrentTheme ] = useState('light')

  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  function onThemeChange(value) {
    console.log('setCurrentTheme', value)
    setCurrentTheme(value)
  }

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        <MantineProvider
          theme={{
            /** Put your mantine theme override here */
            colorScheme: currentTheme,
          }}
        >
          <Component {...pageProps} />
          <ThemePicker onThemeChange={onThemeChange} />
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}
