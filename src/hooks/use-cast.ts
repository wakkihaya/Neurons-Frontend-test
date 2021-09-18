import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { LoadingStatusType } from '~pages/Cast/Cast'
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
  setLoading: Dispatch<SetStateAction<LoadingStatusType>>
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
  return { castInfo }
}
