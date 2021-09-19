import type { FC, ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Navigation, Filter } from '../../components/organisms'
import { CastListItem } from '../../components/organisms'
import { useHistory } from 'react-router-dom'
import { ButtonTheme } from '../../components/atoms'
import { SearchBar } from '../../components/molecules'
import { useCast } from '../../hooks/use-cast'
import styles from './Cast.module.scss'
import { CastModel } from '../../models/CastModel'
import { LoadingStatus } from '~models/LoadingStatus'
import { CheckboxModel } from '~models/CheckboxModel'
//TODO: resolve paths error

//Fail to load data: return 'Couldn't ...'
//No keyword : return castInfo
//Keyword & Match: return searchedCastInfo
//Keyword & NoMatch: return 'No match'
const renderCastList = (
  currentCastInfo: CastModel[] | undefined,
  searchWord: string,
  isFiltered: boolean
) => {
  if (!currentCastInfo) return <p>Couldn't fetch data, sorry...</p>

  if (currentCastInfo.length === 0) {
    return <p>No match, sorry...</p>
  } else {
    return (
      <div className={styles.listItem}>
        {currentCastInfo.map((currentCastInfoItem: CastModel, j) => {
          return <CastListItem key={j} castInfo={currentCastInfoItem} />
        })}
      </div>
    )
  }
}

const extractCountries = (castInfo: CastModel[] | undefined) => {
  if (!castInfo) return
  const countryArray: string[] = castInfo.map(
    (member: CastModel) => member.country
  )
  //Remove duplication.
  const newCountryArray = countryArray.filter(
    (country: string, index, self) => {
      return self.indexOf(country) === index
    }
  )
  const checkBoxModelCountryArray = newCountryArray.map(
    (countryItem: string) => {
      return {
        value: countryItem,
        checked: false,
      } as CheckboxModel
    }
  )
  return checkBoxModelCountryArray
}

//TODO: filter Episodes

const Cast: FC = () => {
  const [loading, setLoading] = useState<LoadingStatus>('DONE')
  const [searchWord, setSearchWord] = useState<string>('')
  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  //castInfo: All original data. Stored because of use for search feature.
  const { castInfo, searchCast, filterCastByCountry } = useCast(setLoading)

  //currentCastInfo: used for rendering current cast.
  const [currentCastInfo, setCurrentCastInfo] = useState<
    CastModel[] | undefined
  >([])

  //filteredCastInfo: castInfo data arranged by filter-item. Stored because of use for search feature.
  const [filteredCastInfo, setFilteredCastInfo] = useState<
    CastModel[] | undefined
  >([])

  const [countriesCheckBox, setCountriesCheckBox] = useState<CheckboxModel[]>(
    []
  )

  //Wait for fetching data from api.
  useEffect(() => {
    setCurrentCastInfo(castInfo)
    const newCountryCheckboxArray = extractCountries(castInfo) ?? []
    setCountriesCheckBox(newCountryCheckboxArray)
  }, [castInfo])

  const history = useHistory()

  const onClickCastButton = () => {
    history.push('/cast')
  }
  const onClickEpisodesButton = () => {
    history.push('/episodes')
  }

  const handleSearchFromSelectedCastInfo = (
    searchWord: string,
    targetCastInfo: CastModel[] | undefined
  ) => {
    if (searchWord === '') {
      setCurrentCastInfo(targetCastInfo)
    } else {
      setCurrentCastInfo(searchCast(searchWord, targetCastInfo))
    }
  }

  //1. Search members from original cast info.
  //2. Search members from filtered cast info.
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (isFiltered) {
      handleSearchFromSelectedCastInfo(value, filteredCastInfo)
    } else {
      handleSearchFromSelectedCastInfo(value, castInfo)
    }
    setSearchWord(value)
  }

  //filterCheckItems: ['Canada', 'India', ...]
  //No check item -> show castInfo
  const onClickUpdateButton = (filterCheckItems: CheckboxModel[]) => {
    const filterCheckedItemsArray: CheckboxModel[] = filterCheckItems.filter(
      (item: CheckboxModel) => item.checked
    )
    if (filterCheckedItemsArray.length === 0) {
      setIsFiltered(false)
      setCurrentCastInfo(castInfo)
      if (searchWord === '') return

      //Should re-search from castInfo array, after filtering.
      handleSearchFromSelectedCastInfo(searchWord, castInfo)
    } else {
      const filterCountries = filterCheckedItemsArray.map(
        (checkItem: CheckboxModel) => checkItem.value
      )
      const resultCastInfo = filterCastByCountry(filterCountries, castInfo)
      setFilteredCastInfo(resultCastInfo)
      setIsFiltered(true)
      setCurrentCastInfo(resultCastInfo)

      if (searchWord === '') return
      //Should re-search from filtered castInfo array, after filtering.
      handleSearchFromSelectedCastInfo(searchWord, filteredCastInfo)
    }
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
        <div className={styles['castContainer--filterGroup']}>
          <SearchBar
            placeholder="Search for cast members"
            onChange={onChangeSearch}
            className={styles['castContainer--filterGroup-searchBar']}
          />
          <Filter
            category="Country"
            valueStatuses={countriesCheckBox}
            onClickUpdateButton={onClickUpdateButton}
            className={styles['castContainer--filterGroup-filter']}
          />
        </div>
        {loading === 'DONE' ? (
          <>{renderCastList(currentCastInfo, searchWord, isFiltered)}</>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  )
}

export default Cast
