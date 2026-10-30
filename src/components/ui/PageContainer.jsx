import styles from './PageContainer.module.css'

// Moldura comum das páginas de conteúdo: título + corpo.
function PageContainer({ title, children }) {
  return (
    <article className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </article>
  )
}

export default PageContainer
