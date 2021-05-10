import { useEffect, useState } from "react";

import { Button } from "@mantine/core";
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from "@modulz/radix-icons";
import styles from './ThemePicker.module.css'

export default function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [ fake, setFake ] = useState()
  console.log('theme', theme)
  const lightButtonVarient = (theme === 'light') ? 'filled' : 'outline'
  const darkButtonVarient = (theme === 'dark') ?  'filled' : 'outline'
  console.log('darkButtonVarient', darkButtonVarient)
  console.log('lightButtonVarient', lightButtonVarient)
  useEffect(() => {
    // force re-render
    setTimeout(() => {
      console.log('set')
      setFake('foo')
    }, 100)
  }, [theme])

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => setTheme('light')}
        variant={lightButtonVarient}
        leftIcon={<SunIcon />}
        className={styles.lightButton}
      >
        Light
      </Button>
      <Button
        onClick={() => setTheme('dark')}
        variant={darkButtonVarient}
        leftIcon={<MoonIcon />}
        className={styles.darkButton}
        data-xyz={fake}
      >
        Dark
      </Button>
      {/* <div>
        Current theme: {theme}
      </div> */}
    </div>
  )
}