import fs from "fs"
import { NextRequest, NextResponse } from "next/server"

const uploadFolder = "/uploads/"
const uploadDir = "/public/uploads/"
const uploadPath = process.cwd() + uploadDir

function checkUploadFolder() {
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
}

export async function POST(req: NextRequest) {
  checkUploadFolder()

  const formData = await req.formData()
  const image = formData.get("image") as File
  const imageName = Date.now().toString() + image.name
  const imagePath = uploadPath + imageName

  const buffer = Buffer.from(await image.arrayBuffer())
  fs.writeFile(imagePath, buffer, (err) => console.log(err))

  return NextResponse.json({
    image: `${uploadFolder}${imageName}`,
  })
}
