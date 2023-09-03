import { FloatButton } from "antd"
import { PlusOutlined } from "@ant-design/icons"

export default function FloatAddWordButton() {
  return (
    <FloatButton tooltip={<div>Thêm từ mới</div>} icon={<PlusOutlined />} />
  )
}
