import type { FC } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import { Navigation } from '../../components/organisms'
import { ListItem } from '../../components/organisms/ListItem'
import { useHistory } from 'react-router-dom'
import { ButtonTheme } from '../../components/atoms'
import { useCast } from '../../hooks/use-cast'
import styles from './Cast.module.scss'
//TODO: resolve paths error

export type LoadingStatusType = 'LOADING' | 'DONE'

const Cast: FC = () => {
  const [loading, setLoading] = useState<LoadingStatusType>('DONE')
  const { castInfo } = useCast(setLoading)
  const history = useHistory()

  const onClickCastButton = () => {
    history.push('/cast')
  }
  const onClickEpisodesButton = () => {
    history.push('/episodes')
  }

  return (
    <>
      <Navigation
        children1="Cast"
        children2="Episodes"
        onClickButton1={onClickCastButton}
        onClickButton2={onClickEpisodesButton}
        themeButton1={ButtonTheme.SELECTED}
        themeButton2={ButtonTheme.DEFAULT}
        className={clsx(styles.navigation)}
      />
      {loading === 'DONE' ? (
        <div className={styles.listItem}>
          {castInfo?.map((castInfoItem, j) => {
            return <ListItem key={j} castInfo={castInfoItem} />
          })}
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  )
}

export default Cast
