import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import Word from "@/app/components/shared/notebook/Word"

export default function WordList() {
  const data = [
    {
      id: "a",
      enWord: "banana",
      type: "n",
      vieWord: "qua chuoi",
    },
    {
      id: "b",
      enWord: "banana",
      type: "n",
      vieWord: "qua chuoi",
    },
  ]
  return (
    <CenterAlignBox>
      {data.map((word) => {
        return <Word {...word} key={word.id} />
      })}
    </CenterAlignBox>
  )
}
