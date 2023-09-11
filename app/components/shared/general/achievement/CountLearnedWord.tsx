import MediumBox from "@/app/components/ui/MediumBox"

type Props = {
  count: number
}

export default function CountLearnedWord({ count }: Props) {
  const icon = "/images/achievement_word.png"
  const title = "Sổ tay"
  const description = `Bạn đã học ${count} từ`

  return <MediumBox icon={icon} title={title} description={description} />
}
