import type { Story, Meta } from '@storybook/react'

import type { ButtonProps } from './Button'
import { Button } from './Button'
import React from 'react'

export default {
  component: Button,
  title: 'Atoms/Button',
} as Meta

export const _Button: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}

_Button.args = {
  onClick: (): void => {
    console.log('clicked')
  },
  children: 'Button',
}
