import styles from "@/app/styles/fraction-layout.module.scss"

type Props = {
  bigPart: React.ReactNode
  smallPart: React.ReactNode
  ratio: number
}

export default function FractionLayout({ bigPart, smallPart, ratio }: Props) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.big} style={{ flex: ratio }}>
        {bigPart}
      </div>
      <div className={styles.small}>{smallPart}</div>
    </main>
  )
}
