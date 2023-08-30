'use client'

import Input from '@/app/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { styled } from 'styled-components'
import { signIn } from 'next-auth/react'
import Form from '@/app/components/ui/auth/Form'
import Title from '@/app/components/ui/auth/Title'
import Button from '@/app/components/ui/auth/Button'
import GoogleButton from '@/app/components/ui/auth/GoogleButton'
import { Divider, Spin, message } from 'antd'
import { useRouter } from 'next/navigation'

const callbackUrl = '/protected/general'
const signUpUrl = '/auth/sign-up'
const errorMessage = 'Tài khoản hoặc mật khẩu không chính xác'

export default function SignIn() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const signInWithCredentials = async () => {
    if (isLoading) return
    setIsLoading(true)

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (res?.error) {
      message.warning(errorMessage)
    } else {
      router.push(callbackUrl)
    }
  }
  const signInWithGoogle = async () => {
    if (isLoading) return
    setIsLoading(true)

    await signIn('google', {
      callbackUrl,
    })

    setIsLoading(false)
  }

  return (
    <Form>
      <Title>Đăng nhập</Title>
      <GoogleButton type="button" onClick={signInWithGoogle}>
        Đăng nhập với google
      </GoogleButton>
      <StyledDivider plain>Hoặc</StyledDivider>
      <InputWrapper>
        <Input
          type="text"
          label="Tài khoản"
          placeholder="Nhập tài khoản của bạn"
          value={username}
          onChange={changeUsername}
        />
      </InputWrapper>
      <Input
        type="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu của bạn"
        value={password}
        onChange={changePassword}
      />
      <Button type="button" onClick={signInWithCredentials}>
        {isLoading ? <Spin /> : 'Đăng nhập'}
      </Button>
      <SignUp>
        <p>Bạn chưa có tài khoản?</p>
        <StyledLink href={signUpUrl}>Đăng ký</StyledLink>
      </SignUp>
    </Form>
  )
}

const InputWrapper = styled.div`
  margin-bottom: 24px;
`
const StyledDivider = styled(Divider)`
  margin-bottom: 24px;

  &::before,
  &::after {
    background-color: #ddd;
  }
`
const StyledLink = styled(Link)`
  color: #00dbde;
  &:hover {
    color: #a64bf4;
  }
`
const SignUp = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
