import styles from "@/app/styles/word.module.scss"

type Props = {
  enWord: string
  vieWord: string
  type?: string
}

export default function Word({ enWord, vieWord, type }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2>{enWord}</h2>
      <p className={styles.type}>{`(${type})`}</p>
      <p>{vieWord}</p>
    </div>
  )
}
