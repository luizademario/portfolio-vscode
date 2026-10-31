import { useTheme } from '../../hooks/useTheme.js'
import Icon from './Icon.jsx'

// `className` vem de quem usa (barra de ícones ou gaveta), para o botão herdar o visual do local.
function ThemeToggle({ className, showLabel = false }) {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? 'Mudar para o tema claro' : 'Mudar para o tema escuro'

  return (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      title={label}
      aria-label={label}
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
      {showLabel && <span>{theme === 'dark' ? 'Tema claro' : 'Tema escuro'}</span>}
    </button>
  )
}

export default ThemeToggle
