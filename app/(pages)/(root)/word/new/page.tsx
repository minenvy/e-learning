"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import ImageUploader from "@/app/components/shared/ImageUploader"
import Button from "@/app/components/ui/Button"
import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import Form from "@/app/components/ui/Form"
import Input from "@/app/components/ui/Input"
import { addNewWord } from "@/app/services/new-word"
import { uploadImage } from "@/app/services/upload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { styled } from "styled-components"

const exitUrl = "/word"

export default function Page() {
  const router = useRouter()
  const [image, setImage] = useState<File>()
  const [enWord, setEnWord] = useState("")
  const [type, setType] = useState("")
  const [vieWord, setVieWord] = useState("")
  const [definition, setDefinition] = useState("")
  const [synonyms, setSynonyms] = useState("")
  const [antonyms, setAntonyms] = useState("")
  const [example, setExample] = useState("")

  const exit = () => {
    router.push(exitUrl)
  }
  const changeImage = (file: File) => setImage(file)
  const changeEnWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnWord(e.target.value)
  }
  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }
  const changeVieWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVieWord(e.target.value)
  }
  const changeDefinition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDefinition(e.target.value)
  }
  const changeSynonyms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSynonyms(e.target.value)
  }
  const changeAntonyms = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAntonyms(e.target.value)
  }
  const changeExample = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExample(e.target.value)
  }
  const onSubmit = async () => {
    const imageLink = image ? await uploadImage(image) : ""
    const res = await addNewWord({
      enWord,
      type,
      vieWord,
      definition,
      synonyms,
      antonyms,
      example,
      image: imageLink,
    })

    if (res) exit()
  }

  return (
    <CenterAlignBox>
      <MarginBoundary>
        <Form>
          <CloseButton onClick={exit} />
          <ImageUploaderBoundary>
            <ImageUploader image={image} changeImage={changeImage} />
          </ImageUploaderBoundary>
          <MarginBoundary>
            <RequiredBoundary data-has-value={!!enWord}>
              <Input
                label="Từ tiếng Anh"
                value={enWord}
                onChange={changeEnWord}
              />
            </RequiredBoundary>
          </MarginBoundary>
          <MarginBoundary>
            <RequiredBoundary data-has-value={!!type}>
              <Input
                label="Loại từ (n, v, adj, adv, ...)"
                value={type}
                onChange={changeType}
              />
            </RequiredBoundary>
          </MarginBoundary>
          <MarginBoundary>
            <RequiredBoundary data-has-value={!!vieWord}>
              <Input
                label="Từ tiếng Việt"
                value={vieWord}
                onChange={changeVieWord}
              />
            </RequiredBoundary>
          </MarginBoundary>
          <MarginBoundary>
            <Input
              label="Định nghĩa bằng tiếng Anh"
              value={definition}
              onChange={changeDefinition}
            />
          </MarginBoundary>
          <MarginBoundary>
            <Input
              label="Từ đồng nghĩa"
              value={synonyms}
              onChange={changeSynonyms}
            />
          </MarginBoundary>
          <MarginBoundary>
            <Input
              label="Từ trái nghĩa"
              value={antonyms}
              onChange={changeAntonyms}
            />
          </MarginBoundary>
          <MarginBoundary>
            <Input label="Câu ví dụ" value={example} onChange={changeExample} />
          </MarginBoundary>
          <ButtonBoundary>
            <Button onClick={onSubmit}>Thêm</Button>
          </ButtonBoundary>
        </Form>
      </MarginBoundary>
    </CenterAlignBox>
  )
}

const ImageUploaderBoundary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`
const MarginBoundary = styled.div`
  margin-bottom: 24px;
`
const RequiredBoundary = styled.div`
  &[data-has-value="false"] {
    border-radius: 4px;
    border-bottom: 1px solid #f04438;
  }
`
const ButtonBoundary = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
