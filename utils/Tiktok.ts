import type { NextApiResponse } from 'next'
import axios from 'axios'

const DownloadTiktok = async (url: string, res: NextApiResponse) => {
	try {
		let domain = 'https://www.tikwm.com'
		let response = await axios.post(
			domain + '/api/',
			{},
			{
				headers: {
					'accept': 'application/json, text/javascript, */*; q=0.01',
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					// 'cookie': 'current_language=en; _ga=GA1.1.115940210.1660795490; _gcl_au=1.1.669324151.1660795490; _ga_5370HT04Z3=GS1.1.1660795489.1.1.1660795513.0.0.0',
					'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
					'user-agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
				},
				params: {
					url,
					count: 12,
					cursor: 0,
					web: 1,
					hd: 1,
				},
			}
		)

		const ResData = response.data as TiktokResponse

		if (ResData.msg !== 'success') return res.status(400).json({ error: 'Unsupported URL' })

		console.log(response.data.data)

		return res.status(200).json({
			title: ResData.data.title.slice(0, 50),
			image: domain + ResData.data.cover,
			withoutWatermark: domain + ResData.data.play,
			watermark: domain + ResData.data.wmplay,
			hd: domain + ResData.data.hdplay,
			music: domain + ResData.data.music,
		})
	} catch (error) {
		console.log(error)
		return res.status(500).json(error)
	}
}

export default DownloadTiktok

export interface TiktokResponse {
	code: number
	msg: string
	processed_time: number
	data: {
		id: string
		region: string
		title: string
		cover: string
		duration: number
		play: string
		wmplay: string
		hdplay: string
		size: number
		wm_size: number
		hd_size: number
		music: string
		music_info: {
			id: string
			title: string
			play: string
			author: string
			original: boolean
			duration: number
			album: string
		}
		play_count: number
		digg_count: number
		comment_count: number
		share_count: number
		download_count: number
		create_time: number
		author: {
			id: string
			unique_id: string
			nickname: string
			avatar: string
		}
	}
}
