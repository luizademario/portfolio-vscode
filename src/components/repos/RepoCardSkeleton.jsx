import styles from './RepoCardSkeleton.module.css'

// Esqueleto com as mesmas medidas do RepoCard. É decorativo; quem anuncia o carregamento é o RepoList.
function RepoCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.bar} ${styles.title}`} />
      <div className={`${styles.bar} ${styles.line}`} />
      <div className={`${styles.bar} ${styles.shortLine}`} />
      <div className={`${styles.bar} ${styles.meta}`} />
    </div>
  )
}

export default RepoCardSkeleton
