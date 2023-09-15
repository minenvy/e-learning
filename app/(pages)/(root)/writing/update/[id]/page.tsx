import WritingItem from "@/app/components/shared/writing/WritingItem"
import { getWriting } from "@/app/lib/actions/writing.actions"

type Props = {
  params: {
    id: string
  }
}

export default async function UpdateWriting({ params: { id } }: Props) {
  const writing = await getWriting(id)

  return <WritingItem writing={writing} />
}
