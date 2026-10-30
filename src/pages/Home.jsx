import Button from '../components/ui/Button.jsx'
import PageContainer from '../components/ui/PageContainer.jsx'
import { portfolio } from '../config/portfolio.js'
import { profile } from '../config/profile.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import styles from './Home.module.css'

function Home() {
  usePageTitle('')

  return (
    <PageContainer title={profile.name || 'Portfólio'}>
      <p className={styles.headline}>{profile.headline}</p>
      {profile.summary.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <div className={styles.actions}>
        <Button to="/projetos">Ver projetos</Button>
        <Button to="/contato" variant="secondary">
          Falar comigo
        </Button>
        <Button href={portfolio.profileUrl} variant="secondary">
          GitHub
        </Button>
      </div>

      <h2>Projetos em destaque</h2>
      <p>Os destaques serão carregados do GitHub no próximo bloco.</p>
    </PageContainer>
  )
}

export default Home
