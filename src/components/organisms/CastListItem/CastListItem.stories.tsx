import type { Story, Meta } from '@storybook/react'

import type { CastListItemProps } from './CastListItem'
import { CastListItem } from './CastListItem'
import { CastModel } from '~models/CastModel'

export default {
  component: CastListItem,
  title: 'Organisms/CastListItem',
} as Meta

export const _CastListItem: Story<CastListItemProps> = (args) => {
  return <CastListItem {...args} />
}

const mockCastData: CastModel = {
  name: 'Name',
  age: '20',
  country: 'Pied country',
  birthday: '2000-0-0',
  character: 'Richard',
  charLink: 'https://neuronsinc.com',
  imageSrc:
    'https://static.tvmaze.com/uploads/images/medium_portrait/3/8320.jpg',
}
_CastListItem.args = {
  castInfo: mockCastData,
}
