import styles from "@/app/styles/two-one-layout.module.scss"

type Props = {
  bigContent: React.ReactNode
  smallContent: React.ReactNode
}

export default function TwoOneLayout({ bigContent, smallContent }: Props) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.big}>{bigContent}</div>
      <div className={styles.small}>{smallContent}</div>
    </main>
  )
}
