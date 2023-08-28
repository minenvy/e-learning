'use client'

import Input from '@/app/components/ui/Input'
import Link from 'next/link'
import { useState } from 'react'
import { styled } from 'styled-components'
import Form from '@/app/components/ui/auth/Form'
import Title from '@/app/components/ui/auth/Title'
import Button from '@/app/components/ui/auth/Button'
import { signUpUser } from '@/app/services/signup'
import { Spin, message } from 'antd'
import { useRouter } from 'next/navigation'

const callbackUrl = '/auth/sign-in'
const warningMessage = 'Tài khoản đã tồn tại'

export default function SignUp() {
	const router = useRouter()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value)
	}
	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value)
	}
	const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value)
	}
	const signUp = async () => {
		if (isLoading) return

		setIsLoading(true)

		const res = await signUpUser({
			username,
			password,
		})
		if (!res.ok) {
			message.warning(warningMessage)
		} else {
			const data = await res.json()
			message.success(data?.message)
			setTimeout(() => router.push(callbackUrl), 500)
		}

		setIsLoading(false)
	}

	return (
		<Form>
			<Title>Đăng ký</Title>
			<InputWrapper>
				<Input
					type="text"
					label="Tài khoản"
					placeholder="Nhập tài khoản của bạn"
					value={username}
					onChange={changeUsername}
				/>
			</InputWrapper>
			<InputWrapper>
				<Input
					type="password"
					label="Mật khẩu"
					placeholder="Nhập mật khẩu của bạn"
					value={password}
					onChange={changePassword}
				/>
			</InputWrapper>
			<Input
				type="password"
				label="Xác nhận mật khẩu"
				placeholder="Nhập lại mật khẩu của bạn"
				value={confirmPassword}
				onChange={changeConfirmPassword}
			/>
			<Button type="button" onClick={signUp}>
				{isLoading ? <Spin /> : 'Đăng ký'}
			</Button>
			<SignIn>
				<p>Bạn đã có tài khoản?</p>
				<StyledLink href={callbackUrl}>Đăng nhập</StyledLink>
			</SignIn>
		</Form>
	)
}

const InputWrapper = styled.div`
	margin-bottom: 24px;
`
const StyledLink = styled(Link)`
	color: #00dbde;
	&:hover {
		color: #a64bf4;
	}
`
const SignIn = styled.div`
	margin-top: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
`
