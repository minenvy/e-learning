"use client"

import { Tooltip, message } from "antd"
import { useRef } from "react"
import { styled } from "styled-components"

const allowedImageType = ["png", "jpg", "jpeg", "gif"]

type Props = {
  image: string | File | undefined
  changeImage: (file: File) => void
}

export default function ImageUploader({ image, changeImage }: Props) {
  const imageInput = useRef<HTMLInputElement>(null)

  const url =
    image && (typeof image === "string" ? image : URL.createObjectURL(image))

  const openImageLibrary = () => {
    imageInput.current?.click()
  }
  const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const partName = file.name.split(".")
    const type = partName[partName.length - 1]
    if (!allowedImageType.includes(type)) {
      message.warning("Chỉ có thể chọn ảnh png, jpg, jpeg, gif!")
      return
    }
    changeImage(file)
  }

  return (
    <Tooltip title="Thay đổi ảnh" color="#ffcb08" placement="right">
      <Wrapper onClick={openImageLibrary}>
        {image ? <Image src={url} alt="image" /> : <StyledP>Ảnh</StyledP>}
        <HiddenInput type="file" onChange={chooseImage} ref={imageInput} />
      </Wrapper>
    </Tooltip>
  )
}

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`
const StyledP = styled.p`
  text-align: center;
`
const HiddenInput = styled.input`
  display: none;
`
