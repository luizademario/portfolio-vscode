import styles from './StatusMessage.module.css'

// Mensagem de erro ou de lista vazia, com um botão opcional (ex.: "Tentar de novo").
// `tone="error"` é anunciado de imediato por leitores de tela; `info` é anunciado com calma.
function StatusMessage({ title, children, tone = 'info', action }) {
  return (
    <div className={`${styles.box} ${styles[tone]}`} role={tone === 'error' ? 'alert' : 'status'}>
      <p className={styles.title}>{title}</p>
      {children && <p className={styles.text}>{children}</p>}
      {action}
    </div>
  )
}

export default StatusMessage
