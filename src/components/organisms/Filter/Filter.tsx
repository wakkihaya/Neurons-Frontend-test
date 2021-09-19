import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './Filter.module.scss' //TODO: add d.ts
import { CheckboxGroup } from '../../molecules'
import { FaFilter } from 'react-icons/fa'
import { CheckboxModel } from '~models/CheckboxModel'

export type FilterProps = {
  category: string
  valueStatuses: CheckboxModel[]
  onClickUpdateButton: (valueStatuses: CheckboxModel[]) => void
  className?: string
}

export const Filter: FC<FilterProps> = (props) => {
  const {
    category,
    valueStatuses: initialData,
    onClickUpdateButton,
    className,
  } = props
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)

  const [valueStatuses, setValueStatuses] = useState<CheckboxModel[]>([])

  useEffect(() => {
    setValueStatuses(initialData)
  }, [initialData])

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const changedValue = event.target.value
    const changedChecktype = event.target.checked
    const newValueStatuses = valueStatuses.map((valueStatus: CheckboxModel) => {
      if (valueStatus.value === event.target.value) {
        return {
          value: changedValue,
          checked: changedChecktype,
        }
      } else {
        return valueStatus
      }
    })
    setValueStatuses(newValueStatuses)
  }

  return (
    <div
      className={clsx(
        styles['filter'],
        className,
        isOpenFilter ? styles['filter__open'] : styles['filter__close']
      )}
    >
      <div
        className={clsx(
          styles['filter--title'],
          isOpenFilter && styles['filter--title__border']
        )}
        onClick={() => setIsOpenFilter(!isOpenFilter)}
      >
        <div className={styles['filter--title-icon']}>
          <FaFilter size={14} />
        </div>
        <div className={styles['filter--title-text']}>Filter</div>
      </div>
      {isOpenFilter && (
        <div className={styles['filter--contents']}>
          <div className={styles['filter--contents-name']}>{category}</div>
          <CheckboxGroup
            valueStatuses={valueStatuses}
            onChange={onChange}
            className={styles['filter--contents-items']}
          />
          <div
            className={styles['filter--contents-update-button']}
            onClick={() => {
              onClickUpdateButton(valueStatuses)
              setIsOpenFilter(false)
            }}
          >
            Update
          </div>
        </div>
      )}
    </div>
  )
}
