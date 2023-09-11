"use client"

import styles from "@/app/styles/close-button.module.scss"

type Props = {
  onClick: () => void
}

export default function CloseButton({ onClick }: Props) {
  const closeIconSrc = "/images/close.svg"

  return (
    <div className={styles.close_icon} onClick={onClick}>
      <img src={closeIconSrc} alt="close icon" />
    </div>
  )
}
