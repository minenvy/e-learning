import TinyBox from "@/app/components/ui/TinyBox"
import MediumBox from "@/app/components/ui/MediumBox"

export default function Achievement() {
  return (
    <>
      <div style={false ? { filter: "grayscale(1)" } : {}}>
        <TinyBox
          icon="/images/achievement_word.png"
          title="So tay"
          description="Ban da hoc lien tuc 7 ngay"
        />
      </div>
      <MediumBox
        icon="/images/achievement_word.png"
        title="So tay"
        description="Ban da hoc lien tuc 7 ngay"
      />
    </>
  )
}
