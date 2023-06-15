import type { TType } from '../app/MainContainer'
import { NextApiResponse } from 'next'
import extractYTVideoId from './extractYTVideoId'
import ytdl from 'ytdl-core'
import contentDisposition from 'content-disposition'

const DownloadYoutube = async (url: string, type: TType, res: NextApiResponse) => {
	const mimeType = type === 'MP3' ? 'audio/mpeg' : 'video/mp4'
	const extension = type.toLowerCase()

	const videoId = extractYTVideoId(url)
	if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' })

	try {
		const videoMetaData = await ytdl.getBasicInfo(videoId)

		res.setHeader('content-type', mimeType)
		res.setHeader('Content-Disposition', `attachment; filename="${contentDisposition(videoMetaData.videoDetails.title)}.${extension}"`)

		// limit to 1 hour
		ytdl(videoId, {
			filter: type === 'MP3' ? 'audioonly' : 'videoandaudio',
			quality: type === 'MP3' ? 'highestaudio' : 'highestvideo',
		}).pipe(res)
	} catch (error) {
		console.error(error)
		res.status(500).json(error)
	}
}

export default DownloadYoutube
