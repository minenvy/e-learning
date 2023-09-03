import styled from "styled-components"

type Props = {
  type: string
  label: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  type,
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <WrapInput>
      <Label>{label}</Label>
      <CustomInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FocusInput />
    </WrapInput>
  )
}

const WrapInput = styled.div`
  width: 100%;
  position: relative;
  border-bottom: 2px solid #d9d9d9;
`
const Label = styled.span`
  font-size: 14px;
  margin-left: 8px;
`
const CustomInput = styled.input`
  width: 100%;
  height: 45px;
  color: black;
  background-color: white;
  padding: 0 8px;

  &:focus + span::before {
    width: 100%;
  }
`
const FocusInput = styled.span`
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #7f7f7f;
    transition: all 0.4s;
  }
`
