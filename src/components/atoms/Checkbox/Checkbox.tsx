import clsx from 'clsx'
import type {
  FC,
  ReactNode,
  InputHTMLAttributes,
  ChangeEventHandler,
} from 'react'

import styles from './Checkbox.module.scss'

export const CheckboxSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  disabled?: HTMLInputElement['disabled']
  required?: HTMLInputElement['required']
  checked?: boolean
  id?: string
  name?: string
  value?: string | number
  boxSize?: string
  children?: ReactNode
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    className,
    disabled = false,
    required = false,
    checked,
    id,
    name,
    value,
    boxSize = CheckboxSize.MEDIUM,
    children,
    onChange,
    ...rest
  } = props

  return (
    <label
      className={clsx(
        styles['checkbox'],
        disabled && styles['checkbox__disabled'],
        className
      )}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={required}
        {...rest}
        className={clsx(
          disabled && styles['checkbox--input__disabled'],
          styles['checkbox--input'],
          boxSize
        )}
        onChange={onChange}
      />
      {children}
    </label>
  )
}
