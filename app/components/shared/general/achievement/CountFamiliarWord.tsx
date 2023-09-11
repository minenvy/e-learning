import MediumBox from "@/app/components/ui/MediumBox"
import { achievementLevel } from "@/app/constants/achievement"

type Props = {
  count: number
}

export default function CountFamiliarWord({ count }: Props) {
  const description = `Bạn đã hiểu rõ ${count} từ`
  const otherInfo = achievementLevel
    .reverse()
    .find((achievement) => achievement.count <= count)

  if (!otherInfo) return null

  return <MediumBox {...otherInfo} description={description} />
}
