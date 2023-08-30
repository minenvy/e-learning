'use client'

import styles from '@/app/styles/word_column.module.scss'
import { useEffect, useState } from 'react'

const parentHeight = 300

type Props = {
  order: number
  percent: number
  title: string
  backgroundColor: string
}

export default function Column({
  order,
  percent,
  title,
  backgroundColor,
}: Props) {
  const [height, setHeight] = useState(0)
  const transformedHeight = parentHeight * percent
  const marginTop = parentHeight - height

  useEffect(() => {
    setHeight(transformedHeight)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.color_stick}
        style={{
          backgroundColor,
          height,
          marginTop,
        }}
      >
        <p className={styles.title}>{title}</p>
        <p className={styles.order}>{order}</p>
      </div>
    </div>
  )
}
