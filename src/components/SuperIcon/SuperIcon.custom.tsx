import type { ReactElement } from 'react';

// Iconos propios (no Iconify): trazo de 1.75 en currentColor sobre una rejilla de 24.
// Ganan a cualquier nombre del registro del tema con el mismo nombre. Cada uno recibe
// un id único por instancia para lo que necesite <defs> (el degradado de SuperThanos).

type CustomIcon = (uid: string) => ReactElement;

/** Guantelete de armadura: mano abierta, placa en los nudillos y puño acampanado. */
const GAUNTLET = (
  <>
    <path d="M8.7 12.5V6.2a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M11.1 11V4.7a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M13.5 11V5.2a1.2 1.2 0 0 1 2.4 0V11" />
    <path d="M15.9 11V6.9a1.2 1.2 0 0 1 2.4 0v6.6" />
    <path d="M8.7 14.2 6.9 12a1.2 1.2 0 0 0-1.9 1.5l2.6 3.6" />
    <path d="M7.6 17.1c.6.9 1.6 1.4 2.7 1.4h5.4c1.4 0 2.6-1.2 2.6-2.6v-2.4" />
    <path d="M8.7 12.4h9.6" />
    <path d="M9.7 18.5l-.4 3h8.4l-.4-3" />
  </>
);

/** Tres gemas en rombo sobre el dorso (a propósito, no la disposición del Guantelete del Infinito). */
const gems = (fills: readonly [string, string, string]): ReactElement => (
  <>
    {[10.9, 13.5, 16.1].map((x, i) => (
      <path
        key={x}
        d={`M${x} 13.9 ${x + 1.15} 15.45 ${x} 17 ${x - 1.15} 15.45Z`}
        fill={fills[i]}
        stroke="none"
      />
    ))}
  </>
);

/** Destello de cuatro puntas: lo que distingue a SuperThanos. */
const sparkle = (fill: string): ReactElement => (
  <path
    d="M4.5 1.2 5.4 3.6 7.8 4.5 5.4 5.4 4.5 7.8 3.6 5.4 1.2 4.5 3.6 3.6Z"
    fill={fill}
    stroke="none"
  />
);

const free: CustomIcon = () => (
  <>
    <path d="M12 21v-8" />
    <path d="M12 13c0-3.5-2.6-6-6.5-6 0 3.6 2.6 6 6.5 6Z" />
    <path d="M12 11c0-3.2 2.3-5.5 6-5.5 0 3.2-2.4 5.5-6 5.5Z" />
    <path d="M8 21h8" />
  </>
);

const lite: CustomIcon = () => (
  <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
);

const pro: CustomIcon = () => (
  <>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 5.5H5.5v1.2A3 3 0 0 0 8.4 9.8" />
    <path d="M16 5.5h2.5v1.2a3 3 0 0 1-2.9 3.1" />
    <path d="M12 13v4" />
    <path d="M8.5 20.5h7l-.8-3.5H9.3Z" />
  </>
);

const thanos: CustomIcon = () => (
  <>
    {GAUNTLET}
    {gems(['currentColor', 'currentColor', 'currentColor'])}
  </>
);

/** El único icono con color fijo: dorado brillante y gemas de color, ignore el tema. */
const superthanos: CustomIcon = (uid) => (
  <>
    <defs>
      <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFE08A" />
        <stop offset=".5" stopColor="#E5A823" />
        <stop offset="1" stopColor="#A86B0C" />
      </linearGradient>
    </defs>
    <g stroke={`url(#${uid})`}>{GAUNTLET}</g>
    {gems(['#E5484D', '#3E7BFA', '#30A46C'])}
    {sparkle('#FFC53D')}
  </>
);

// Roles de equipo: corona, escudo, lápiz, ojo, campana, carnet, persona y mazo.
const roleOwner: CustomIcon = () => (
  <>
    <path d="M4 17.5 3 7.5l5 4 4-6.5 4 6.5 5-4-1 10Z" />
    <path d="M4.5 20.5h15" />
  </>
);

const roleAdmin: CustomIcon = () => (
  <>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </>
);

const roleEditor: CustomIcon = () => (
  <>
    <path d="M15.5 4.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    <path d="m13.5 6.5 3 3" />
    <path d="M12 20h8" />
  </>
);

const roleViewer: CustomIcon = () => (
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

const roleReception: CustomIcon = () => (
  <>
    <path d="M4 17h16" />
    <path d="M5.5 17a6.5 6.5 0 0 1 13 0" />
    <path d="M12 10.5V8.5" />
    <path d="M10.5 8.5h3" />
    <path d="M3 20h18" />
  </>
);

const roleStaff: CustomIcon = () => (
  <>
    <rect x="5" y="6" width="14" height="15" rx="2" />
    <path d="M9.5 3h5v4.5h-5Z" />
    <circle cx="12" cy="12.5" r="2" />
    <path d="M8.5 18c.6-1.5 1.9-2.3 3.5-2.3s2.9.8 3.5 2.3" />
  </>
);

const roleMember: CustomIcon = () => (
  <>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5c.9-3.6 3.9-5.7 7.5-5.7s6.6 2.1 7.5 5.7" />
  </>
);

const roleModerator: CustomIcon = () => (
  <>
    <path d="m13.5 4.5 6 6" />
    <path d="m11 7 6 6" />
    <path d="m10.2 7.8 5 5-2.4 2.4-5-5Z" />
    <path d="m10.1 12.9-6.6 6.6" />
    <path d="M13 20.5h8" />
  </>
);

/** Planes (free · lite · pro · thanos · superthanos) y roles de equipo del ecosistema. */
export const CUSTOM_ICONS: Readonly<Record<string, CustomIcon>> = {
  'plan-free': free,
  'plan-lite': lite,
  'plan-pro': pro,
  'plan-thanos': thanos,
  'plan-superthanos': superthanos,
  // Roles de equipo; thanos y superthanos son los mismos guanteletes de los planes.
  'role-owner': roleOwner,
  'role-admin': roleAdmin,
  'role-editor': roleEditor,
  'role-viewer': roleViewer,
  'role-reception': roleReception,
  'role-staff': roleStaff,
  'role-member': roleMember,
  'role-moderator': roleModerator,
  'role-thanos': thanos,
  'role-superthanos': superthanos,
  // Alias de la 0.13.0.
  thanos,
  superthanos,
};
