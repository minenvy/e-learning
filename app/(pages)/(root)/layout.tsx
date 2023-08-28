'use client'

import Header from '@/app/components/shared/Header'
import Sidebar from '@/app/components/shared/Sidebar'
import { styled } from 'styled-components'

type Props = {
	children: React.ReactNode
}

export default function Layout({ children }: Props) {
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
