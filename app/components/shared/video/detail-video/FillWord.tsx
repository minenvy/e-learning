import Button from "@/app/components/ui/Button"
import { Input } from "antd"
import { Fragment, useState } from "react"
import styled from "styled-components"

type Props = {
  words: string[]
  paragraphParts: string[]
  onCheck: () => void
}

export default function FillWord({ words, paragraphParts, onCheck }: Props) {
  const [result, setResult] = useState<{
    [key: string]: string
  }>({})
  const [isChecked, setIsChecked] = useState(false)

  const changeResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResult((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      }
    })
  }
  const check = () => {
    onCheck()
    setIsChecked(true)
  }

  return (
    <div>
      <Wrapper>
        {paragraphParts.map((part, index) => {
          const isNeedFill = words.includes(part)
          const name = `${part}-${index}`
          return (
            <Fragment key={index}>
              {isNeedFill ? (
                <>
                  &nbsp;
                  <Input
                    value={result[name]}
                    onChange={changeResult}
                    style={{
                      width: 8 * part.length + 22,
                      color: isChecked
                        ? result[name] === part
                          ? "#00c400"
                          : "red"
                        : "black",
                    }}
                    name={name}
                  />
                  &nbsp;
                </>
              ) : (
                <span>{part}</span>
              )}
            </Fragment>
          )
        })}
      </Wrapper>
      {!isChecked && (
        <ButtonBoundary>
          <Button onClick={check}>Kiểm tra</Button>
        </ButtonBoundary>
      )}
    </div>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-height: 40vh;
  overflow: auto;
  margin: 20px 0;
  line-height: 2.5;
`
const ButtonBoundary = styled.div`
  margin: 16px 0;
  text-align: center;
`
