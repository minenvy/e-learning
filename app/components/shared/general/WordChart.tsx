import WordColumn from "@/app/components/shared/general/WordColumn"
import styles from "@/app/styles/word-chart.module.scss"
import Button from "@/app/components/ui/Button"
import Link from "next/link"
import { colors } from "@/app/constants/word-chart-colors"

const reviewUrl = "/review"
const learnUrl = "/word"

type Props = {
  generalCount: number[]
  reviewCount: number
}

export default function WordChart({ generalCount, reviewCount }: Props) {
  const max = Math.max(...generalCount)
  const hasToReview = reviewCount > 0

  return (
    <>
      <div className={styles.chart}>
        {generalCount.map((numberOfWord, id) => {
          return (
            <WordColumn
              key={id}
              order={id + 1}
              percent={numberOfWord / max}
              title={`${numberOfWord} từ`}
              backgroundColor={colors[id]}
            />
          )
        })}
      </div>
      <div className={styles.divider} />
      <div className={styles.btn_dashboard}>
        <p>{`Chuẩn bị ôn tập: ${reviewCount} từ`}</p>
        <Button>
          <Link href={hasToReview ? reviewUrl : learnUrl}>
            {hasToReview ? "Ôn tập ngay" : "Học từ mới"}
          </Link>
        </Button>
      </div>
    </>
  )
}
