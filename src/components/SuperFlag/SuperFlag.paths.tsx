import type { ReactElement } from 'react';
import type { SuperFlagCountry } from './SuperFlag.types';

/*
 * Banderas en un lienzo de 32×32 que luego se recorta en círculo. Sus colores son
 * los oficiales de cada país: datos, no tema, por eso no salen de los tokens.
 */
export const FLAG_PATHS: Record<SuperFlagCountry, ReactElement> = {
  co: (
    <>
      <rect width="32" height="16" fill="#FCD116" />
      <rect y="16" width="32" height="8" fill="#003893" />
      <rect y="24" width="32" height="8" fill="#CE1126" />
    </>
  ),
  us: (
    <>
      <rect width="32" height="32" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((row) => (
        <rect key={row} y={(row * 32) / 13} width="32" height={32 / 13} fill="#B22234" />
      ))}
      <rect width="16" height={(7 * 32) / 13} fill="#3C3B6E" />
      {[3, 8, 13].flatMap((x) =>
        [3, 7.5, 12].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill="#FFFFFF" />),
      )}
    </>
  ),
  gb: (
    <>
      <rect width="32" height="32" fill="#012169" />
      <path d="M0 0L32 32M32 0L0 32" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2" />
      <path d="M16 0V32M0 16H32" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="6" />
    </>
  ),
  es: (
    <>
      <rect width="32" height="32" fill="#AA151B" />
      <rect y="8" width="32" height="16" fill="#F1BF00" />
    </>
  ),
  mx: (
    <>
      <rect width="11" height="32" fill="#006847" />
      <rect x="11" width="10" height="32" fill="#FFFFFF" />
      <rect x="21" width="11" height="32" fill="#CE1126" />
      <circle cx="16" cy="16" r="3" fill="#8C6A2F" />
    </>
  ),
  br: (
    <>
      <rect width="32" height="32" fill="#009C3B" />
      <path d="M16 5L29 16L16 27L3 16Z" fill="#FFDF00" />
      <circle cx="16" cy="16" r="6" fill="#002776" />
    </>
  ),
};
