import type { Story, Meta } from '@storybook/react'
import { ChangeEvent } from 'react'

import type { FilterProps } from './Filter'
import { Filter } from './Filter'

export default {
  component: Filter,
  title: 'Organisms/Filter',
} as Meta

export const _Filter: Story<FilterProps> = (args) => {
  const onClickUpdateButton = (checkedValues: string[]) => {
    console.log(checkedValues)
  }
  return <Filter {...args} onClickUpdateButton={onClickUpdateButton} />
}

const mockValues = ['a', 'b', 'c']

_Filter.args = {
  values: mockValues,
  category: 'Country',
}
