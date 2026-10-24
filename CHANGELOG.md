# Changelog — @davidyero/ui-web

## 0.1.0 — 2026-10-24

Primera versión. Design system web compartido por todas las webs del ecosistema.

- **Tema por variables CSS** (`--sd-*`): `SuperThemeProvider` recibe los tokens de la app
  (claro y oscuro), el modo, los textos accesibles desde su i18n y su registro de iconos.
- **21 componentes**: SuperTypography, SuperButton, SuperIcon, SuperCard, SuperBadge,
  SuperSkeleton, SuperLoader, SuperLoaderOverlay, SuperInput, SuperTextarea, SuperSwitch,
  SuperCheckbox, SuperDropdown, SuperModal, SuperTabs, SuperToast, SuperEmptyState,
  SuperAlert, SuperProgressBar, SuperAvatar, SuperBulletList y SuperTooltip.
- **Stores**: `loaderStore` (peticiones activas para el overlay global, con modo `silent`
  para polling) y `toast`.
- Entradas por subruta, sin barrels. `dist/` commiteado para instalar por git.
