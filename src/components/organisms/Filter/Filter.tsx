import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import clsx from 'clsx'
import type { FC, ReactNode, MouseEventHandler } from 'react'
import styles from './Filter.module.scss' //TODO: add d.ts
import { CheckboxGroup } from '../../molecules'
import { FaFilter } from 'react-icons/fa'

export type FilterProps = {
  category: string
  values: string[]
  onClickUpdateButton: (values: string[]) => void
  className?: string
}

export const Filter: FC<FilterProps> = (props) => {
  const { category, values, onClickUpdateButton, className } = props
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const changedValue = event.target.value
    if (event.target.checked) {
      console.log(changedValue)
      setCheckedItems([...checkedItems, changedValue])
    } else {
      //If checked-item unchecked, remove it.
      const newArray = checkedItems.filter((item) => item !== changedValue)
      setCheckedItems(newArray)
    }
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
            values={values}
            onChange={onChange}
            className={styles['filter--contents-items']}
          />
          <div
            className={styles['filter--contents-update-button']}
            onClick={() => onClickUpdateButton(checkedItems)}
          >
            Update
          </div>
        </div>
      )}
    </div>
  )
}
