import styles from "@/app/styles/medium-box.module.scss"

type Props = {
  icon: string
  title: string
  description: string
}

export default function MediumBox({ icon, title, description }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <img src={icon} alt="icon" />
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  )
}
