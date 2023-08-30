import styles from '@/app/styles/loading.module.scss'

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={`${styles.inner} ${styles.one}`}></div>
        <div className={`${styles.inner} ${styles.two}`}></div>
        <div className={`${styles.inner} ${styles.three}`}></div>
      </div>
    </div>
  )
}
