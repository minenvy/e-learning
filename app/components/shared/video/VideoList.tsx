import Card from "@/app/components/shared/Card"
import styles from "@/app/styles/card-list.module.scss"

type Props = {
  filter: string
}

export default function WritingList({ filter }: Props) {
  const data = [
    {
      title: "bai 1",
      image: "https://i.ytimg.com/vi/yCnM5VKYgik/hqdefault.jpg",
      description: 'ok',
    },
    {
      title: "bai 2",
      image: "https://i.ytimg.com/vi/yCnM5VKYgik/hqdefault.jpg",
      description: 'ok',
    },
    {
      title: "bai 3",
      image: "https://i.ytimg.com/vi/yCnM5VKYgik/hqdefault.jpg",
      description: 'ok',
    },
    {
      title: "bai 4",
      image: "https://i.ytimg.com/vi/yCnM5VKYgik/hqdefault.jpg",
      description: 'ok',
    },
  ]

  return (
    <div className={styles.wrapper}>
      {data.map((card) => {
        return <Card {...card} key={card.title} />
      })}
    </div>
  )
}
