import styles from '@/app/styles/home.module.scss'
import Button from '@/app/components/ui/Button'
import Link from 'next/link'

const redirectUrl = '/general'

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <img src="/images/logo.svg" alt="logo" className={styles.logo} />
      <img src="/images/cloud.webp" alt="cloud" className={styles.left_cloud} />
      <img
        src="/images/cloud.webp"
        alt="cloud"
        className={styles.top_right_cloud}
      />
      <img
        src="/images/cloud.webp"
        alt="cloud"
        className={styles.top_bottom_cloud}
      />
      <section className={styles.main_content}>
        <img src="/images/icon.svg" alt="icon" className={styles.icon} />
        <div className={styles.paragraph}>
          <p className={styles.text}>Ghi chép và ôn tập Tiếng Anh</p>
          <Button>
            <Link href={redirectUrl}>Bắt đầu ngay</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
