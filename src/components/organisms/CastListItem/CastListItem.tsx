import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import { Image } from '../../atoms'
import styles from './CastListItem.module.scss'
import { CastModel } from '~models/CastModel'
import faceIcon from '../../../assets/images/face.png'

export type CastListItemProps = {
  className?: string
  castInfo: CastModel
}

export const CastListItem: FC<CastListItemProps> = (props) => {
  const { className, castInfo } = props

  return (
    <div className={clsx(styles['listItem'], className)}>
      <div className={styles['listItem--card']}>
        <Image
          src={castInfo.imageSrc}
          alt={castInfo.character}
          className={styles['listItem--card-image']}
        />
        <Image
          src={faceIcon}
          alt="PiedPiper face"
          className={styles['listItem--card-icon']}
        />
        <div className={styles['listItem--card-mainUserInfo']}>
          <a href={castInfo.profileLink} target="_blank">
            {castInfo.name}, {castInfo.age}
          </a>
        </div>
      </div>
      <div className={styles['listItem--otherInfo']}>
        <p>
          Country: {castInfo.country} <br />
          Birthday: {castInfo.birthday}
        </p>
        <p>
          Character:
          <a href={castInfo.charLink} target="_blank">
            {castInfo.character}
          </a>
        </p>
      </div>
    </div>
  )
}
