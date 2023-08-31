import fs, { createReadStream, createWriteStream } from 'fs'
import { NextRequest, NextResponse } from 'next/server'

const uploadFolder = '/uploads/'
const uploadDir = '/public/uploads/'
const uploadPath = process.cwd() + uploadDir

function checkUploadFolder() {
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
}

export async function POST(req: NextRequest) {
  checkUploadFolder()

  const formData = await req.formData()
  const image = formData.get('image') as File
  const imageName = Date.now().toString() + image.name
  const imagePath = uploadPath + imageName

  const writeStream = createWriteStream(imagePath)
  // Pipe the image data from the request to the write stream
  createReadStream(imagePath).pipe(writeStream)

  return NextResponse.json({
    image: `${uploadFolder}${imageName}`,
  })
}
