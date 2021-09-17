import { render } from '@testing-library/react'

import { Image } from './Image'

describe('Image', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Image src="https://pbs.twimg.com/profile_images/1425033841195077633/xb98yWU6_400x400.jpg" />
    )
    expect(baseElement).toBeTruthy()
  })
})
