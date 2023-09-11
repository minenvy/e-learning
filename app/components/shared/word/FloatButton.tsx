import { FloatButton } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import Link from "next/link"

export default function FloatAddWordButton() {
  return (
    <Link href={"/word/new"}>
      <FloatButton tooltip={<div>Thêm từ mới</div>} icon={<PlusOutlined />} />
    </Link>
  )
}
