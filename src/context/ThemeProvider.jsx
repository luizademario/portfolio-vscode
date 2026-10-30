import { useCallback, useMemo, useState } from 'react'
import { ThemeContext } from './ThemeContext.js'

// Mesma chave usada no script do index.html.
const STORAGE_KEY = 'theme'

// O script do index.html já aplicou o tema salvo (ou o escuro, na primeira visita).
function readInitialTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme)

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem armazenamento disponível: o tema vale só nesta visita.
    }
    setTheme(next)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
