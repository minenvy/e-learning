import styles from "@/app/styles/card.module.scss"
import { MoreOutlined } from "@ant-design/icons"

type Props = {
  title: string
  image: string
  description?: string
}

export default function Card({ title, image, description }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.img_boundary}>
        <img src={image} alt="thumbnail" />
      </div>
      <div className={styles.meta}>
        <div className={styles.title}>
          <h3 className={styles.name}>{title}</h3>
          <div className={styles.more}>
            <MoreOutlined />
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
