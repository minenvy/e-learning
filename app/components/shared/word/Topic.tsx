"use client"

import topics from "@/app/data/topic.json"
import { Collapse, message } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import { textToLink } from "@/app/lib/utils/text-to-link"
import { styled } from "styled-components"
import SubList from "./SubList"
import Link from "next/link"
import Dictionary from "@/app/interfaces/dictionary"
import { useEffect } from "react"

const maxNewWord = 50
const basicWordText = "3000 basic words"
const basicWordCount = 3000
const basicWordType = "3000-words"
const basicWordLearnPageUrl = "/word/learn/3000-words/"
const wordUrl = "/word"
const generalUrl = "/general"
const warningMessage = "Bạn có nhiều từ mới. Hãy ôn tập trước khi học thêm từ"
const panelStyle: React.CSSProperties = {
  marginBottom: 24,
  background: "#f2f2f2",
  borderRadius: 8,
  border: "none",
}

type Props = {
  countLearnedWordEachTopic: Dictionary
  reviewCount: number
}

export default function Topic({
  countLearnedWordEachTopic,
  reviewCount,
}: Props) {
  const hasToReviewNow = reviewCount >= maxNewWord
  const basicWordLearnedCount =
    countLearnedWordEachTopic.find((topic) => topic.type === basicWordType)
      ?.count || 0

  useEffect(() => {
    if (hasToReviewNow) message.warning(warningMessage)
  }, [])

  const getItems = (panelStyle: React.CSSProperties) => {
    return topics.map(({ topic, subList }) => {
      const imgUrl = `/images/${textToLink(topic)}.svg`

      return {
        key: textToLink(topic),
        label: (
          <Label>
            <Img src={imgUrl} alt="icon" />
            {topic}
          </Label>
        ),
        children: (
          <SubList
            subList={subList}
            reviewCount={reviewCount}
            countLearnedWordEachTopic={countLearnedWordEachTopic}
          />
        ),
        style: panelStyle,
      }
    })
  }

  return (
    <Wrapper>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        expandIconPosition={"end"}
        style={{ background: "white" }}
        items={getItems(panelStyle)}
      />
      <Link
        href={
          hasToReviewNow
            ? generalUrl
            : basicWordLearnedCount < basicWordCount
            ? `${basicWordLearnPageUrl}${basicWordLearnedCount}`
            : wordUrl
        }
      >
        <Button>
          <Title>
            <Img src="/images/3000.png" alt="icon" />
            <span>{basicWordText}</span>
          </Title>
          <StyledSpan>
            {basicWordLearnedCount}/{basicWordCount}
          </StyledSpan>
        </Button>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .ant-collapse-header {
    align-items: center !important;
  }
`
const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
`
const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const Button = styled.button`
  width: 100%;
  height: 64px;
  color: black;
  background-color: #f2f2f2;
  border-radius: 8px;
  border: none;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  cursor: pointer;

  &:hover span {
    color: #69b1ff;
  }
`
const Title = styled.span`
  display: flex;
  align-items: center;
  gap: 16px;
`
const StyledSpan = styled.span`
  color: #999999;
`
