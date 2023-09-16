import FractionLayout from "@/app/components/shared/FractionLayout"
import FloatAddVideoButton from "@/app/components/shared/video/FloatAddVideoButton"
import VideoList from "@/app/components/shared/video/VideoList"

export default function Video() {
  return (
    <main>
      <FractionLayout
        bigPart={<VideoList />}
        smallPart={<FloatAddVideoButton />}
        ratio={16}
      />
    </main>
  )
}
