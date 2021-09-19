import clsx from 'clsx'
import { Checkbox } from '../../atoms'
import type { ChangeEventHandler, FC } from 'react'
import styles from './CheckboxGroup.module.scss'
import { CheckboxModel } from '../../../models/CheckboxModel'

export type CheckboxGroupProps = {
  valueStatuses: CheckboxModel[]
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
}

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const { valueStatuses, onChange, className } = props
  return (
    <div className={clsx(className, styles['checkbox-group'])}>
      {valueStatuses.map((status: CheckboxModel, j) => {
        return (
          <Checkbox
            value={status.value}
            checked={status.checked}
            onChange={onChange}
            className={styles['checkbox-group--item']}
            key={j}
            children={status.value}
          />
        )
      })}
    </div>
  )
}
