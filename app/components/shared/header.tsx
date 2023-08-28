import styles from '@/app/styles/header.module.scss'
import Link from 'next/link'

function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.side_boundary}>
        <Link href="/general">
          <img src="/images/icon.svg" alt="icon" className={styles.logo} />
        </Link>
        <p className={styles.app_name}>E-Learning</p>
      </div>
      <div className={styles.side_boundary}>
        <img
          src="https://scontent.xx.fbcdn.net/v/t39.30808-6/368025519_192514133836812_8226752861529253069_n.jpg?stp=dst-jpg_s960x960&_nc_cat=1&ccb=1-7&_nc_sid=730e14&_nc_ohc=nGYPBH5ZH-QAX9kw0W8&_nc_ht=scontent.xx&oh=00_AfCHFd242S_N-Pa0zRdXXNChXc41Po8fyyZt4wW56epH6w&oe=64E8261F"
          alt="avatar"
          className={styles.avatar}
        />
      </div>
    </header>
  )
}

export default Header
