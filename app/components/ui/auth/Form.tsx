'use client'

import { styled } from 'styled-components'

type Props = {
  children: React.ReactNode
}

export default function Form({ children }: Props) {
  return (
    <Wrapper>
      <Container>
        <StyledForm>{children}</StyledForm>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url('/images/background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 10px;
  padding: 55px;
`
const StyledForm = styled.form`
  width: 100%;
`
