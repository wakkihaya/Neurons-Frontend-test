import type { Story, Meta } from '@storybook/react'

import { CheckboxGroup } from './CheckboxGroup'
import type { CheckboxGroupProps } from './CheckboxGroup'
import { ChangeEvent, useState } from 'react'
import { CheckboxModel } from '../../../models/CheckboxModel'

export default {
  component: CheckboxGroup,
  title: 'Molecules/CheckboxGroup',
} as Meta

export const _CheckboxGroup: Story<CheckboxGroupProps> = (args) => {
  const [valueStatuses, setValueStatuses] = useState<CheckboxModel[]>(
    mockValues
  )

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
  console.log(valueStatuses)

  return (
    <CheckboxGroup
      {...args}
      valueStatuses={valueStatuses}
      onChange={onChange}
    />
  )
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
