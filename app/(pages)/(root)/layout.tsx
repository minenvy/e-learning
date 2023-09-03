"use client"

import Header from "@/app/components/shared/Header"
import Loading from "@/app/components/shared/Loading"
import Sidebar from "@/app/components/shared/Sidebar"
import { Suspense } from "react"
import { styled } from "styled-components"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Main>
        <Sidebar />
        <Content>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Content>
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
