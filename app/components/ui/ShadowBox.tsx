import styles from "@/app/styles/shadow-box.module.scss"

type Props = {
  children: React.ReactNode
}

export default function ShadowBox({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>
}
