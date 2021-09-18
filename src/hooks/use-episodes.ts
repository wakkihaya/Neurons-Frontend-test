import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LoadingStatus } from '~models/LoadingStatus'
import { EpisodeModel } from '~models/EpisodeModel'

// "<p>aaaaa aaaa </p>" -> "aaaaa aaaa"
const removeUnneedPTag = (sentence: string) => {
  const newSentence = sentence.replace('<p>', '').replace('</p>', '')
  return newSentence
}

export const useEpisodes = (
  setLoading: Dispatch<SetStateAction<LoadingStatus>>
) => {
  const [episodeInfo, setEpisodeInfo] = useState<EpisodeModel[]>()
  const [filteredEpisodeInfo, setFilteredEpisodeInfo] = useState<
    EpisodeModel[]
  >()

  useEffect(() => {
    const fetchEpisodeByApi = async () => {
      setLoading('LOADING')
      try {
        const res = await axios.get(
          'https://api.tvmaze.com/shows/143/episodes?specials=1'
        )
        const episodeDataList = res.data

        const formattedEpisodeDataList = episodeDataList.map((item: any) => {
          return {
            imageSrc: item['image']['medium'],
            name: item['name'], //TODO: link til tvmaze??
            description: removeUnneedPTag(item['summary']),
            season_episode: `${item['season']} / ${item['number']}`,
            airTime: item['airtime'],
          } as EpisodeModel
        })
        setEpisodeInfo(formattedEpisodeDataList)
      } catch (error) {
        console.error(error)
        return
      }
      setLoading('DONE')
    }
    fetchEpisodeByApi()
  }, [])

  const filterEpisode = (keyword: string) => {
    //Return filtered episode when its name or description includes keyword.
    if (!episodeInfo) return
    const filteredArray: EpisodeModel[] = episodeInfo.filter(
      (episode: EpisodeModel) => {
        return (
          episode.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          episode.description.toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1
        )
      }
    )
    setFilteredEpisodeInfo(filteredArray)
  }
  return { episodeInfo, filterEpisode, filteredEpisodeInfo }
}
