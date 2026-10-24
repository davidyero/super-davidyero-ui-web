# Changelog — @davidyero/ui-web

## 0.3.0 — 2026-10-24

Lo que echó en falta la plantilla `template-web`. Retrocompatible.

- `SuperInput` y `SuperTextarea` reenvían `ref` al elemento nativo (enfocar el primer campo
  con error, librerías de formularios).
- `SuperThemeProvider` acepta `LinkComponent`: con él, `SuperButton href="/ruta"` navega con
  el router de la app sin recargar. Los enlaces externos y los botones inactivos siguen
  siendo `<a>` normales, y las props de estilo ya no llegan al DOM.
- Entradas nuevas para los estilos de la app: `@davidyero/ui-web/scale` (`space`,
  `breakpoints`, `media`, `textScale`, `zIndex`) y `@davidyero/ui-web/vars` (`v.primary` →
  `var(--sd-primary)`), para no redefinirlos en cada app.

## 0.2.0 — 2026-10-24

Lo que necesitó el backoffice (primera app migrada) para verse igual que antes sin dejar
copias locales. Todo es retrocompatible con la 0.1.0 salvo los cambios de aspecto marcados.

- **Tokens derivados** (opcionales; si la app no los define, caen a su equivalente):
  `accent`, `accentSoft`, `onAccent` (marca distinta del color de acción, por defecto
  `primary`…), `textSubtle` (cuarto nivel de texto, por defecto `textMuted`) y
  `surfaceField` (fondo de los campos, por defecto `surface`).
- **Token `typography`**: ajuste por variante de peso, interlineado, tracking y mayúsculas
  (el tamaño sigue fijo y nunca baja de 13px). Se escribe como `--sd-text-<variante>-*`.
- `SuperTypography` y `SuperIcon` aceptan los colores `textSubtle`, `accent` y `onAccent`.
- `SuperButton`: variante `neutral` (gris con borde, sin color de marca).
- `SuperLoader`: `layout` (`inline` · `block` · `page`) para centrarlo en un bloque o a
  media pantalla.
- `SuperTextarea`: `maxCount` (contador informativo que no corta lo escrito) y `mono`.
- `toast`: el segundo argumento acepta también opciones `{ title, durationMs, action }`;
  `action` pinta un botón dentro del toast (p. ej. «Deshacer») que lo cierra al pulsarlo.
- **Cambios de aspecto**: los campos pasan a ser bloque (ocupan su fila en un formulario),
  la etiqueta de campo usa `textBody` con peso 500, la tarjeta interactiva resalta el borde
  con `accent`, y el estado activo de switch, casilla, pestañas y el spinner usan `accent`
  (igual que antes en las apps que no lo definen).

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
