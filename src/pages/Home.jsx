import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import { portfolio } from '../config/portfolio.js'
import { profile } from '../config/profile.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import styles from './Home.module.css'

// Home em formato hero: tudo vem de config/profile.js (nada de texto fixo aqui).
function Home() {
  usePageTitle('')

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-titulo">
        {profile.name && <p className={styles.eyebrow}>Olá, eu sou</p>}
        <h1 id="hero-titulo" className={styles.name}>
          {profile.name || 'Portfólio'}
        </h1>
        <p className={styles.headline}>{profile.headline}</p>
        <hr className={styles.divider} />
        {profile.summary.map((paragraph) => (
          <p key={paragraph} className={styles.summary}>
            {paragraph}
          </p>
        ))}

        <div className={styles.actions}>
          <Button to="/projetos">Ver projetos →</Button>
          <Button to="/contato" variant="secondary">
            Falar comigo
          </Button>
        </div>

        <nav className={styles.links} aria-label="Links rápidos">
          <a href={portfolio.profileUrl} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <span aria-hidden="true">/</span>
          <Link to="/contato">Contato</Link>
        </nav>
      </section>

      <section className={styles.featured}>
        <h2>Projetos em destaque</h2>
        <p>Os destaques serão carregados do GitHub no próximo bloco.</p>
      </section>
    </div>
  )
}

export default Home
