import MediumBox from "@/app/components/ui/MediumBox"

type Props = {
  count: number
}

export default function NowStreak({ count }: Props) {
  const icon = "/images/achievement_word.png"
  const title = "Streak hiện tại"
  const description = `Bạn đang học liên tiếp ${count} ngày`

  return (
    <MediumBox
      icon={icon}
      title={title}
      description={description}
      color="#FFE0B2"
    />
  )
}
