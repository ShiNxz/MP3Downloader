import { Input, Loader } from '@mantine/core'
import { FaLink, FaYoutube, FaTiktok } from 'react-icons/fa'
import { isTiktokLink, isYouTubeLink } from '@/utils/Links'

const UrlInput = ({ value, onChange, isLoading }: IProps) => {
	const icon = isTiktokLink(value) ? <FaTiktok /> : isYouTubeLink(value) ? <FaYoutube /> : <FaLink />

	return (
		<Input
			icon={icon}
			rightSection={
				isLoading && (
					<Loader
						color='gray'
						size='xs'
					/>
				)
			}
			title='קישור לשיר/סרטון'
			placeholder='קישור לשיר/סרטון'
			value={value}
			onChange={(e) => onChange(e.currentTarget.value)}
			error={false}
			readOnly={isLoading}
		/>
	)
}

interface IProps {
	value: string
	onChange: (value: string) => void
	isLoading: boolean
}

export default UrlInput
