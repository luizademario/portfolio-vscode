import styles from './FormField.module.css'

// Campo de formulário com rótulo, mensagem de erro e dica. `as="textarea"` para texto longo.
function FormField({ id, label, error, hint, as = 'input', ...controlProps }) {
  const Control = as
  const errorId = `${id}-erro`
  const hintId = `${id}-dica`
  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Control
        id={id}
        name={controlProps.name ?? id}
        className={`${styles.control} ${error ? styles.invalid : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...controlProps}
      />
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
