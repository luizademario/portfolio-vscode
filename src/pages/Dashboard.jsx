import { useQueryClient } from '@tanstack/react-query'
import RequireAuth from '../components/auth/RequireAuth.jsx'
import FeaturedPicker from '../components/dashboard/FeaturedPicker.jsx'
import MessageList from '../components/dashboard/MessageList.jsx'
import Button from '../components/ui/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import StatusMessage from '../components/ui/StatusMessage.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useFeaturedNames } from '../hooks/useFeatured.js'
import { useMessages, useSetAnswered } from '../hooks/useMessages.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { usePortfolioRepos } from '../hooks/usePortfolioRepos.js'
import { useToggleFeatured } from '../hooks/useToggleFeatured.js'
import { describeDashboardError } from '../utils/describeDashboardError.js'

function DashboardContent() {
  usePageTitle('Dashboard')
  const queryClient = useQueryClient()
  const { signOut } = useAuth()
  const messages = useMessages()
  const setAnswered = useSetAnswered()
  const repos = usePortfolioRepos()
  const featured = useFeaturedNames()
  const toggleFeatured = useToggleFeatured()

  const unanswered = (messages.data ?? []).filter((item) => !item.answered).length
  const writeError = setAnswered.error ?? toggleFeatured.error

  async function handleSignOut() {
    await signOut()
    queryClient.removeQueries({ queryKey: ['dashboard'] }) // não deixa mensagens na memória
  }

  return (
    <PageContainer title="Dashboard">
      <p>
        <Button variant="secondary" onClick={handleSignOut}>
          Sair
        </Button>
      </p>

      {writeError && (
        <StatusMessage tone="error" title={describeDashboardError(writeError).title}>
          {describeDashboardError(writeError).text}
        </StatusMessage>
      )}

      <h2>Mensagens {messages.data && `(${unanswered} sem resposta)`}</h2>
      <MessageList
        messages={messages.data}
        isLoading={messages.isPending}
        error={messages.error}
        onRetry={messages.refetch}
        onToggle={(id, answered) => setAnswered.mutate({ id, answered })}
        pendingId={setAnswered.isPending ? setAnswered.variables.id : null}
      />

      <h2>Projetos em destaque na Home</h2>
      <p>Sem nenhum marcado, a Home mostra os primeiros projetos da lista.</p>
      <FeaturedPicker
        repos={repos.data}
        featuredNames={featured.data}
        isLoading={repos.isPending}
        error={repos.error}
        onRetry={repos.refetch}
        onToggle={(name, isFeatured) => toggleFeatured.mutate({ name, featured: isFeatured })}
        pendingName={toggleFeatured.isPending ? toggleFeatured.variables.name : null}
      />
    </PageContainer>
  )
}

// Exportação padrão: a página inteira só abre para quem está logado.
function Dashboard() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  )
}

export default Dashboard
