import { NavLink } from 'react-router-dom'
import { pages } from '../../config/navigation.js'
import { portfolio } from '../../config/portfolio.js'
import FileIcon from '../ui/FileIcon.jsx'
import Icon from '../ui/Icon.jsx'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import styles from './Sidebar.module.css'

// Explorador de arquivos. No celular funciona como gaveta (abre pelo botão das abas).
function Sidebar({ isHidden, isDrawerOpen, onNavigate }) {
  const className = [styles.sidebar, isHidden && styles.hidden, isDrawerOpen && styles.open]
    .filter(Boolean)
    .join(' ')

  return (
    <aside className={className} aria-label="Explorador">
      <p className={styles.heading}>Explorador</p>
      <div className={styles.root}>
        <Icon name="chevron" size={14} />
        <span>{portfolio.explorerRoot}</span>
      </div>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li key={page.path}>
            <NavLink to={page.path} end className={styles.file} onClick={onNavigate}>
              <FileIcon ext={page.ext} />
              <span>{page.file}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <ThemeToggle className={styles.themeButton} showLabel />
      </div>
    </aside>
  )
}

export default Sidebar
