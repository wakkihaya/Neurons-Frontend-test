import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LoadingStatus } from '~models/LoadingStatus'
import { CastModel } from '~models/CastModel'

//Param: {birthday: '1982-03-10'} Return: string(e.g. '23')
const calculateAge = (birthday: string) => {
  if (birthday === 'None') return
  const today = new Date()
  const birthDate = new Date(birthday)
  var currentAge = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    currentAge--
  }
  return currentAge.toString()
}

export const useCast = (
  setLoading: Dispatch<SetStateAction<LoadingStatus>>
) => {
  const [castInfo, setCastInfo] = useState<CastModel[]>()

  useEffect(() => {
    const fetchCastByApi = async () => {
      setLoading('LOADING')
      try {
        const res = await axios.get(
          'https://api.tvmaze.com/shows/143?embed=cast'
        )
        const resData = res.data

        const castDataList = resData['_embedded']['cast']

        const formattedCastDataList = castDataList.map((item: any) => {
          const birthday = item['person']['birthday'] ?? 'None'
          return {
            name: item['person']['name'] ?? 'None',
            profileLink: item['person']['url'],
            age: calculateAge(birthday) ?? 'None',
            country: item['person']['country']['name'] ?? 'None',
            birthday: birthday ?? 'None',
            character: item['character']['name'] ?? 'None',
            charLink: item['character']['url'],
            imageSrc: item['person']['image']['medium'],
          } as CastModel
        })
        if (!formattedCastDataList) return
        setCastInfo(formattedCastDataList)
      } catch (error) {
        console.error(error)
        return
      }
      setLoading('DONE')
    }
    fetchCastByApi()
  }, [])

  //Return filtered members whose name or character includes keyword.
  const searchCast = (
    keyword: string,
    targetCastInfo: CastModel[] | undefined
  ) => {
    if (!targetCastInfo) return
    const searchedArray: CastModel[] = targetCastInfo.filter(
      (member: CastModel) => {
        return (
          member.character.toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1 ||
          member.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        )
      }
    )
    return searchedArray
  }

  //Return filtered members whose country is targetCountry. For Filtering feature.
  const filterCastByCountry = (
    targetCountries: string[],
    targetCastInfo: CastModel[] | undefined
  ) => {
    if (!targetCastInfo) return
    const filteredArray: CastModel[] = targetCastInfo.filter(
      (member: CastModel) => {
        return targetCountries.indexOf(member.country) !== -1
      }
    )
    return filteredArray
  }

  return {
    castInfo,
    searchCast,
    filterCastByCountry,
  }
}
