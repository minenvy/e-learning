import MediumBox from "@/app/components/ui/MediumBox"

type Props = {
  count: number
}

export default function MaxStreak({ count }: Props) {
  const icon = "/images/achievement_word.png"
  const title = "Streak dài nhất"
  const description = `Bạn đã học liên tiếp ${count} ngày`

  return (
    <MediumBox
      icon={icon}
      title={title}
      description={description}
      color="#E1BEE7"
    />
  )
}
