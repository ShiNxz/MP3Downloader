import { BsInfoCircle } from 'react-icons/bs'
import { ActionIcon, Tooltip } from '@mantine/core'

const Information = () => (
	<Tooltip
		label={
			<div>
				יש להדביק את הקישור של השיר מיוטיוב או מהטיקטוק, ניתן להוריד שירים וסרטונים
				<br />
				במידה ואתם רוצים להוריד סאונד מהטיקטוק יש להדביק סרטון שכולל את הסאונד
				<br />
				האתר כולל תמיכה בפלייליסטים של יוטיוב
			</div>
		}
		color='lime'
	>
		<ActionIcon>
			<BsInfoCircle />
		</ActionIcon>
	</Tooltip>
)

export default Information
