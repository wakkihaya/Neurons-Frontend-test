import type { Story, Meta } from '@storybook/react'

import { CheckboxGroup } from './CheckboxGroup'
import type { CheckboxGroupProps } from './CheckboxGroup'
import { ChangeEvent } from 'react'

export default {
  component: CheckboxGroup,
  title: 'Molecules/CheckboxGroup',
} as Meta

export const _CheckboxGroup: Story<CheckboxGroupProps> = (args) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      console.log(event.target.value)
    }
  }
  return <CheckboxGroup {...args} onChange={onChange} />
}

const mockValues = ['a', 'b', 'c']

_CheckboxGroup.args = {
  values: mockValues,
}
