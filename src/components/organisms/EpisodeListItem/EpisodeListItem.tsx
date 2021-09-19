import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import { Image } from '../../atoms'
import styles from './EpisodeListItem.module.scss'
import { EpisodeModel } from '~models/EpisodeModel'

export type EpisodeListItemProps = {
  className?: string
  episodeInfo: EpisodeModel
}

// 1 -> 01, 10 -> 10
const reviseNumber = (targetNumber: string) => {
  if (parseInt(targetNumber) < 10) return '0' + targetNumber
  else return targetNumber
}

export const EpisodeListItem: FC<EpisodeListItemProps> = (props) => {
  const { className, episodeInfo } = props

  const revisedSeason = reviseNumber(episodeInfo.season)
  const revisedEpisode = reviseNumber(episodeInfo.episode)
  return (
    <div className={clsx(styles['listItem'], className)}>
      <div className={styles['listItem--card']}>
        <Image
          src={episodeInfo.imageSrc}
          alt={episodeInfo.name}
          className={styles['listItem--card-image']}
        />
        <div className={styles['listItem--card-mainUserInfo']}>
          <a href={episodeInfo.url} target="_blank">
            "{episodeInfo.name}"
          </a>
          <p>
            [S{revisedSeason}/E{revisedEpisode}]
          </p>
        </div>
        <div className={styles['listItem--card-airtime']}>
          {episodeInfo.airTime}
        </div>
      </div>
      <div className={styles['listItem--otherInfo']}>
        <p>{episodeInfo.description}</p>
      </div>
    </div>
  )
}
