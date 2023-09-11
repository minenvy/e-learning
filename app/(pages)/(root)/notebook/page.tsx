import FractionLayout from "@/app/components/shared/FractionLayout"
import WordLevel from "@/app/components/shared/notebook/WordLevel"
import WordList from "@/app/components/shared/notebook/WordList"

export default async function Notebook() {
  return (
    <FractionLayout
      ratio={2}
      bigPart={<WordList />}
      smallPart={<WordLevel />}
    />
  )
}
