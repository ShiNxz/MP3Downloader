import type { NextApiRequest, NextApiResponse } from 'next'
import { getInfo } from 'ytdl-core'

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
			const song = await getInfo(url)
			if (!song) return res.status(400).json({ error: 'Invalid YouTube URL' })

			const newSong = {
				title: song.videoDetails.title.slice(0, 50),
				thumbnail: song.videoDetails.thumbnails[0].url,
			}

			return res.status(200).json(newSong)
		}

		default:
			return res.status(401).end()
	}
}

export default handler
