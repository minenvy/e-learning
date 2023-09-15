import { FloatButton } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import Link from "next/link"

export default function FloatAddWritingButton() {
  return (
    <Link href={"/writing/new"}>
      <FloatButton tooltip={<div>Viết bài mới</div>} icon={<PlusOutlined />} />
    </Link>
  )
}
