import Button from '../ui/Button.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'
import { describeGithubError } from '../../utils/describeGithubError.js'
import styles from './FeaturedPicker.module.css'

// Escolha dos projetos em destaque na Home: uma caixinha por projeto do GitHub.
// `pendingName` é o projeto que está sendo salvo agora.
function FeaturedPicker({
  repos = [],
  featuredNames = [],
  isLoading,
  error,
  onRetry,
  onToggle,
  pendingName,
}) {
  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        Carregando projetos…
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
          <Button variant="secondary" onClick={onRetry}>
            Tentar de novo
          </Button>
        }
      >
        {text}
      </StatusMessage>
    )
  }

  if (repos.length === 0) {
    return (
      <StatusMessage title="Nenhum projeto">
        Nenhum repositório público com o tópico do portfólio foi encontrado.
      </StatusMessage>
    )
  }

  const chosen = new Set(featuredNames.map((name) => name.toLowerCase()))

  return (
    <ul className={styles.list}>
      {repos.map((repo) => (
        <li key={repo.id}>
          <label className={styles.row}>
            <input
              type="checkbox"
              checked={chosen.has(repo.name.toLowerCase())}
              disabled={pendingName === repo.name}
              onChange={(event) => onToggle(repo.name, event.target.checked)}
            />
            <span>{repo.name}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default FeaturedPicker
