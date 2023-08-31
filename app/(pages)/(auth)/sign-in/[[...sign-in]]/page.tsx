import { SignIn } from '@clerk/nextjs'
import styles from '@/app/styles/auth.module.scss'

const generalUrl = '/general'

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <SignIn afterSignInUrl={generalUrl} />
    </div>
  )
}
