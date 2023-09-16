import FractionLayout from "@/app/components/shared/FractionLayout"
import FloatAddWritingButton from "@/app/components/shared/writing/FloatAddWritingButton"
import WritingList from "@/app/components/shared/writing/WritingList"

export default function Writing() {
  return (
    <main>
      <FractionLayout
        bigPart={<WritingList />}
        smallPart={<FloatAddWritingButton />}
        ratio={16}
      />
    </main>
  )
}
