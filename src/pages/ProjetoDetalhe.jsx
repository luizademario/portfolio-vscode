import { useParams } from 'react-router-dom'
import RepoCardSkeleton from '../components/repos/RepoCardSkeleton.jsx'
import Button from '../components/ui/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import StatusMessage from '../components/ui/StatusMessage.jsx'
import TagList from '../components/ui/TagList.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { usePortfolioRepo } from '../hooks/usePortfolioRepos.js'
import { describeGithubError } from '../utils/describeGithubError.js'
import { formatDate } from '../utils/formatDate.js'
import styles from './ProjetoDetalhe.module.css'

// Página individual de um projeto (/projetos/<nome>). Os dados vêm do mesmo cache da lista:
// abrir um projeto depois da lista não faz nova requisição.
function ProjetoDetalhe() {
  const { nome } = useParams()
  usePageTitle(nome)
  const { data: repo, isPending, error, refetch } = usePortfolioRepo(nome)

  const back = (
    <Button to="/projetos" variant="secondary">
      Voltar para projetos
    </Button>
  )

  if (isPending) {
    return (
      <PageContainer title={nome}>
        <div role="status" aria-busy="true">
          <span className="sr-only">Carregando projeto…</span>
          <RepoCardSkeleton />
        </div>
      </PageContainer>
    )
  }

  if (error) {
    const { title, text } = describeGithubError(error)
    return (
      <PageContainer title={nome}>
        <StatusMessage
          tone="error"
          title={title}
          action={
            <Button variant="secondary" onClick={refetch}>
              Tentar de novo
            </Button>
          }
        >
          {text}
        </StatusMessage>
      </PageContainer>
    )
  }

  if (!repo) {
    return (
      <PageContainer title="Projeto não encontrado">
        <p>Não existe um projeto chamado “{nome}” na lista do portfólio.</p>
        {back}
      </PageContainer>
    )
  }

  return (
    <PageContainer title={repo.name}>
      <p>{repo.description || 'Sem descrição no GitHub.'}</p>
      <dl className={styles.facts}>
        {repo.language && (
          <>
            <dt>Linguagem principal</dt>
            <dd>{repo.language}</dd>
          </>
        )}
        <dt>Última atualização</dt>
        <dd>{formatDate(repo.pushedAt)}</dd>
        <dt>Criado em</dt>
        <dd>{formatDate(repo.createdAt)}</dd>
        <dt>Estrelas</dt>
        <dd>{repo.stars}</dd>
      </dl>
      {repo.topics.length > 0 && <TagList items={repo.topics} />}
      <p>
        <Button href={repo.htmlUrl}>Ver no GitHub</Button>{' '}
        {repo.homepage && (
          <Button href={repo.homepage} variant="secondary">
            Abrir o projeto
          </Button>
        )}
      </p>
      {back}
    </PageContainer>
  )
}

export default ProjetoDetalhe
