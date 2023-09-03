import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import FractionLayout from "@/app/components/shared/FractionLayout"
import Topic from "@/app/components/shared/word/Topic"
import FloatAddWordButton from "@/app/components/shared/word/FloatButton"

export default function Word() {
  return (
    <FractionLayout
      ratio={5}
      bigPart={
        <CenterAlignBox>
          <Topic />
        </CenterAlignBox>
      }
      smallPart={<FloatAddWordButton />}
    />
  )
}
