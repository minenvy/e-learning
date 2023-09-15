"use client"

import { Collapse } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import { textToLink } from "@/app/lib/utils/text-to-link"
import { styled } from "styled-components"
import { getSubListFromTitle } from "@/app/lib/utils/get-sublist-from-title"
import Link from "next/link"
import Dictionary from "@/app/interfaces/dictionary"
import dictionary from "@/app/data/dictionary.json"

const wordUrl = "/word"
const generalUrl = "/general"
const maxNewWord = 50
const panelStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  border: "none",
}

type Props = {
  subList: string[]
  reviewCount: number
  countLearnedWordEachTopic: Dictionary
}

export default function SubList({
  subList,
  countLearnedWordEachTopic,
  reviewCount,
}: Props) {
  const hasToReviewNow = reviewCount >= maxNewWord

  const getItems = (panelStyle: React.CSSProperties) => {
    return subList.map((subTitle) => {
      const childTopic = getSubListFromTitle(subTitle)

      return {
        key: textToLink(childTopic.main),
        label: childTopic.main,
        children: (
          <>
            {childTopic.sub.map((subListTitle) => {
              const link = textToLink(subListTitle)
              const count =
                countLearnedWordEachTopic.find((topic) => topic.type === link)
                  ?.count || 0
              const maxCount =
                dictionary.find((topic) => topic.type === link)?.count || 0

              return (
                <StyledLink
                  href={
                    hasToReviewNow
                      ? generalUrl
                      : count < maxCount
                      ? `/word/learn/${link}/${count}`
                      : wordUrl
                  }
                  key={subListTitle}
                >
                  <span>* {subListTitle}</span>
                  <StyledSpan>
                    {count}/{maxCount}
                  </StyledSpan>
                </StyledLink>
              )
            })}
          </>
        ),
        style: panelStyle,
      }
    })
  }

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition={"end"}
      style={{ background: "white" }}
      items={getItems(panelStyle)}
    />
  )
}

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;

  &:hover span {
    color: #69b1ff;
  }
`
const StyledSpan = styled.span`
  color: #999999;
`
