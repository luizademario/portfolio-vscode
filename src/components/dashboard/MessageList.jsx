import Button from '../ui/Button.jsx'
import StatusMessage from '../ui/StatusMessage.jsx'
import { describeDashboardError } from '../../utils/describeDashboardError.js'
import { formatDate } from '../../utils/formatDate.js'
import styles from './MessageList.module.css'

function MessageSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.bar} ${styles.barTitle}`} />
      <div className={`${styles.bar} ${styles.barLine}`} />
      <div className={`${styles.bar} ${styles.barLine}`} />
    </div>
  )
}

// Lista de mensagens do formulário de contato, com carregando, erro, vazia e dados.
// `pendingId` é a mensagem que está sendo salva agora (o botão dela fica bloqueado).
function MessageList({ messages = [], isLoading, error, onRetry, onToggle, pendingId }) {
  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <span className="sr-only">Carregando mensagens…</span>
        <div className={styles.list}>
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      </div>
    )
  }

  if (error) {
    const { title, text } = describeDashboardError(error)
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

  if (messages.length === 0) {
    return (
      <StatusMessage title="Nenhuma mensagem">Ainda não chegou nenhuma mensagem.</StatusMessage>
    )
  }

  return (
    <ul className={styles.list}>
      {messages.map((item) => (
        <li key={item.id} className={styles.card}>
          <p className={styles.header}>
            <strong>{item.name}</strong>
            <a href={`mailto:${encodeURIComponent(item.email)}`}>{item.email}</a>
            <span className={styles.date}>{formatDate(item.created_at)}</span>
            <span className={item.answered ? styles.done : styles.new}>
              {item.answered ? 'Respondida' : 'Nova'}
            </span>
          </p>
          <p className={styles.text}>{item.message}</p>
          <Button
            variant="secondary"
            disabled={pendingId === item.id}
            onClick={() => onToggle(item.id, !item.answered)}
          >
            {item.answered ? 'Marcar como não respondida' : 'Marcar como respondida'}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default MessageList
