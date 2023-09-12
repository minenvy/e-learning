import { message } from "antd"

export async function post(
  path: string,
  body: Object,
  warningMessage?: string,
) {
  const res = await fetch(path, {
    method: "post",
    body: JSON.stringify(body),
  })

  if (!res || !res.ok) {
    message.destroy()
    message.warning(warningMessage)
  } else {
    const data = await res.json()
    message.destroy()
    if (data?.message) message.success(data.message)
  }

  return res.ok
}
