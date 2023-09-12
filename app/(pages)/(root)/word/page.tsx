import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import FractionLayout from "@/app/components/shared/FractionLayout"
import Topic from "@/app/components/shared/word/Topic"
import FloatAddWordButton from "@/app/components/shared/word/FloatAddWordButton"
import { getCountEachTopic } from "@/app/lib/actions/dictionary.actions"
import { auth } from "@clerk/nextjs"

export default async function Word() {
  const { userId } = auth()

  const countLearnedWordEachTopic = await getCountEachTopic(userId as string)

  return (
    <FractionLayout
      ratio={5}
      bigPart={
        <CenterAlignBox>
          <Topic countLearnedWordEachTopic={countLearnedWordEachTopic} />
        </CenterAlignBox>
      }
      smallPart={<FloatAddWordButton />}
    />
  )
}
