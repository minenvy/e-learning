import styles from "@/app/styles/header.module.scss"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const signInUrl = "/sign-in"

function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.side_boundary}>
        <Link href="/general">
          <img src="/images/icon.svg" alt="icon" className={styles.logo} />
        </Link>
        <p className={styles.app_name}>E-Learning</p>
      </div>
      <div className={styles.user_btn}>
        <UserButton afterSignOutUrl={signInUrl} />
      </div>
    </header>
  )
}

export default Header
