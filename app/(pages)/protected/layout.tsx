'use client'

import Header from '@/app/components/shared/Header'
import Sidebar from '@/app/components/shared/Sidebar'
import { styled } from 'styled-components'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const onboardingUrl = '/auth/onboarding'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()
  console.log(session?.user)

  if (session?.user && !session.user.onboarding)
    return redirect(onboardingUrl)

  return (
    <>
      <Header />
      <Main>
        <Sidebar />
        <Content>{children}</Content>
      </Main>
    </>
  )
}

const Main = styled.div`
  display: flex;
  gap: 36px;
`
const Content = styled.div`
  flex: 5;
`
