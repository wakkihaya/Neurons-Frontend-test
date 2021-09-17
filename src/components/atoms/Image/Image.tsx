import clsx from 'clsx'
import { ImgHTMLAttributes, FC } from 'react'

export interface ImageProps {
  fallbackSrc?: string
  alt?: string
  src: string
  crossOrigin?: ImgHTMLAttributes<any>['crossOrigin']
  className?: string
}

export const Image: FC<ImageProps> = (props) => {
  const { fallbackSrc, alt, src, crossOrigin, className } = props

  //TODO: set a fallbackSrc when image doesn't load.

  return (
    <img
      alt={alt}
      src={src}
      crossOrigin={crossOrigin}
      className={clsx(className)}
    />
  )
}
