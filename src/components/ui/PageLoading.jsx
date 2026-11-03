import styles from './PageLoading.module.css'

// Aviso de carregamento de uma página inteira (ex.: enquanto o arquivo da página baixa).
function PageLoading({ label = 'Carregando…' }) {
  return (
    <div className={styles.box} role="status" aria-busy="true">
      {label}
    </div>
  )
}

export default PageLoading
