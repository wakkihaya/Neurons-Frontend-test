import type { Story, Meta } from '@storybook/react'

import type { ImageProps } from './Image'
import { Image } from './Image'

export default {
  component: Image,
  title: 'Atoms/Image',
} as Meta

export const _Image: Story<ImageProps> = (args) => {
  return <Image {...args} />
}

_Image.args = {
  src:
    'https://pbs.twimg.com/profile_images/1425033841195077633/xb98yWU6_400x400.jpg',
}
