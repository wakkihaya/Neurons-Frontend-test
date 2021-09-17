import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import { Image } from '~/components/atoms'
import styles from './ListItem.scss'
import { CastModel } from '~models/CastModel'

export type ListItemProps = {
  className?: string
  src: string
  alt?: string
  castInfo: CastModel
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { className, src, alt, castInfo } = props

  return (
    <div className={clsx(styles.listItem, className)}>
      <div className={styles.listItem_Card}>
        <Image src={src} alt={alt} className={styles.listItem_Card_Image} />
        <Image
          src="~/assets/images/face.png"
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
