import type { Story, Meta } from '@storybook/react'

import type { ListItemProps } from './ListItem'
import { ListItem } from './ListItem'
import { CastModel } from '~models/CastModel'

export default {
  component: ListItem,
  title: 'Organisms/ListItem',
} as Meta

export const _ListItem: Story<ListItemProps> = (args) => {
  return <ListItem {...args} />
}

const mockCastData: CastModel = {
  name: 'Name',
  age: '20',
  country: 'Pied country',
  birthday: '2000-0-0',
  character: 'Richard',
  charLink: 'https://neuronsinc.com',
  imageSrc:
    'https://static.tvmaze.com/uploads/images/medium_portrait/49/123646.jpg',
}

_ListItem.args = {
  castInfo: mockCastData,
}
