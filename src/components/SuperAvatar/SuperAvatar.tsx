import { useEffect, useState, type ReactElement } from 'react';
import { Circle, Img } from './SuperAvatar.styles';
import type { SuperAvatarProps } from './SuperAvatar.types';

const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

/** Avatar con foto o, si falta o falla, las iniciales. */
export const SuperAvatar = ({
  name,
  src,
  size = 36,
  className,
}: SuperAvatarProps): ReactElement => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const showImage = Boolean(src) && !failed;

  return (
    <Circle $size={size} className={className} role="img" aria-label={name}>
      {showImage ? (
        <Img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </Circle>
  );
};

export type { SuperAvatarProps } from './SuperAvatar.types';
