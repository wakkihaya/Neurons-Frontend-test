import type { Story, Meta } from '@storybook/react'
import { ChangeEvent, useState } from 'react'

import type { FilterProps } from './Filter'
import { Filter } from './Filter'
import { CheckboxModel } from '~models/CheckboxModel'

export default {
  component: Filter,
  title: 'Organisms/Filter',
} as Meta

export const _Filter: Story<FilterProps> = (args) => {
  const onClickUpdateButton = (valueStatuses: CheckboxModel[]) => {
    console.log(valueStatuses)
  }
  return <Filter {...args} onClickUpdateButton={onClickUpdateButton} />
}

const mockValues: CheckboxModel[] = [
  {
    value: 'A',
    checked: true,
  },
  {
    value: 'B',
    checked: false,
  },
]

_Filter.args = {
  valueStatuses: mockValues,
  category: 'Country',
}
