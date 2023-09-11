"use client"

import { styled } from "styled-components"

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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  width: 500px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 25px;
`
const StyledForm = styled.form`
  width: 100%;
`
