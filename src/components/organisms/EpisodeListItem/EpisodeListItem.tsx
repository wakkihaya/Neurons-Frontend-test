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
    <div className={clsx(styles.listItem, className)}>
      <div className={styles.listItem_Card}>
        <Image
          src={episodeInfo.imageSrc}
          alt={episodeInfo.name}
          className={styles.listItem_Card_Image}
        />
        <div className={styles.listItem_Card_MainUserInfo}>
          "{episodeInfo.name}", {episodeInfo.season_episode}, (
          {episodeInfo.airTime})
        </div>
      </div>
      <div className={styles.listItem_OtherInfo}>
        <p>{episodeInfo.description}</p>
      </div>
    </div>
  )
}
