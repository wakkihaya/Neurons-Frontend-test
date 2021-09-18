import clsx from 'clsx'
import type { FC, ChangeEventHandler } from 'react'
import { Input } from '../../atoms'
import { AiOutlineSearch } from 'react-icons/ai'

import styles from './SearchBar.module.scss'

export type SearchBarProps = {
  placeholder?: string
  onChange?: ChangeEventHandler
  className?: string
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { placeholder, onChange, className } = props

  return (
    <div className={clsx(styles['searchBar'], className)}>
      <AiOutlineSearch className={styles['searchBar--icon']} />
      <Input
        placeholder={placeholder}
        onChange={onChange}
        className={styles['searchBar--input']}
      />
    </div>
  )
}
