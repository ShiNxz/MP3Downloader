import type { TType } from '../MainContainer'
import { Button } from '@mantine/core'

const Type = ({ value, setValue, isLoading }: IProps) => {
	return (
		<Button.Group dir='ltr'>
			{TYPES.map((type) => (
				<Button
					key={type}
					variant={value === type ? 'filled' : 'outline'}
					size='xs'
					id={type}
					onClick={() => setValue(type)}
				>
					{type}
				</Button>
			))}
		</Button.Group>
	)
}

const TYPES: TType[] = ['MP3', 'MP4']

interface IProps {
	value: TType
	setValue: (newValue: TType) => void
	isLoading: boolean
}

export default Type
