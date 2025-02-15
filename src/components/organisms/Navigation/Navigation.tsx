import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './Navigation.module.scss' //TODO: add d.ts
import { Button } from '../../atoms/'
import { Image } from '../../atoms'
import logo from '../../../assets/images/Logo.jpg'

export type NavigationProps = {
  children1: ReactNode
  children2: ReactNode
  onClickButton1: MouseEventHandler<HTMLButtonElement>
  onClickButton2: MouseEventHandler<HTMLButtonElement>
  themeButton1?: string
  themeButton2?: string
  className?: string
}

export const Navigation: FC<NavigationProps> = (props) => {
  const {
    children1,
    children2,
    onClickButton1,
    onClickButton2,
    themeButton1,
    themeButton2,
    className,
  } = props

  return (
    <div className={clsx(styles['navigation'], className)}>
      <Image src={logo} className={styles['navigation--image']} />
      <Button
        onClick={onClickButton1}
        theme={themeButton1}
        className={styles['navigation--button']}
      >
        {children1}
      </Button>
      <Button
        onClick={onClickButton2}
        theme={themeButton2}
        className={styles['navigation--button']}
      >
        {children2}
      </Button>
    </div>
  )
}
