import MainContainer from './MainContainer'
import { ToastContainer } from 'react-toastify'

const Home = () => {
	return (
		<>
			<ToastContainer
				rtl
				closeButton
				closeOnClick
				autoClose={3000}
				position='top-right'
			/>
			<div className='absolute left-52 top-4 h-4/5 w-4/5 blur-[120px] opacity-[0.30] bg-gradient-to-r rounded-full from-sky-500 to-blue-500 -z-10' />
			<MainContainer />
		</>
	)
}

export default Home
