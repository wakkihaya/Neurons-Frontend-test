import type { FC, ReactNode, MouseEventHandler } from 'react'
import clsx from 'clsx'
import styles from './Button.scss'
import React from 'react'

export const ButtonTheme = {
  DEFAULT: 'default',
  SELECTED: 'selected',
}

export type ButtonProps = {
  children: ReactNode
  theme?: string
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  width?: string | number
  height?: string | number
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    theme = ButtonTheme.DEFAULT,
    onClick,
    className,
    disabled,
  } = props

  const style = clsx(styles[theme], styles.button, className)

  return (
    <button className={style} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
