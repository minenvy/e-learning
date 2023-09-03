"use client"

import { Collapse } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import { textToLink } from "@/app/lib/utils/text-to-link"
import { styled } from "styled-components"
import { getSubListFromTitle } from "@/app/lib/utils/get-sublist-from-title"
import Link from "next/link"

const panelStyle: React.CSSProperties = {
  backgroundColor: "#f2f2f2",
  border: "none",
}

type Props = {
  subList: string[]
}

export default function SubList({ subList }: Props) {
  const getItems = (panelStyle: React.CSSProperties) => {
    return subList.map((subTitle) => {
      const childTopic = getSubListFromTitle(subTitle)

      return {
        key: textToLink(childTopic.main),
        label: childTopic.main,
        children: (
          <>
            {childTopic.sub.map((subListTitle) => {
              return (
                <StyledLink href="" key={subListTitle}>
                  <span>* {subListTitle}</span>
                  <StyledSpan>0/100</StyledSpan>
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
`
const StyledSpan = styled.span`
  color: #999999;
`
