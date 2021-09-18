import type { FC, ChangeEvent } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import { Navigation } from '../../components/organisms'
import { CastListItem } from '../../components/organisms'
import { useHistory } from 'react-router-dom'
import { ButtonTheme } from '../../components/atoms'
import { SearchBar } from '../../components/molecules'
import { useCast } from '../../hooks/use-cast'
import styles from './Cast.module.scss'
import { CastModel } from '../../models/CastModel'
import { LoadingStatus } from '~models/LoadingStatus'
//TODO: resolve paths error

//Fail to load data: return 'Couldn't ...'
//No keyword : return castInfo
//Keyword & Match: return filteredCastInfo
//Keyword & NoMatch: return 'No match'
const renderCastList = (
  castInfo: CastModel[] | undefined,
  filteredCastInfo: CastModel[] | undefined,
  keyword: string
) => {
  if (!castInfo) return <p>Couldn't fetch data, sorry...</p>

  if (keyword === '') {
    return (
      <div className={styles.listItem}>
        {castInfo.map((castInfoItem: CastModel, j) => {
          return <CastListItem key={j} castInfo={castInfoItem} />
        })}
      </div>
    )
  } else {
    if (!filteredCastInfo) {
      return <p>Couldn't fetch data, sorry...</p>
    } else if (filteredCastInfo.length === 0) {
      return <p>No match, sorry...</p>
    } else {
      return (
        <div className={styles.listItem}>
          {filteredCastInfo?.map((filteredCastInfo, j) => {
            return <CastListItem key={j} castInfo={filteredCastInfo} />
          })}
        </div>
      )
    }
  }
}

const Cast: FC = () => {
  const [loading, setLoading] = useState<LoadingStatus>('DONE')
  const [searchWord, setSearchWord] = useState<string>('')

  const { castInfo, filterCast, filteredCastInfo } = useCast(setLoading)

  const history = useHistory()

  const onClickCastButton = () => {
    history.push('/cast')
  }
  const onClickEpisodesButton = () => {
    history.push('/episodes')
  }

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    filterCast(value)
    setSearchWord(value)
  }

  return (
    <>
      <div className={styles['castContainer']}>
        <Navigation
          children1="Cast"
          children2="Episodes"
          onClickButton1={onClickCastButton}
          onClickButton2={onClickEpisodesButton}
          themeButton1={ButtonTheme.SELECTED}
          themeButton2={ButtonTheme.DEFAULT}
        />
        <SearchBar
          placeholder="Search for cast members"
          onChange={onChangeSearch}
          className={styles['castContainer--searchBar']}
        />
        {loading === 'DONE' ? (
          <>{renderCastList(castInfo, filteredCastInfo, searchWord)}</>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  )
}

export default Cast
