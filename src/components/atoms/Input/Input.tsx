import clsx from 'clsx'
import type { ChangeEventHandler, FC, InputHTMLAttributes } from 'react'

import styles from './Input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
  onChange?: ChangeEventHandler
}

export const Input: FC<InputProps> = (props) => {
  const { className, placeholder, onChange, ...rest } = props

  return (
    <label>
      <input
        className={clsx(styles.input, className)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </label>
  )
}
