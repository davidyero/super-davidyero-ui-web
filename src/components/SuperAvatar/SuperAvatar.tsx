import { useState, type ReactElement } from 'react';
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
  // Se recuerda qué `src` falló: si cambia, se vuelve a intentar con la nueva.
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <Circle $size={size} className={className} role="img" aria-label={name}>
      {showImage ? (
        <Img src={src} alt="" onError={() => setFailedSrc(src)} />
      ) : (
        <span aria-hidden>{initialsOf(name)}</span>
      )}
    </Circle>
  );
};

export type { SuperAvatarProps } from './SuperAvatar.types';
