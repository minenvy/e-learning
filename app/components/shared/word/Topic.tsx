"use client"

import topics from "@/app/data/topic.json"
import { Collapse } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"
import { textToLink } from "@/app/lib/utils/text-to-link"
import { styled } from "styled-components"
import SubList from "./SubList"

const panelStyle: React.CSSProperties = {
  marginBottom: 24,
  background: "#f2f2f2",
  borderRadius: 8,
  border: "none",
}

export default function Topic() {
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
        children: <SubList subList={subList} />,
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
      <Button>
        <Img src="/images/3000.png" alt="icon" />
        <span>3000 basic words</span>
      </Button>
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
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  cursor: pointer;
`
