import styles from "@/app/styles/card.module.scss"
import Link from "next/link"

type Props = {
  title: string
  image: string
  description?: string
  more?: React.ReactNode
  link?: string
}

export default function Card({ title, image, description, more, link }: Props) {
  return (
    <div className={styles.wrapper}>
      <Link href={link || ""}>
        <div className={styles.img_boundary}>
          <img src={image} alt="thumbnail" />
        </div>
      </Link>
      <div className={styles.meta}>
        <div className={styles.title}>
          <h3 className={styles.name}>{title}</h3>
          <div className={styles.more}>{more}</div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
