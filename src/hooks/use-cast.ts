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
  const [filteredCastInfo, setFilteredCastInfo] = useState<CastModel[]>()

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
            age: calculateAge(birthday) ?? 'None',
            country: item['person']['country']['name'],
            birthday: birthday,
            character: item['character']['name'],
            charLink: item['character']['url'],
            imageSrc: item['person']['image']['medium'],
          } as CastModel
        })
        setCastInfo(formattedCastDataList)
      } catch (error) {
        console.error(error)
        return
      }
      setLoading('DONE')
    }
    fetchCastByApi()
  }, [])

  const filterCast = (keyword: string) => {
    //Return filtered members when their name or character includes keyword.
    if (!castInfo) return
    const filteredArray: CastModel[] = castInfo.filter((member: CastModel) => {
      return (
        member.character.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
        member.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      )
    })
    setFilteredCastInfo(filteredArray)
  }
  return { castInfo, filterCast, filteredCastInfo }
}
