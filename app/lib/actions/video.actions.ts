import getYoutubeTranscript from "@/app/lib/utils/get-youtube-transcript"

export async function getTranscription(videoId: string) {
  return await getYoutubeTranscript(videoId)
}
