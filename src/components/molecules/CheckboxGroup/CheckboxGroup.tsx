import clsx from 'clsx'
import { Checkbox } from '../../atoms'
import type { ChangeEventHandler, FC } from 'react'
import styles from './CheckboxGroup.module.scss'

export type CheckboxGroupProps = {
  values: string[]
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
}

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { values, onChange, className } = props
  return (
    <div className={clsx(className, styles['checkbox-group'])}>
      {values.map((value: string, j) => {
        return (
          <Checkbox
            value={value}
            onChange={onChange}
            className={styles['checkbox-group--item']}
            key={j}
            children={value}
          />
        )
      })}
    </div>
  )
}
