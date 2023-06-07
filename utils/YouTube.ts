import type { TType } from '../app/MainContainer'
import { NextApiResponse } from 'next'
import extractYTVideoId from './extractYTVideoId'
import ytdl from 'ytdl-core'

const DownloadYoutube = async (url: string, type: TType, res: NextApiResponse) => {
	const mimeType = type === 'MP3' ? 'audio/mpeg' : 'video/mp4'
	const extension = type.toLowerCase()

	const videoId = extractYTVideoId(url)
	if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' })

	try {
		const videoMetaData = await ytdl.getBasicInfo(videoId)

		res.setHeader('content-type', mimeType)
		res.setHeader('Content-Disposition', `attachment; filename="${videoMetaData.videoDetails.title}.${extension}"`)

		// limit to 1 hour
		ytdl(videoId, {
			filter: type === 'MP3' ? 'audioonly' : 'videoandaudio',
		}).pipe(res)
	} catch (error) {
		res.status(500).json(error)
	}
}

export default DownloadYoutube
