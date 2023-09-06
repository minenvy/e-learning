"use client"

import { useEffect, useState } from "react"

const delayTime = 300

export default function useDebounce(initValue: string | number) {
  const [previousValue, setPreviousValue] = useState(initValue)
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    let timeout = setTimeout(() => {
      setValue(previousValue)
    }, delayTime)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [previousValue])

  const onChange = (data: string | number) => setPreviousValue(data)

  return {
    previousValue,
    value,
    onChange,
  }
}
