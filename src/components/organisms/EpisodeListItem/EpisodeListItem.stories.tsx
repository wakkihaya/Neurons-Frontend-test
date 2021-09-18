import type { Story, Meta } from '@storybook/react'

import type { EpisodeListItemProps } from './EpisodeListItem'
import { EpisodeListItem } from './EpisodeListItem'
import { EpisodeModel } from '~models/EpisodeModel'

export default {
  component: EpisodeListItem,
  title: 'Organisms/EpisodeListItem',
} as Meta

export const _EpisodeListItem: Story<EpisodeListItemProps> = (args) => {
  return <EpisodeListItem {...args} />
}

const mockEpisodeData: EpisodeModel = {
  name: 'Elon Musk join!?',
  description:
    'Elon Musk joined the team. This is super awesome awesome awesome. Awesome Awesome Awesome.',
  season_episode: '2/2',
  airTime: '22:00',
  imageSrc:
    'https://static.tvmaze.com/uploads/images/medium_portrait/3/8320.jpg',
}
_EpisodeListItem.args = {
  episodeInfo: mockEpisodeData,
}
