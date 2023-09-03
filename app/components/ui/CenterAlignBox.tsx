import styles from "@/app/styles/center-align-box.module.scss"

type Props = {
  children: React.ReactNode
}

export default function CenterAlignBox({ children }: Props) {
  return <div className={styles.boundary}>{children}</div>
}
