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

export const EpisodeListItem: FC<EpisodeListItemProps> = (props) => {
  const { className, episodeInfo } = props

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
          ,{episodeInfo.season_episode}, ({episodeInfo.airTime})
        </div>
      </div>
      <div className={styles['listItem--otherInfo']}>
        <p>{episodeInfo.description}</p>
      </div>
    </div>
  )
}
