import Button from '../ui/Button.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'
import { describeGithubError } from '../../utils/describeGithubError.js'
import RepoCard from './RepoCard.jsx'
import RepoCardSkeleton from './RepoCardSkeleton.jsx'
import styles from './RepoList.module.css'

// Mostra a lista de projetos com os quatro estados: carregando (esqueleto), erro, vazia e com dados.
// Não busca nada: recebe tudo por props (a busca fica nos hooks).
function RepoList({
  repos = [],
  isLoading = false,
  error = null,
  onRetry,
  limit,
  skeletonCount = 2,
  emptyText = 'Nenhum projeto para mostrar por enquanto.',
}) {
  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <span className={styles.srOnly}>Carregando projetos…</span>
        <div className={styles.grid}>
          {Array.from({ length: skeletonCount }, (_, index) => (
            <RepoCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    const { title, text } = describeGithubError(error)
    return (
      <StatusMessage
        tone="error"
        title={title}
        action={
          onRetry && (
            <Button variant="secondary" onClick={onRetry}>
              Tentar de novo
            </Button>
          )
        }
      >
        {text}
      </StatusMessage>
    )
  }

  if (repos.length === 0) {
    return <StatusMessage title="Lista vazia">{emptyText}</StatusMessage>
  }

  const visible = limit ? repos.slice(0, limit) : repos
  return (
    <div className={styles.grid}>
      {visible.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}

export default RepoList
