import type { ReactElement } from 'react';

// Iconos propios (no Iconify): trazo en currentColor sobre una rejilla de 24.
// Ganan a cualquier nombre del registro del tema con el mismo nombre.

/** Guantelete de armadura: mano abierta con placas en los dedos y puño acampanado. */
const GAUNTLET = (
  <>
    <path d="M8.7 12.5V6.2a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M11.1 11V4.7a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M13.5 11V5.2a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M15.9 11V6.9a1.2 1.2 0 0 1 2.4 0v6.6" />
    <path d="M8.7 14.2 6.9 12a1.2 1.2 0 0 0-1.9 1.5l2.6 3.6" />
    <path d="M7.6 17.1c.6.9 1.6 1.4 2.7 1.4h5.4c1.4 0 2.6-1.2 2.6-2.6v-2.4" />
    <path d="M8.7 12.4h9.6" />
    <path d="M8.7 8.6h9.6" />
    <path d="M9.7 18.5l-.4 3h8.4l-.4-3" />
  </>
);

/** Destello de cuatro puntas: lo que distingue a SuperThanos de Thanos. */
const SPARKLE = (
  <path
    d="M4.5 1.2 5.4 3.6 7.8 4.5 5.4 5.4 4.5 7.8 3.6 5.4 1.2 4.5 3.6 3.6Z"
    fill="currentColor"
    strokeWidth={1}
  />
);

export const CUSTOM_ICONS: Readonly<Record<string, ReactElement>> = {
  thanos: GAUNTLET,
  superthanos: (
    <>
      {GAUNTLET}
      {SPARKLE}
    </>
  ),
};
