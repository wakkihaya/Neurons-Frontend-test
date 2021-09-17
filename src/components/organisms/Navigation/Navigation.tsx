import React from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './Navigation.scss'
import { Button } from '../../atoms/'

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
    <div className={clsx(styles.navigation, className)}>
      <img src="../../../assets/images/Logo.png" className={styles.img} />
      <Button
        onClick={onClickButton1}
        theme={themeButton1}
        className={styles.button}
      >
        {children1}
      </Button>
      <Button
        onClick={onClickButton2}
        theme={themeButton2}
        className={styles.button}
      >
        {children2}
      </Button>
    </div>
  )
}
