import { Link } from 'react-router-dom'
import styles from './Button.module.css'

// Um botão para o site todo. `to` = página interna, `href` = link externo (abre em outra aba),
// sem nenhum dos dois = botão comum. `variant`: 'primary' ou 'secondary'.
function Button({ to, href, variant = 'primary', children, ...rest }) {
  const className = `${styles.button} ${styles[variant]}`

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span aria-hidden="true"> ↗</span>
      </a>
    )
  }

  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  )
}

export default Button
