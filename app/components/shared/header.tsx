import styles from '@/app/styles/header.module.scss'

function Header() {
	return (
		<header className={styles.wrapper}>
			<div>
				<img src="/images/icon.svg" alt="icon" className={styles.round_image} />
				<p>E-Learning</p>
			</div>
			<div>
				<p>Jethro</p>
				<img src="/images/icon.svg" alt="avatar" />
			</div>
		</header>
	)
}

export default Header
