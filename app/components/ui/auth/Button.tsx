'use client'

import styled from 'styled-components'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <StyledButton {...props}></StyledButton>
}

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  line-height: 1.2;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin-top: 24px;
  border: none;
  border-radius: 24px;
  color: #fff;
  background: linear-gradient(to right, #00dbde, #fc00ff) left;
  background-size: 200%;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    background-position: right;
  }
`
