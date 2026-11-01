import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate.js'
import styles from './RepoCard.module.css'

// Card de um projeto (repositório do GitHub). Usado na home e na lista de projetos.
function RepoCard({ repo }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.name}>
        <Link to={`/projetos/${encodeURIComponent(repo.name)}`} className={styles.link}>
          {repo.name}
        </Link>
      </h3>
      <p className={styles.description}>{repo.description || 'Sem descrição no GitHub.'}</p>
      <p className={styles.meta}>
        {repo.language && <span>{repo.language}</span>}
        <span>Atualizado em {formatDate(repo.pushedAt)}</span>
      </p>
    </article>
  )
}

export default RepoCard
