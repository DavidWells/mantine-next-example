import { useEffect, useState, useReducer } from "react";

import { Button } from "@mantine/core";
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from "@modulz/radix-icons";
import styles from './ThemePicker.module.css'

export default function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [curRender, setRerender] = useState('fake-key')

  useEffect(() => {
    // Force rerender upon load
    setRerender(new Date().toISOString())
  }, [])

  const lightButtonVarient = (!theme || theme === 'light') ? 'filled' : 'outline'
  const darkButtonVarient = (theme === 'dark') ?  'filled' : 'outline'

  return (
    <div className={styles.wrapper} key={curRender}>
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
      >
        Dark
      </Button>
    </div>
  )
}