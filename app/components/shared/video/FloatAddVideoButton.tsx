import { FloatButton } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import Link from "next/link"

export default function FloatAddVideoButton() {
  return (
    <Link href={"/video/new"}>
      <FloatButton tooltip={<div>Nghe bài mới</div>} icon={<PlusOutlined />} />
    </Link>
  )
}
