import { wordLevels } from "@/app/constants/word-level"
import Link from "next/link"
import styles from "@/app/styles/word-level-link.module.scss"

const notebookUrl = "/notebook/"

type Props = {
  level: string
}

export default function WordLevel({ level }: Props) {
  return (
    <div className={styles.wrapper}>
      {wordLevels.map((wordLevel) => {
        const isActive = level == wordLevel.key

        return (
          <Link href={`${notebookUrl}${wordLevel.key}`} key={wordLevel.key}>
            <div className={styles.link_boundary}>
              <span className={isActive ? styles.active : ""}>
                {wordLevel.label}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
