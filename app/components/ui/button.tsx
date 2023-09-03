import styles from "@/app/styles/button.module.scss"

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return <button className={styles.custom_btn} {...props}></button>
}
