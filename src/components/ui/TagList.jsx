import styles from './TagList.module.css'

// Lista de etiquetas (ex.: tecnologias).
function TagList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item} className={styles.tag}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export default TagList
