import styles from "@/app/styles/word.module.scss"

type Props = {
  enWord: string
  definition: string
  type: string
}

export default function Word({ enWord, definition, type }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2>{enWord}</h2>
      <p className={styles.type}>{`(${type})`}</p>
      <p>{definition}</p>
    </div>
  )
}
