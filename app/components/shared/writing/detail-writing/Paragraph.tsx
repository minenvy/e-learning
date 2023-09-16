"use client"

import draftToHtml from "draftjs-to-html"

type Props = {
  content: string
}

export default function Paragraph({ content }: Props) {
  const paragraph = draftToHtml(JSON.parse(content))

  return <div dangerouslySetInnerHTML={{ __html: paragraph }}></div>
}
