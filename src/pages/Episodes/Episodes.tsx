import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import { Navigation } from '../../components/organisms'
import { EpisodeListItem } from '../../components/organisms'
import { useHistory } from 'react-router-dom'
import { ButtonTheme } from '../../components/atoms'
import { SearchBar } from '../../components/molecules'
import { useEpisodes } from '../../hooks/use-episodes'
import styles from './Episodes.module.scss'
import { EpisodeModel } from '../../models/EpisodeModel'
import { LoadingStatus } from '~models/LoadingStatus'
//TODO: resolve paths error

//Fail to load data: return 'Couldn't ...'
//No keyword : return episodeInfo
//Keyword & Match: return searchedEpisodeInfo
//Keyword & NoMatch: return 'No match'
const renderEpisodeList = (
  episodeInfo: EpisodeModel[] | undefined,
  searchedEpisodeInfo: EpisodeModel[] | undefined,
  keyword: string
) => {
  if (!episodeInfo) return <p>Couldn't fetch data, sorry...</p>

  if (keyword === '') {
    return (
      <div className={styles.listItem}>
        {episodeInfo.map((episodeInfoItem: EpisodeModel, j) => {
          return <EpisodeListItem key={j} episodeInfo={episodeInfoItem} />
        })}
      </div>
    )
  } else {
    if (!searchedEpisodeInfo) {
      return <p>Couldn't fetch data, sorry...</p>
    } else if (searchedEpisodeInfo.length === 0) {
      return <p>No match, sorry...</p>
    } else {
      return (
        <div className={styles.listItem}>
          {searchedEpisodeInfo?.map((searchedEpisodeInfoItem, j) => {
            return (
              <EpisodeListItem key={j} episodeInfo={searchedEpisodeInfoItem} />
            )
          })}
        </div>
      )
    }
  }
}

const Episodes: FC = () => {
  const [loading, setLoading] = useState<LoadingStatus>('DONE')
  const [searchWord, setSearchWord] = useState<string>('')

  const { episodeInfo, searchEpisode, searchedEpisodeInfo } = useEpisodes(
    setLoading
  )

  const history = useHistory()

  const onClickCastButton = () => {
    history.push('/cast')
  }
  const onClickEpisodesButton = () => {
    history.push('/episodes')
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    searchEpisode(value)
    setSearchWord(value)
  }

  return (
    <>
      <div className={styles['episodesContainer']}>
        <Navigation
          children1="Cast"
          children2="Episodes"
          onClickButton1={onClickCastButton}
          onClickButton2={onClickEpisodesButton}
          themeButton1={ButtonTheme.DEFAULT}
          themeButton2={ButtonTheme.SELECTED}
        />
        <SearchBar
          placeholder="Search for episodes"
          onChange={onChangeSearch}
          className={styles['episodesContainer--searchBar']}
        />
        {loading === 'DONE' ? (
          <>{renderEpisodeList(episodeInfo, searchedEpisodeInfo, searchWord)}</>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  )
}

export default Episodes
