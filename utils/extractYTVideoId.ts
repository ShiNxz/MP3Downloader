const extractYTVideoId = (url: string) => {
	let videoId = ''

	if (url.includes('youtube.com')) {
		const match = url.match(/[?&]v=([^&#]+)/)
		if (match) {
			videoId = match[1]
		}
	} else if (url.includes('youtu.be')) {
		const match = url.match(/youtu.be\/([^&#]+)/)
		if (match) {
			videoId = match[1]
		}
	}

	return videoId
}

export default extractYTVideoId
