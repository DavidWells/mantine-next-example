import { useEffect, useState } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core"
import { useTheme } from 'next-themes'
import { ThemeProvider } from 'next-themes'
import ThemePicker from '../components/ThemePicker'

const isServer = typeof window === 'undefined'
function getTheme() {
  if (isServer) {
    return 
  }
  return window.localStorage.getItem('theme')
}

function getPersistedTheme() {
  if (isServer) {
    return 
  }
  return window.persistedTheme
}


const DEFAULT_THEME = getTheme()

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
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const defaultTheme = DEFAULT_THEME || getPersistedTheme()
  console.log('defaultTheme', defaultTheme)
  
  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <script dangerouslySetInnerHTML={{ 
          __html: `
          window.persistedTheme = window.localStorage.getItem('theme'); 
          console.log('persistedTheme', window.persistedTheme)
          ` 
        }} />
      </Head>
      <ThemeProvider defaultTheme={defaultTheme}>
        <JSSTheme>
          <Component {...pageProps} />
        </JSSTheme>
      </ThemeProvider>
    </>
  )
}
