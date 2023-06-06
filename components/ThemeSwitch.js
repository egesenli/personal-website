import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { DarkModeSwitch } from 'react-toggle-dark-mode'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on the client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const toggleDarkMode = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <DarkModeSwitch
      onChange={toggleDarkMode}
      checked={theme === 'dark' || resolvedTheme === 'dark'}
      animationProperties={{
        dark: {
          circle: {
            r: 9,
          },
          mask: {
            cx: '50%',
            cy: '23%',
          },
          svg: {
            transform: 'rotate(40deg)',
          },
          lines: {
            opacity: 0,
          },
        },
        light: {
          circle: {
            r: 5,
          },
          mask: {
            cx: '100%',
            cy: '0%',
          },
          svg: {
            transform: 'rotate(90deg)',
          },
          lines: {
            opacity: 1,
          },
        },
        springConfig: { mass: 4, tension: 250, friction: 35 },
      }}
    />
  )
}

export default ThemeSwitch
