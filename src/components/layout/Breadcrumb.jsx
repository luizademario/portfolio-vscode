import { useLocation } from 'react-router-dom'
import { getTabInfo } from '../../config/navigation.js'
import styles from './Breadcrumb.module.css'

// Caminho do arquivo aberto, logo abaixo das abas (ex.: portfolio > sobre.md).
// Páginas sem aba (404) não mostram nada.
function Breadcrumb() {
  const { pathname } = useLocation()
  const tab = getTabInfo(pathname)

  if (!tab) return null

  return (
    <nav className={styles.breadcrumb} aria-label="Caminho do arquivo">
      <span>portfolio</span>
      <span className={styles.separator} aria-hidden="true">
        ›
      </span>
      <span className={styles.current} aria-current="page">
        {tab.file}
      </span>
    </nav>
  )
}

export default Breadcrumb
