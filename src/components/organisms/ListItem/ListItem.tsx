import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import { Image } from '../../atoms'
import styles from './ListItem.module.scss'
import { CastModel } from '~models/CastModel'
import faceIcon from '../../../assets/images/face.png'

export type ListItemProps = {
  className?: string
  castInfo: CastModel
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { className, castInfo } = props

  return (
    <div className={clsx(styles.listItem, className)}>
      <div className={styles.listItem_Card}>
        {/* TODO: fix a bug to show the image from external */}
        <Image
          src={castInfo.imageSrc}
          alt={castInfo.character}
          className={styles.listItem_Card_Image}
        />
        <Image
          src={faceIcon}
          alt="PiedPiper face"
          className={styles.listItem_Card_Icon}
        />
        <div className={styles.listItem_Card_MainUserInfo}>
          {castInfo.name}, {castInfo.age}
        </div>
      </div>
      <div className={styles.listItem_OtherInfo}>
        <p>
          Country: {castInfo.country} <br />
          Birthday: {castInfo.birthday}
        </p>
        <p>
          Character:
          <a href={castInfo.charLink}>{castInfo.character}</a>
        </p>
      </div>
    </div>
  )
}
