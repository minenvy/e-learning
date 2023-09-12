import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import { getNextTenWords } from "@/app/lib/actions/dictionary.actions"
import styles from '@/app/styles/learn-word.module.scss'
import WordLearning from "@/app/components/shared/word/WordLearning"

type Props = {
  params: {
    topic: string
    learnedCount: number
  }
}

export default async function LearnWord({
  params: { topic, learnedCount },
}: Props) {
  const words = await getNextTenWords(topic, learnedCount)

  return (
    <CenterAlignBox>
      <div className={styles.gray_box}>
        <WordLearning words={words} />
      </div>
    </CenterAlignBox>
  )
}
