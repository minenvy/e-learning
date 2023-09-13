"use client"

import styled from "styled-components"

type Props = {
  percent: number
  children: React.ReactNode
}

export default function ProgressBar({ percent, children }: Props) {
  return (
    <ProgressBox>
      <ProgressBoundary>
        <Progress style={{ width: `${percent}%` }} />
      </ProgressBoundary>
      {children}
    </ProgressBox>
  )
}

const ProgressBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`
const ProgressBoundary = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 16px;
  background-color: #e0e0e0;
`
const Progress = styled.div`
  height: 20px;
  border-radius: 16px;
  background-color: #27ac38;
`
