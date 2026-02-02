import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-secondary border border-border flex items-center transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute w-5 h-5 rounded-full bg-primary flex items-center justify-center"
        animate={{
          x: theme === 'light' ? 2 : 30,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 text-background" />
        ) : (
          <Moon className="w-3 h-3 text-background" />
        )}
      </motion.div>
    </motion.button>
  )
}
