import { getWriting } from "@/app/lib/actions/writing.actions"
import styles from "@/app/styles/detail-writing.module.scss"
import Close from "@/app/components/shared/writing/detail-writing/Close"
import Paragraph from "@/app/components/shared/writing/detail-writing/Paragraph"
import Link from "next/link"
import Sound from "@/app/components/shared/writing/detail-writing/Sound"

const updateUrl = "/writing/update/"

type Props = {
  params: {
    id: string
  }
}

export default async function DetailWriting({ params: { id } }: Props) {
  const writing = await getWriting(id)

  return (
    <div className={styles.wrapper}>
      <div className={styles.exit_btn}>
        <Close />
      </div>
      <div className={styles.header}>
        <div className={styles.meta_data}>
          <img src={writing.image} alt="image" />
          <h2>{writing.title}</h2>
        </div>
        <div className={styles.function_btns}>
          <Sound content={writing.content} />
          <Link href={`${updateUrl}${writing?.id}`}>
            <img src="/images/update.svg" alt="icon" />
          </Link>
        </div>
      </div>
      <Paragraph content={writing.content} />
    </div>
  )
}
