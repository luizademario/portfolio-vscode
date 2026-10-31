import { portfolio } from '../../config/portfolio.js'
import Icon from '../ui/Icon.jsx'
import styles from './StatusBar.module.css'

// Barra inferior inspirada na do VS Code. São rótulos visuais: não refletem o estado real do Git.
function StatusBar() {
  return (
    <footer className={styles.bar}>
      <div className={styles.group}>
        <a
          className={styles.item}
          href={portfolio.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir o repositório do portfólio no GitHub (abre em outra aba)"
        >
          <Icon name="branch" size={14} />
          <span>main</span>
        </a>
      </div>
      <div className={styles.group}>
        <span className={`${styles.item} ${styles.hideOnMobile}`}>JavaScript</span>
        <span className={`${styles.item} ${styles.hideOnMobile}`}>React</span>
        <a
          className={styles.item}
          href={portfolio.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Repositório do portfólio no GitHub (abre em outra aba)"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  )
}

export default StatusBar
