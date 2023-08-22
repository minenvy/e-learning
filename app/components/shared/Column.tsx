import styles from '@/app/styles/column.module.scss'

const parentHeight = 300

type Props = {
	order: number
	percent: number
	title: string
	backgroundColor: string
}

export default function Column({
	order,
	percent,
	title,
	backgroundColor,
}: Props) {
	const height = parentHeight * percent
	const marginTop = parentHeight - height

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.color_stick}
				style={{
					backgroundColor,
					height,
					marginTop,
				}}
			>
				<p className={styles.title}>{title}</p>
				<p className={styles.order}>{order}</p>
			</div>
		</div>
	)
}
