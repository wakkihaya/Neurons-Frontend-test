import type { Story, Meta } from '@storybook/react'

import type { SearchBarProps } from './SearchBar'
import { SearchBar } from './SearchBar'

export default {
  component: SearchBar,
  title: 'Molecules/SearchBar',
} as Meta

export const _SearchBar: Story<SearchBarProps> = (args) => {
  return <SearchBar {...args} />
}

_SearchBar.args = {
  placeholder: 'Search for cast members ',
}
