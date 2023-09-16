export function getDividedTranscript(transcript: string, words: string[]) {
  const result: string[] = []
  let tmpText = ""
  const parts = transcript.split(" ")

  parts.forEach((part) => {
    if (words.includes(part)) {
      if (tmpText) {
        result.push(tmpText)
        tmpText = ""
      }
      result.push(part)
    } else {
      tmpText += `${part} `
    }
  })

  if (tmpText) result.push(tmpText)
  return result
}
