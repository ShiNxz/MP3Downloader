'use client'

import { useState } from 'react'
import Information from './Components/Info'
import UrlInput from './Components/UrlInput'
import Type from './Components/Type'
import axios from 'axios'
import { toast } from 'react-toastify'
import ListItem from './Components/ListItem'
import { isTiktokLink, isYouTubeLink } from '@/utils/Links'

const MainContainer = () => {
	const [value, setValue] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [type, setType] = useState<TType>('MP3')

	const [list, setList] = useState<IList[]>([])

	const handleSubmit = async ({
		url,
		type,
		image,
		title,
	}: {
		url: string
		type: TType
		title: string
		image: string
	}) => {
		const MimeType = type === 'MP3' ? 'audio/mpeg' : 'video/mp4'

		try {
			const response = await axios.get(`/api/download?url=${url}&type=${type}`, {
				responseType: isTiktokLink(url) ? 'json' : 'arraybuffer',
			})

			if (isTiktokLink(url)) {
				setList((prev) => [
					...prev,
					{
						id: new Date().getMilliseconds().toString(),
						link: url,
						type,
						site: 'Tiktok',
						file: response.data,
						title: response.data.title,
						image: response.data.image,
					},
				])
			} else {
				const blob = new Blob([response.data], { type: MimeType })
				setList((prev) => [
					...prev,
					{
						id: new Date().getMilliseconds().toString(),
						link: url,
						site: 'YouTube',
						type,
						file: blob,
						title,
						image,
					},
				])
			}

			toast.success('ההורדה התחילה')
		} catch (error) {
			toast.error('חלה שגיאה!')
		}

		setValue('')
	}

	const handleUrlChange = async (url: string) => {
		setValue(url)

		if (isTiktokLink(url) || isYouTubeLink(url)) {
			setIsLoading(true)

			// get all the playlist songs and parse them one by one
			if (url.includes('list')) {
				const response = await axios.get(`/api/playlist?url=${extractPlaylistId(url)}`)
				const songs = response.data
				if (!songs || songs.lenth > 0) return toast.error('חלה שגיאה!')
				for (const song of songs) {
					await handleSubmit({ url: song.url, type, image: song.thumbnail, title: song.title })
				}
			} else {
				if (isTiktokLink(url)) await handleSubmit({ url, type, title: '', image: '' })
				else {
					const response = await axios.get(`/api/song?url=${url}`)
					const song = response.data
					if (!song) return toast.error('חלה שגיאה!')

					await handleSubmit({ url, type, title: song.title, image: song.thumbnail })
				}
			}

			setIsLoading(false)
		}
	}

	return (
		<>
			<div className='flex flex-col bg-white shadow-lg shadow-slate-800/10 rounded-lg p-4 w-full'>
				<div className='flex flex-row justify-between items-center mb-4'>
					<span className='font-semibold text-lg'>{process.env.NEXT_PUBLIC_WEBSITE_SHORT_DESCRIPTION}</span>
					<Information />
				</div>
				<div className='flex flex-col gap-3'>
					<UrlInput
						value={value}
						onChange={handleUrlChange}
						isLoading={isLoading}
					/>
					<Type
						value={type}
						setValue={setType}
						isLoading={isLoading}
					/>
				</div>
				{list.length > 0 && (
					<>
						<div className='bg-gray-200 rounded-lg h-0.5 w-full my-4' />
						<span className='font-medium mb-2 text-sm'>הורדות</span>
						<div className='flex flex-col gap-2'>
							{list.map((item) => (
								<ListItem
									key={item.id}
									{...item}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</>
	)
}

export interface IList {
	id: string
	title: string
	image: string
	link: string
	type: TType
	site: TSite
	file: Blob | TiktokFile
}

export interface TiktokFile {
	title: string
	watermark: string
	withoutWatermark: string
	music: string
	hd: string
	image: string
}

export type TSite = 'Tiktok' | 'YouTube'
export type TType = 'MP3' | 'MP4'

export default MainContainer

// extract the youtube video playlist id
const extractPlaylistId = (url: string) => {
	var reg = new RegExp('[&?]list=([a-z0-9_]+)', 'i')
	var match = reg.exec(url)

	if (match && match[1].length > 0) {
		return match[1]
	} else {
		return 'nope'
	}
}
