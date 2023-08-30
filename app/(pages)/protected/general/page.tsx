'use client'

import Achievement from '@/app/components/shared/Achievement'
import WordChart from '@/app/components/shared/WordChart'
import styles from '@/app/styles/general.module.scss'

export default function General() {
  const word = [20, 30, 25, 55, 15]
  const max = Math.max(...word)

  return (
    <main className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.boundary}>
          <WordChart />
        </div>
      </div>
      <Achievement />
    </main>
  )
}
