import { Spin } from "antd"
import styles from "@/app/styles/loading.module.scss"

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <Spin />
    </div>
  )
}
