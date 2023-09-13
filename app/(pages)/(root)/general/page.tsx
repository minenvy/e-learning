import Achievement from "@/app/components/shared/general/Achievements"
import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import FractionLayout from "@/app/components/shared/FractionLayout"
import WordChart from "@/app/components/shared/general/WordChart"
import styles from "@/app/styles/general.module.scss"
import {
  countReviewWord,
  getCountWordForAllLevel,
} from "@/app/lib/actions/level-word.actions"
import { auth } from "@clerk/nextjs"

export default async function General() {
  const { userId } = auth()

  const numberOfWords = await getCountWordForAllLevel(userId!)
  const reviewCount = await countReviewWord(userId!)

  return (
    <FractionLayout
      ratio={2}
      bigPart={
        <div className={styles.boundary}>
          <CenterAlignBox>
            <WordChart generalCount={numberOfWords} reviewCount={reviewCount} />
          </CenterAlignBox>
        </div>
      }
      smallPart={<Achievement />}
    />
  )
}
