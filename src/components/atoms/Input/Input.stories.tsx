import type { Story, Meta } from '@storybook/react'

import type { InputProps } from './Input'
import { Input } from './Input'

export default {
  component: Input,
  title: 'Atoms/Input',
} as Meta

export const _Input: Story<InputProps> = (args) => {
  return <Input {...args} />
}

_Input.args = {
  placeholder: 'Search for cast members '
}

_Input.parameters = {
  controls: { hideNoControlsWarning: true },
}
