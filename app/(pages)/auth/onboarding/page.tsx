'use client'

import ImageUploader from '@/app/components/shared/ImageUploader'
import Button from '@/app/components/ui/Button'
import Input from '@/app/components/ui/Input'
import Form from '@/app/components/ui/auth/Form'
import { updateUserInfo } from '@/app/services/onboarding'
import { uploadImage } from '@/app/services/upload'
import { Spin } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const defaultAvatar = '/images/icon.svg'
const callbackUrl = '/protected/general'
const signInUrl = '/auth/sign-in'

export default function Onboarding() {
  const { data: session, update } = useSession()
  const router = useRouter()

  const user = session?.user

  const [image, setImage] = useState<File>()
  const [name, setName] = useState(user?.name || '')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) router.push(signInUrl)
  }, [])

  const changeImage = (file: File) => setImage(file)
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const changeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value)
  }
  const updateInfo = async () => {
    if (isLoading) return
    setIsLoading(true)

    const imageUrl = image && (await uploadImage(image))
    const newUserInfo = {
      name,
      username: user!.username,
      image: imageUrl || user?.image || defaultAvatar,
    }

    const res = await updateUserInfo(newUserInfo)
    if (res)
      setTimeout(() => {
        update({
          data: {
            session: { user: { ...user, ...newUserInfo, onboarding: true } },
          },
        })
        router.push(callbackUrl)
      }, 500)

    setIsLoading(false)
  }

  return (
    <>
      <Form>
        <Title>Giới thiệu</Title>
        <p>Hoàn thành thông tin cá nhân của bạn</p>
        <Avatar>
          <ImageUploader
            image={image || user?.image || '/images/icon.svg'}
            changeImage={changeImage}
          />
        </Avatar>
        <InputWrapper>
          <Input
            type="text"
            label="Tên"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={changeName}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            label="Mô tả"
            placeholder="Nhập mô tả về bạn"
            value={bio}
            onChange={changeBio}
          />
        </InputWrapper>
        <CenterBox>
          <Button disabled={!name} type="button" onClick={updateInfo}>
            {isLoading ? <Spin /> : 'Hoàn tất'}
          </Button>
        </CenterBox>
      </Form>
    </>
  )
}

const Title = styled.h2`
  font-size: 30px;
`
const Avatar = styled.div`
  margin: 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputWrapper = styled.div`
  margin-bottom: 24px;
`
const CenterBox = styled.div`
  text-align: center;
`
