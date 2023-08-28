export async function post(path: string, body: Object) {
  return await fetch(path, {
    method: 'post',
    body: JSON.stringify(body)
  })
}
