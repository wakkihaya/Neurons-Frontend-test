import { FC, ChangeEvent, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Filter, Navigation } from '../../components/organisms'
import { EpisodeListItem } from '../../components/organisms'
import { useHistory } from 'react-router-dom'
import { ButtonTheme } from '../../components/atoms'
import { SearchBar } from '../../components/molecules'
import { useEpisodes } from '../../hooks/use-episodes'
import styles from './Episodes.module.scss'
import { EpisodeModel } from '../../models/EpisodeModel'
import { LoadingStatus } from '~models/LoadingStatus'
import { CheckboxModel } from '~models/CheckboxModel'
//TODO: resolve paths error

//Fail to load data: return 'Couldn't ...'
//NoMatch: return 'No match'
const renderEpisodeList = (currentEpisodeInfo: EpisodeModel[] | undefined) => {
  if (!currentEpisodeInfo) return <p>Couldn't fetch data, sorry...</p>

  if (currentEpisodeInfo.length === 0) {
    return <p>No match, sorry...</p>
  } else {
    return (
      <div className={styles['list']}>
        {currentEpisodeInfo.map((currentEpisodeInfoItem: EpisodeModel, j) => {
          return (
            <EpisodeListItem
              key={j}
              episodeInfo={currentEpisodeInfoItem}
              className={styles['list--item']}
            />
          )
        })}
      </div>
    )
  }
}

const extractAirtimes = (episodeInfo: EpisodeModel[] | undefined) => {
  if (!episodeInfo) return
  const airtimeArray: string[] = episodeInfo.map(
    (episode: EpisodeModel) => episode.airTime
  )
  //Remove duplication.
  const newAirtimeArray = airtimeArray.filter(
    (airtime: string, index, self) => {
      return self.indexOf(airtime) === index
    }
  )
  const checkBoxModelAirtimeArray = newAirtimeArray.map(
    (airtimeItem: string) => {
      return {
        value: airtimeItem,
        checked: false,
      } as CheckboxModel
    }
  )
  return checkBoxModelAirtimeArray
}

const Episodes: FC = () => {
  const [loading, setLoading] = useState<LoadingStatus>('DONE')
  const [searchWord, setSearchWord] = useState<string>('')
  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  const { episodeInfo, searchEpisode, filterEpisodeByAirtime } = useEpisodes(
    setLoading
  )

  //currentEpisodeInfo: used for rendering current episodes.
  const [currentEpisodeInfo, setCurrentEpisodeInfo] = useState<
    EpisodeModel[] | undefined
  >([])

  //filteredEpisodeInfo: episodeINfo data arranged by filter-item. Stored because of use for search feature.
  const [filteredEpisodeInfo, setFilteredEpisodeInfo] = useState<
    EpisodeModel[] | undefined
  >([])

  const [airtimesCheckBox, setAirtimesCheckBox] = useState<CheckboxModel[]>([])

  //Wait for fetching data from api.
  useEffect(() => {
    setCurrentEpisodeInfo(episodeInfo)
    const newAirtimesCheckboxArray = extractAirtimes(episodeInfo) ?? []
    setAirtimesCheckBox(newAirtimesCheckboxArray)
  }, [episodeInfo])

  const history = useHistory()

  const onClickCastButton = () => {
    history.push('/cast')
  }
  const onClickEpisodesButton = () => {
    history.push('/episodes')
  }
  const handleSearchFromSelectedEpisodeInfo = (
    searchWord: string,
    targetEpisodeInfo: EpisodeModel[] | undefined
  ) => {
    if (searchWord === '') {
      setCurrentEpisodeInfo(targetEpisodeInfo)
    } else {
      setCurrentEpisodeInfo(searchEpisode(searchWord, targetEpisodeInfo))
    }
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    if (isFiltered) {
      handleSearchFromSelectedEpisodeInfo(value, filteredEpisodeInfo)
    } else {
      handleSearchFromSelectedEpisodeInfo(value, episodeInfo)
    }
    setSearchWord(value)
  }

  //filterCheckItems: [{value: '22:00', checked: true}, ...]
  //No check item -> show episodeInfo
  const onClickUpdateButton = (filterCheckItems: CheckboxModel[]) => {
    const filterCheckedItemsArray: CheckboxModel[] = filterCheckItems.filter(
      (item: CheckboxModel) => item.checked
    )
    if (filterCheckedItemsArray.length === 0) {
      setIsFiltered(false)
      setCurrentEpisodeInfo(episodeInfo)
      if (searchWord === '') return

      //Should re-search from episodeInfo array, after filtering.
      handleSearchFromSelectedEpisodeInfo(searchWord, episodeInfo)
    } else {
      const filterAirtimes = filterCheckedItemsArray.map(
        (checkItem: CheckboxModel) => checkItem.value
      )
      const resultEpisodeInfo = filterEpisodeByAirtime(
        filterAirtimes,
        episodeInfo
      )
      console.log(resultEpisodeInfo)
      setFilteredEpisodeInfo(resultEpisodeInfo)
      setIsFiltered(true)
      setCurrentEpisodeInfo(resultEpisodeInfo)

      if (searchWord === '') return
      //Should re-search from filtered episodeInfo array, after filtering.
      handleSearchFromSelectedEpisodeInfo(searchWord, filteredEpisodeInfo)
    }
  }

  return (
    <>
      <div className={styles['episodeContainer']}>
        <Navigation
          children1="Cast"
          children2="Episodes"
          onClickButton1={onClickCastButton}
          onClickButton2={onClickEpisodesButton}
          themeButton1={ButtonTheme.DEFAULT}
          themeButton2={ButtonTheme.SELECTED}
        />
        <div className={styles['episodeContainer--filterGroup']}>
          <SearchBar
            placeholder="Search for episodes"
            onChange={onChangeSearch}
            className={styles['episodeContainer--filterGroup-searchBar']}
          />
          <Filter
            category="Airtime"
            valueStatuses={airtimesCheckBox}
            onClickUpdateButton={onClickUpdateButton}
            className={styles['episodeContainer--filterGroup-filter']}
          />
        </div>
        {loading === 'DONE' ? (
          <>{renderEpisodeList(currentEpisodeInfo)}</>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  )
}

export default Episodes
