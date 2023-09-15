"use client"

import FractionLayout from "@/app/components/shared/FractionLayout"
import FloatAddWritingButton from "@/app/components/shared/writing/FloatAddWritingButton"
import WritingList from "@/app/components/shared/writing/WritingList"
import useDebounce from "@/app/hooks/use-debounce"
import { Input } from "antd"
import { styled } from "styled-components"

const searchWidth = 300

export default function Writing() {
  const { previousValue, value, onChange } = useDebounce("")

  const changeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <main>
      <FractionLayout
        bigPart={
          <div>
            <InputBox>
              <Input.Search
                value={previousValue}
                placeholder="Tìm kiếm tên bài viết..."
                style={{ width: searchWidth }}
                onChange={changeSearchKey}
              />
            </InputBox>
            <WritingList filter={value.toString()} />
          </div>
        }
        smallPart={<FloatAddWritingButton />}
        ratio={16}
      />
    </main>
  )
}

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
