"use client"

import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import dynamic from "next/dynamic"
import { useState } from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
)

export default function General() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const onEditorStateChange = (state: EditorState) => {
    setEditorState(state)
  }

  return (
    <div>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    </div>
  )
}
