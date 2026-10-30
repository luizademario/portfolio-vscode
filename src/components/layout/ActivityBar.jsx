import { NavLink } from 'react-router-dom'
import { portfolio } from '../../config/portfolio.js'
import Icon from '../ui/Icon.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import styles from './ActivityBar.module.css'

// Barra vertical de ícones (só no desktop; no celular o explorador vira gaveta).
function ActivityBar({ sidebarVisible, onToggleSidebar }) {
  return (
    <nav className={styles.bar} aria-label="Barra de atividades">
      <div className={styles.group}>
        <button
          type="button"
          className={styles.item}
          onClick={onToggleSidebar}
          aria-pressed={sidebarVisible}
          aria-label="Mostrar ou esconder o explorador"
          title="Explorador"
        >
          <Icon name="files" />
        </button>
        <NavLink to="/projetos" className={styles.item} aria-label="Projetos" title="Projetos">
          <Icon name="folder" />
        </NavLink>
        <NavLink to="/contato" className={styles.item} aria-label="Contato" title="Contato">
          <Icon name="mail" />
        </NavLink>
        <a
          className={styles.item}
          href={portfolio.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Meu perfil no GitHub (abre em outra aba)"
          title="GitHub"
        >
          <Icon name="branch" />
        </a>
      </div>
      <div className={styles.group}>
        <ThemeToggle className={styles.item} />
      </div>
    </nav>
  )
}

export default ActivityBar
