import type { Story, Meta } from '@storybook/react'

import type { NavigationProps } from './Navigation'
import { Navigation } from './Navigation'

export default {
  component: Navigation,
  title: 'Organisms/Navigation',
} as Meta

export const _Navigation: Story<NavigationProps> = (args) => {
  return <Navigation {...args} />
}

_Navigation.args = {
  children1: 'Casts',
  children2: 'Episodes',
  onClickButton1: (): void => {
    console.log('clicked Button1')
  },
  onClickButton2: (): void => {
    console.log('clicked Button2')
  },
}
