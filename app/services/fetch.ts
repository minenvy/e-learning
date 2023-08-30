import { message } from 'antd'

export async function post(
  path: string,
  body: Object,
  warningMessage?: string
) {
  const res = await fetch(path, {
    method: 'post',
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    message.warning(warningMessage)
  } else {
    const data = await res.json()
    message.success(data?.message)
  }

  return res.ok
}
