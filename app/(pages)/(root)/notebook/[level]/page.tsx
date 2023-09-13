import FractionLayout from "@/app/components/shared/FractionLayout"
import WordLevel from "@/app/components/shared/notebook/WordLevel"
import WordList from "@/app/components/shared/notebook/WordList"

type Props = {
  params: {
    level: string
  }
}

export default async function Notebook({ params: { level } }: Props) {
  return (
    <FractionLayout
      ratio={2}
      bigPart={<WordList level={level} />}
      smallPart={<WordLevel level={level} />}
    />
  )
}
