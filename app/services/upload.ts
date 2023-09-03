type Data = {
  image: string
  message?: string
}

export async function uploadImage(image: File) {
  const formData = new FormData()
  formData.append("image", image)

  const res = await fetch("/api/upload", {
    method: "post",
    body: formData,
  })
  const data = (await res.json()) as Data

  return data.image
}
