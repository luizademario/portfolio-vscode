import { Link, useLocation } from 'react-router-dom'
import { getTabInfo, normalizePath } from '../../config/navigation.js'
import { useTabs } from '../../hooks/useTabs.js'
import FileIcon from '../ui/FileIcon.jsx'
import Icon from '../ui/Icon.jsx'
import styles from './TabBar.module.css'

// Abas abertas. Cada aba é um link; o "x" fecha só a aba, a página continua no explorador.
function TabBar({ drawerOpen, onToggleDrawer }) {
  const { tabs, closeTab } = useTabs()
  const activePath = normalizePath(useLocation().pathname)

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onToggleDrawer}
        aria-expanded={drawerOpen}
        aria-label="Abrir ou fechar o explorador"
      >
        <Icon name="menu" size={20} />
      </button>

      <nav className={styles.tabs} aria-label="Abas abertas">
        <ul className={styles.list}>
          {tabs.map((path) => {
            const info = getTabInfo(path)
            if (!info) return null
            const isActive = path === activePath
            return (
              <li
                key={path}
                className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
                onAuxClick={(event) => {
                  // Clique com o botão do meio fecha a aba, como no VS Code.
                  if (event.button === 1) closeTab(path)
                }}
              >
                <Link
                  to={path}
                  className={styles.link}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <FileIcon ext={info.ext} />
                  <span>{info.file}</span>
                </Link>
                <button
                  type="button"
                  className={styles.close}
                  onClick={() => closeTab(path)}
                  aria-label={`Fechar ${info.file}`}
                >
                  <Icon name="close" size={14} />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default TabBar
