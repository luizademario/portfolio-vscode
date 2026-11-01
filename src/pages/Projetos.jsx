import RepoList from '../components/repos/RepoList.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import { portfolio } from '../config/portfolio.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { usePortfolioRepos } from '../hooks/usePortfolioRepos.js'

function Projetos() {
  usePageTitle('Projetos')
  const { data, isPending, error, refetch } = usePortfolioRepos()

  return (
    <PageContainer title="Projetos">
      <p>
        Repositórios públicos do meu GitHub marcados com o tópico “{portfolio.projectTopic}”,
        carregados direto da API.
      </p>
      <RepoList
        repos={data}
        isLoading={isPending}
        error={error}
        onRetry={refetch}
        emptyText={`Nenhum repositório público com o tópico “${portfolio.projectTopic}” por enquanto.`}
      />
    </PageContainer>
  )
}

export default Projetos
