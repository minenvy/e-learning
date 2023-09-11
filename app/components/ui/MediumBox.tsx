import styles from "@/app/styles/medium-box.module.scss"

type Props = {
  icon: string
  title: string
  description: string
  color?: string
}

export default function MediumBox({ icon, title, description, color }: Props) {
  const style = {
    border: `2px solid ${color}`,
    backgroundColor: color,
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} style={color ? style : {}}>
        <img src={icon} alt="icon" />
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  )
}
