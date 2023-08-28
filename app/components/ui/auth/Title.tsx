'use client'

import styled from 'styled-components'

type Props = {
	children: React.ReactNode
}

export default function Title({ children }: Props) {
	return <StyledTitle>{children}</StyledTitle>
}

const StyledTitle = styled.p`
	font-size: 39px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 24px;
`
