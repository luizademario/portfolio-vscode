import styles from './FileIcon.module.css'

const kinds = {
  jsx: { label: 'JSX', color: '#61dafb' },
  md: { label: 'MD', color: '#519aba' },
  js: { label: 'JS', color: '#e5c07b' },
  css: { label: '#', color: '#c586c0' },
}

function FileIcon({ ext }) {
  const kind = kinds[ext] ?? { label: '·', color: 'var(--fg-muted)' }
  return (
    <span className={styles.icon} style={{ color: kind.color }} aria-hidden="true">
      {kind.label}
    </span>
  )
}

export default FileIcon
