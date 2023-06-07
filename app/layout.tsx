import { Rubik } from 'next/font/google'
import './globals.scss'
import '@kirklin/reset-css/kirklin.css'
import 'react-toastify/dist/ReactToastify.min.css'

const rubik = Rubik({ subsets: ['hebrew'] })

export const metadata = {
	title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
	description: process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='he'>
			<body className={rubik.className + '  bg-slate-200'}>
				<div className='h-screen flex flex-col justify-center items-center'>
					<main className='container'>{children}</main>
				</div>
			</body>
		</html>
	)
}

export default RootLayout
