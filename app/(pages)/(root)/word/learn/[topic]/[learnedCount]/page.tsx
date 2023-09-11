import { getNextTenWords } from "@/app/lib/actions/dictionary.actions"
import { auth } from "@clerk/nextjs"

type Props = {
  params: {
    topic: string
    learnedCount: number
  }
}

export default async function LearnWord({
  params: { topic, learnedCount },
}: Props) {
  const { userId } = auth()
  const words = await getNextTenWords(topic, learnedCount)

  console.log(words)

  return <p>learn</p>
}
