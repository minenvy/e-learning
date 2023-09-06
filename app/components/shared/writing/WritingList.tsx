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
      image:
        "https://i.ytimg.com/vi/G5b8S232Rpc/hq720.jpg?sqp=-oaymwFDCNAFEJQDSFryq4qpAzUIARUAAIhCGAHYAQHiAQwIGhACGAYgATgBQAHwAQH4Af4JgALQBYoCDAgAEAEYciBCKDgwDw==&rs=AOn4CLBi2-5SnwqLTQF_4y59L8qeAJiC-Q",
      description: 'ok',
    },
    {
      title: "bai 3",
      image:
        "https://i.ytimg.com/vi/G5b8S232Rpc/hq720.jpg?sqp=-oaymwFDCNAFEJQDSFryq4qpAzUIARUAAIhCGAHYAQHiAQwIGhACGAYgATgBQAHwAQH4Af4JgALQBYoCDAgAEAEYciBCKDgwDw==&rs=AOn4CLBi2-5SnwqLTQF_4y59L8qeAJiC-Q",
      description: 'ok',
    },
    {
      title: "bai 4",
      image:
        "https://i.ytimg.com/vi/G5b8S232Rpc/hq720.jpg?sqp=-oaymwFDCNAFEJQDSFryq4qpAzUIARUAAIhCGAHYAQHiAQwIGhACGAYgATgBQAHwAQH4Af4JgALQBYoCDAgAEAEYciBCKDgwDw==&rs=AOn4CLBi2-5SnwqLTQF_4y59L8qeAJiC-Q",
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
