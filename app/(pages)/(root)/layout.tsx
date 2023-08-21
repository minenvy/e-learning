import Header from '@/app/components/shared/header'

type Props = {
	children: React.ReactNode
}

function Layout({ children }: Props) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default Layout
