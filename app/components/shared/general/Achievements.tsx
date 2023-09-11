import CountLearnedWord from "@/app/components/shared/general/achievement/CountLearnedWord"
import MaxStreak from "@/app/components/shared/general/achievement/MaxStreak"
import NowStreak from "@/app/components/shared/general/achievement/NowStreak"
import CountFamiliarWord from "@/app/components/shared/general/achievement/CountFamiliarWord"
import styles from "@/app/styles/achievements.module.scss"
import { auth } from "@clerk/nextjs"
import {
  countFamiliarWord,
  countLearnedWord,
} from "@/app/lib/actions/level-word.actions"
import {
  countMaxStreak,
  countNowStreak,
} from "@/app/lib/actions/streak.actions"

export default async function Achievements() {
  const { userId } = auth()

  const learnedWordCount = await countLearnedWord(userId as string)
  const maxStreak = await countMaxStreak(userId as string)
  const nowStreak = await countNowStreak(userId as string)
  const familiarWordCount = await countFamiliarWord(userId as string)

  return (
    <div className={styles.wrapper}>
      <CountLearnedWord count={learnedWordCount} />
      <MaxStreak count={maxStreak} />
      <NowStreak count={nowStreak} />
      <CountFamiliarWord count={familiarWordCount} />
    </div>
  )
}
