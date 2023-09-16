type Props = {
  videoId: string
}

export default function IframeVideoYoutube({ videoId }: Props) {
  return (
    <iframe
      style={{ width: "100%", height: "100%", minHeight: 250 }}
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
