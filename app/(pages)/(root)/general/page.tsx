import Achievement from '@/app/components/shared/Achievement'
import TwoOneLayout from '@/app/components/shared/TwoOneLayout'
import WordChart from '@/app/components/shared/WordChart'
import styles from '@/app/styles/general.module.scss'

export default function General() {
  const word = [20, 30, 25, 55, 15]
  const max = Math.max(...word)

  return (
    <TwoOneLayout
      bigContent={
        <div className={styles.boundary}>
          <WordChart />
        </div>
      }
      smallContent={<Achievement />}
    />
  )
}
