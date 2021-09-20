import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LoadingStatus } from '~models/LoadingStatus'
import { EpisodeModel } from '~models/EpisodeModel'
import { CheckboxModel } from '~models/CheckboxModel'

// "<p>aaaaa aaaa </p>" -> "aaaaa aaaa"
const removeUnneedPTag = (sentence: string) => {
  const newSentence = sentence.replace('<p>', '').replace('</p>', '')
  return newSentence
}

export const useEpisodes = (
  setLoading: Dispatch<SetStateAction<LoadingStatus>>
) => {
  const [episodeInfo, setEpisodeInfo] = useState<EpisodeModel[]>()

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
            name: item['name'] ?? 'None',
            description: removeUnneedPTag(item['summary']) ?? 'None',
            season: item['season'] ?? '0',
            episode: item['number'] ?? '0',
            airTime: item['airtime'] ?? 'None',
            url: item['url'],
          } as EpisodeModel
        })
        if (!formattedEpisodeDataList) return
        setEpisodeInfo(formattedEpisodeDataList)
      } catch (error) {
        console.error(error)
        return
      }
      setLoading('DONE')
    }
    fetchEpisodeByApi()
  }, [])

  const searchEpisode = (
    keyword: string,
    targetEpisodeInfo: EpisodeModel[] | undefined
  ) => {
    //Return filtered episode when its name or description includes keyword.
    if (!targetEpisodeInfo) return
    const searchedArray: EpisodeModel[] = targetEpisodeInfo.filter(
      (episode: EpisodeModel) => {
        return (
          episode.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          episode.description.toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1
        )
      }
    )
    return searchedArray
  }

  //Return filtered episodes by airtaime. For Filtering feature.
  const filterEpisodeByAirtime = (
    targetAirtime: string[],
    targetEpisodeInfo: EpisodeModel[] | undefined
  ) => {
    if (!targetEpisodeInfo) return
    const filteredArray: EpisodeModel[] = targetEpisodeInfo.filter(
      (episode: EpisodeModel) => {
        return targetAirtime.indexOf(episode.airTime) !== -1
      }
    )
    return filteredArray
  }

  const storeFilteredAirtimesChecksToLocalStorage = (
    checkItems: CheckboxModel[]
  ) => {
    window.localStorage.setItem(
      'filteredAirtimesChecks',
      JSON.stringify(checkItems)
    )
  }

  const getFilteredAirtimesChecksFromLocalStorage = () => {
    const rawData = window.localStorage.getItem('filteredAirtimesChecks')
    if (rawData === null) return
    return JSON.parse(rawData) as CheckboxModel[]
  }

  return {
    episodeInfo,
    searchEpisode,
    filterEpisodeByAirtime,
    storeFilteredAirtimesChecksToLocalStorage,
    getFilteredAirtimesChecksFromLocalStorage,
  }
}
