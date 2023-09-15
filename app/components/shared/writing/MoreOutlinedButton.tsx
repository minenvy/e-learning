"use client"

import { MoreOutlined } from "@ant-design/icons"
import { Dropdown } from "antd"
import type { MenuProps } from "antd"

type Props = {
  items: Array<{
    key: number
    label: React.ReactNode
  }>
  onClicks: Array<() => void>
}

export default function MoreOutlinedButton({ items, onClicks }: Props) {
  const preventPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  const onClick: MenuProps["onClick"] = ({ key }) => {
    onClicks[Number(key)]()
  }

  return (
    <div onClick={preventPropagation}>
      <Dropdown menu={{ items, onClick }} trigger={["click"]}>
        <MoreOutlined />
      </Dropdown>
    </div>
  )
}
