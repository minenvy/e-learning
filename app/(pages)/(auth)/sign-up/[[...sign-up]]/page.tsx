import { SignUp } from "@clerk/nextjs"
import styles from "@/app/styles/auth.module.scss"

const generalUrl = "/general"

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <SignUp afterSignUpUrl={generalUrl} />
    </div>
  )
}
