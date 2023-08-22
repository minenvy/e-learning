import { sidebarLinks } from '@/app/constants/sidebar'
import { usePathname } from 'next/navigation'
import styles from '@/app/styles/sidebar.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className={styles.wrapper}>
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.value

        return (
          <Link href={link.value} key={link.value}>
            <div className={`${styles.btn} ${isActive && styles.active_btn}`}>
              <img src={link.icon} alt="icon" />
              <p>{link.label}</p>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
