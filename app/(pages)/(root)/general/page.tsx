import Achievement from "@/app/components/shared/general/Achievement"
import CenterAlignBox from "@/app/components/ui/CenterAlignBox"
import FractionLayout from "@/app/components/shared/FractionLayout"
import WordChart from "@/app/components/shared/general/WordChart"
import styles from "@/app/styles/general.module.scss"

export default function General() {
  return (
    <FractionLayout
      ratio={2}
      bigPart={
        <div className={styles.boundary}>
          <CenterAlignBox>
            <WordChart />
          </CenterAlignBox>
        </div>
      }
      smallPart={<Achievement />}
    />
  )
}
