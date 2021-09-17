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
}

_ListItem.args = {
  src:
    'https://pbs.twimg.com/profile_images/1425033841195077633/xb98yWU6_400x400.jpg',
  castInfo: mockCastData,
}
