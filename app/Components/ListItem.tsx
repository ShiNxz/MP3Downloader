import { Button } from '@mantine/core'
import type { IList, TiktokFile } from '../MainContainer'
import download from 'downloadjs'
import { toast } from 'react-toastify'

const ListItem = ({ type, site, file, title, image }: IList) => {
	//
	const handleDownload = async (downloadType: DownloadType) => {
		const MimeType = type === 'MP3' ? 'audio/mpeg' : 'video/mp4'
		const extension = type.toLowerCase()

		switch (downloadType) {
			case 'YT':
				download(file as Blob, `${title}.${extension}`, MimeType)
				break

			case 'TiktokMusic':
				const newFile = file as TiktokFile
				try {
					const response = await fetch(newFile.music)
					const blob = await response.blob()
					download(blob, `${title}.mp3`, MimeType)
				} catch (error) {
					toast.error('Failed to download file')
				}
				break

			case 'TiktokVideoWaterMark':
				const newFile2 = file as TiktokFile
				download(newFile2.watermark, `${title}.mp4`, 'video/mp4')
				break

			case 'TiktokVideoNoWaterMark':
				const newFile3 = file as TiktokFile
				download(newFile3.withoutWatermark, `${title}.mp4`, 'video/mp4')
				break

			case 'TiktokHD':
				const newFile4 = file as TiktokFile
				download(newFile4.hd, `${title}.mp4`, 'video/mp4')
				break
		}

		toast.success('הורדה התחילה')
	}

	return (
		<div className='flex flex-row items-center justify-between'>
			<div className='flex flex-row gap-2 items-center'>
				<img
					src={image}
					width={48}
					height={48}
					className='w-12 h-12 rounded-md object-cover'
				/>
				{title}
			</div>

			<div className='flex flex-row gap-1'>
				{site === 'YouTube' ? (
					<Button
						size='xs'
						onClick={() => handleDownload('YT')}
					>
						הורדת {type}
					</Button>
				) : (
					<>
						{(file as TiktokFile).music && (
							<Button
								size='xs'
								onClick={() => handleDownload('TiktokMusic')}
							>
								הורדת שיר
							</Button>
						)}
						{(file as TiktokFile).watermark && (
							<Button
								size='xs'
								onClick={() => handleDownload('TiktokVideoWaterMark')}
							>
								הורדת וידאו
							</Button>
						)}
						{(file as TiktokFile).withoutWatermark && (
							<Button
								size='xs'
								onClick={() => handleDownload('TiktokVideoNoWaterMark')}
							>
								ללא Watermark
							</Button>
						)}
						{(file as TiktokFile).hd && (
							<Button
								size='xs'
								onClick={() => handleDownload('TiktokHD')}
							>
								HD
							</Button>
						)}
					</>
				)}
			</div>
		</div>
	)
}

type DownloadType = 'YT' | 'TiktokMusic' | 'TiktokVideoWaterMark' | 'TiktokVideoNoWaterMark' | 'TiktokHD'

export default ListItem
