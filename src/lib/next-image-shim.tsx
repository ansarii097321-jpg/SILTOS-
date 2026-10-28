import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  objectFit?: string;
}

export default function Image({
  src,
  alt,
  className,
  style,
  width,
  height,
  priority,
  fill,
  objectFit,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      style={{
        ...style,
        ...(fill ? { width: '100%', height: '100%', objectFit: (objectFit as any) || 'cover' } : {}),
      }}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}
