'use client'

import styled from 'styled-components'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <StyledButton {...props}>
      <img src="/icons/google_icon.png" alt="gg icon" />
      Đăng nhập với Google
    </StyledButton>
  )
}

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 1.2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
  margin: 16px 0;
  border: none;
  color: #000;
  background-color: white;
  box-shadow: 0 0 4px #ddd;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  img {
    width: 32px;
    height: 32px;
    margin: 0 16px;
  }
`
