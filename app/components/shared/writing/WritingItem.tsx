"use client"

import CloseButton from "@/app/components/shared/CloseButton"
import ImageUploader from "@/app/components/shared/ImageUploader"
import Button from "@/app/components/ui/Button"
import Paragraph from "@/app/interfaces/paragraph"
import { uploadImage } from "@/app/services/upload"
import { addWriting, updateWriting } from "@/app/services/writing"
import { Input, Spin, message } from "antd"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import styled from "styled-components"

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
)
const writingUrl = "/writing"
const warningMessage = "Thêm đủ thông tin cho bài viết nhé"

type Props = {
  writing?: Paragraph
}

export default function WritingItem({ writing }: Props) {
  const router = useRouter()
  const [image, setImage] = useState<File>()
  const [title, setTitle] = useState("Tiêu đề")
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (writing) {
      setTitle(writing.title)
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(writing.content)),
        ),
      )
    }
  }, [writing])

  const exit = () => router.push(writingUrl)
  const changeImage = (file: File) => setImage(file)
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state)
  }
  const validate = () => {
    return (image || writing?.image) && title && editorState
  }
  const done = async () => {
    if (!validate()) {
      message.warning(warningMessage)
      return
    }
    if (isLoading) return
    setIsLoading(true)

    const imageUrl = image
      ? await uploadImage(image)
      : writing
      ? writing.image
      : ""
    const writingDb: Paragraph = {
      image: imageUrl,
      title,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    }
    if (writing) {
      writingDb.id = writing?.id
      await updateWriting(writingDb)
    } else {
      await addWriting(writingDb)
    }

    setIsLoading(false)
    exit()
  }

  return (
    <GrayBox>
      <ExitButton>
        <CloseButton onClick={exit} />
      </ExitButton>
      <Header>
        <ImageUploader
          image={image || writing?.image}
          changeImage={changeImage}
        />
        <Input
          size="large"
          bordered={false}
          value={title}
          onChange={changeTitle}
        />
      </Header>
      <EditorBoundary>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </EditorBoundary>
      <ButtonBoundary>
        <Button onClick={done}>{isLoading ? <Spin /> : "OK"}</Button>
      </ButtonBoundary>
    </GrayBox>
  )
}

const GrayBox = styled.div`
  width: 80%;
  height: 100%;
  background-color: #f8f8f8;
  padding: 30px;
  margin: 0 auto;
  overflow: auto;
`
const ExitButton = styled.div`
  height: 30px;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 16px;

  & div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`
const EditorBoundary = styled.div`
  min-height: 370px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

  & input,
  & button {
    color: black;
    background-color: white;
  }

  .rdw-link-modal,
  .rdw-colorpicker-modal {
    left: unset !important;
    right: 0;
  }
`
const ButtonBoundary = styled.div`
  text-align: center;
  margin: 16px 0;
`
