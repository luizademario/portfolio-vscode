import styles from './Spinner.module.css'

// Indicador de carregamento girando. É decorativo: o texto ao lado diz o que está acontecendo.
function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />
}

export default Spinner
