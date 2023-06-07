import type { NextApiRequest, NextApiResponse } from 'next'
import type { TType } from '@/app/MainContainer'
import DownloadYoutube from '@/utils/YouTube'
import DownloadTiktok from '@/utils/Tiktok'

export const config = {
	api: {
		responseLimit: false,
	},
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { url, type } = req.query as { url: string; type: TType }

			const isTiktokLink = (url: string) => url.includes('tiktok.com')
			const isYouTubeLink = (url: string) => url.includes('youtube.com') || url.includes('youtu.be')

			if (isYouTubeLink(url)) return await DownloadYoutube(url, type, res)
			else if (isTiktokLink(url)) return await DownloadTiktok(url, res)
			else return res.status(400).json({ error: 'Unsupported URL' })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
