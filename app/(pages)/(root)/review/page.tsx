import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import { getAllNeedReviewWord } from "@/app/lib/actions/level-word.actions"
import { auth } from "@clerk/nextjs"
import styles from "@/app/styles/gray-box.module.scss"
import WordReview from "@/app/components/shared/review/WordReview"

export default async function Review() {
  const { userId } = auth()

  const words = await getAllNeedReviewWord(userId!)

  return (
    <CenterAlignBox>
      <div className={styles.gray_box}>
        <WordReview words={words} />
      </div>
    </CenterAlignBox>
  )
}
