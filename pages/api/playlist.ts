import type { NextApiRequest, NextApiResponse } from 'next'
import ytpl from 'ytpl'

export const config = {
	api: {
		responseLimit: false,
	},
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { url } = req.query as { url: string }
			const playlist = await ytpl(url)
			if (!playlist) return res.status(400).json({ error: 'Invalid YouTube URL' })

			const items = playlist.items
				.filter((item) => item && item.durationSec && item.durationSec < 7200)
				.map((item) => ({
					title: item.title.slice(0, 50),
					url: item.shortUrl,
					thumbnail: item.bestThumbnail.url,
				}))

			return res.status(200).json(items)
		}

		default:
			return res.status(401).end()
	}
}

export default handler
