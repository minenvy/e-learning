import Column from '@/app/components/shared/Column'
import styles from '@/app/styles/general.module.scss'
import Button from '@/app/components/ui/Button'
import Link from 'next/link'

export default function WordChart() {
	const data = [20, 30, 25, 55, 15]
	const max = Math.max(...data)

	return (
		<>
			<div className={styles.chart}>
				{data.map((numberOfWord, id) => {
					return (
						<Column
							key={id}
							order={id + 1}
							percent={numberOfWord / max}
							title={`${numberOfWord} từ`}
							backgroundColor="red"
						/>
					)
				})}
			</div>
			<div className={styles.divider} />
			<div className={styles.btn_dashboard}>
				<p>{`Chuẩn bị ôn tập: ${data[0]} từ`}</p>
				<Button>
					<Link href="/review">Ôn tập ngay</Link>
				</Button>
			</div>
		</>
	)
}
