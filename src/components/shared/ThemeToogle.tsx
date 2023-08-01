import { IconMoon, IconSun } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToogle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  function switchTheme() {
    theme == 'dark' ? setTheme('light') : setTheme('dark')
  }
  return (
    <motion.button
      whileTap={{ y: '25px' }}
      className='rounded-full p-2 text-white hover:bg-gray-200 hover:text-gray-700 dark:text-white dark:hover:bg-gray-700'
      onClick={switchTheme}
    >
      {theme == 'light' ? <IconSun size={30} /> : <IconMoon size={30} />}
    </motion.button>
  )
}
