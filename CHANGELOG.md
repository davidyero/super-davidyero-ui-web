# Changelog — @davidyero/ui-web

## 0.16.0 — 2026-11-10

- Iconos de los 5 planes del ecosistema en `SuperIcon`, en SVG propio: `plan-free` (brote),
  `plan-lite` (corazón), `plan-pro` (copa), `plan-thanos` (guantelete con gemas) y
  `plan-superthanos` (el guantelete dorado con gemas de color y destello; el único con color
  fijo). `thanos` y `superthanos` siguen como alias.
- `SuperBadge` acepta `plan` (`SuperPlan`): pone el icono y el tono del plan. `PLAN_BADGE`
  exporta ese mapa para quien lo necesite fuera de una insignia.

## 0.15.1 — 2026-11-10

- `SuperModal` y `SuperDrawer`: al bloquear el scroll quitan el hueco de `scrollbar-gutter:
  stable` (en `html` y `body`) y lo compensan con `padding-right`. Con barras clásicas ya no queda
  una franja sin velo a la derecha ni salta el contenido.

## 0.15.0 — 2026-11-10

- `SuperDropdown` dentro de `SuperModal` o `SuperDrawer`: la lista (en portal) usa la capa nueva
  `zIndex.popover` (1100, entre modal y toast) y ya no queda debajo del diálogo. `SuperTooltip`
  tiene su propia capa `zIndex.tooltip` (1150).
- Escape con la lista de un `SuperDropdown` abierta cierra solo la lista, no el diálogo. Con
  varios `SuperModal`/`SuperDrawer` apilados, Escape y la trampa de Tab solo actúan en el de
  arriba. El diálogo escucha el teclado en fase de burbuja y respeta `preventDefault()`.
- `SuperModal` y `SuperDrawer` comparten el mismo velo neutro (`scrim` en `scale`); el drawer ya
  no usa la tinta del tema Pilates.
- `SuperTabs` y `SuperSegmented` comparten el hook del indicador deslizante y la curva `slide`
  de `scale`. Mismo aspecto que en 0.14.0.
- `SuperAuthTemplate`: la tarjeta saliente es `inert` (sus campos no se enfocan) y va después
  de la activa en el DOM, así los ids repetidos entre pantallas apuntan a la activa.
- `SuperInput`, `SuperTextarea` y `SuperDropdown` usan `FieldMessage` y `describedBy`
  (en `styles/field`). `SuperInput` y `SuperTextarea` suman el `aria-describedby` que reciben
  por props en vez de pisarlo.

## 0.14.0 — 2026-11-10

- `SuperTabs`: el subrayado de la pestaña activa se desliza a la nueva al cambiar (260 ms, sin
  animación con `prefers-reduced-motion`). Mide 2px, el doble de la línea base, y la tapa.

## 0.13.0 — 2026-11-09

- `SuperIcon` con iconos propios en SVG (no Iconify): `thanos` (guantelete de armadura) y
  `superthanos` (el mismo guantelete con un destello). Trazo en `currentColor`, legibles de
  14 a 20 px. Para el rol, plan o nivel Thanos y SuperThanos en todas las apps.

## 0.12.0 — 2026-11-09

- `SuperAuthTemplate` con `screenKey` y `screenDirection`: al cambiar de pantalla (login,
  registro, recuperar) la tarjeta completa sale deslizándose y la nueva entra por el lado
  contrario. Sin animación con `prefers-reduced-motion`.

## 0.11.0 — 2026-11-09

- `SuperAuthTemplate` acepta `backdrop`: decoración propia de la app (figuras animadas de su
  temática) sobre la rejilla y los halos, detrás de todo y sin recibir clics.

## 0.10.0 — 2026-11-09

- `SuperSegmented`: el fondo de la opción activa se desliza al cambiar (260 ms, sin animación
  con `prefers-reduced-motion`). Las opciones aceptan `icon`.
- `SuperSegmented variant="icon"`: solo iconos redondos (selector de idioma con banderas); la
  activa sobre un círculo de superficie y la otra atenuada. El `label` pasa a nombre accesible.
- `SuperFlag`: bandera redonda (`co`, `us`, `gb`, `es`, `mx`, `br`), decorativa salvo con `label`.

## 0.9.1 — 2026-11-09

- `SuperPagination` en móvil (menos de 600px, también el Z Fold cerrado): flechas y resumen a
  todo el ancho y el selector de tamaño debajo. Desde `sm` sigue en una fila. Las flechas van
  primero en el orden del teclado.

## 0.9.0 — 2026-11-09

- Tema **Pilates** en `@davidyero/ui-web/themes/pilates` (`pilatesTokens`, `PILATES_FONTS_HREF`,
  `PILATES_TYPE_COLORS`), según la especificación del refactor de Agenda Pilates. Solo claro.
- Token opcional `radius.button` (por defecto, el de `md`): botones en píldora sin cambiar los
  campos. `SuperButton` lo usa.
- `SuperSegmented`: selector en píldora para 2–4 opciones, la activa en tinta, con flechas.
- `SuperDrawer`: panel lateral derecho (pantalla completa en móvil) con pie fijo; mismo foco y
  Escape que `SuperModal`.
- `SuperStepper`: − valor + para números de reglas, con texto legible ("6 h antes").
- `SuperInput` acepta `prefix` (segmento fijo, p. ej. `+57`).

## 0.8.1 — 2026-11-08

- `SuperDropdown`: la lista mide al menos lo que el botón y crece si una opción lo necesita
  (sin salirse de la pantalla). Antes "Orden: fecha" se partía en dos líneas en un botón estrecho.

## 0.8.0 — 2026-11-08

- `SuperDropdown` deja de ser el `<select>` nativo: botón con la opción elegida y una lista
  propia con los colores del tema (elegida en `primarySoft` con check, activa en
  `surfaceSunken`). Misma API: las apps no cambian código.
- Teclado y lectores de pantalla con el patrón WAI-ARIA de combobox de solo selección:
  flechas (saltan las deshabilitadas), Inicio/Fin, Enter/Espacio, Escape, Tab y búsqueda por
  letra. Se cierra con clic fuera.
- La lista va en un portal con posición fija: no la recorta un contenedor con scroll (columnas
  de filtros, hojas). Si no cabe debajo, se abre hacia arriba.

## 0.7.0 — 2026-11-08

Sin cambios visuales ni de API.

- Peers: `react` y `react-dom` pasan de `>=18` a `^18.2.0 || ^19.0.0` (los dos que se prueban).
- Herramientas a su mayor: eslint 10, `@eslint/js` 10, `eslint-plugin-react-hooks` 7, vite 8,
  `@vitejs/plugin-react` 6, vitest 5, jsdom 31, `@testing-library/jest-dom` 7, tsup 9 y
  TypeScript 6.0. Vitest transforma con Oxc (`oxc.jsx`) en vez de esbuild.
- Las reglas nuevas de react-hooks 7 pidieron tres ajustes sin cambio de comportamiento:
  `SuperAvatar` recuerda qué `src` falló en vez de reiniciar con un efecto, `SuperModal`
  actualiza su ref de `onClose` en un efecto y `SuperLoaderOverlay` reinicia el retardo en el
  cleanup.

## 0.6.1 — 2026-11-08

Sin cambios visuales.

- `scale`: nuevo `space.xxxl` (48px) y `fluidText.hero` (titular fluido de 26 a 44px).
  `SuperAuthTemplate` los usa en vez de valores literales, y pinta los chips del carrusel y su
  copia con un solo bloque.
- `SuperCheckbox` y `SuperSwitch` comparten label, input oculto y textos (`styles/choice.ts`).

## 0.6.0 — 2026-11-06

- `SuperPagination`: anterior y siguiente con un resumen entre las flechas (`summary`, lo arma
  la app) y, opcional, el selector de cuántos por página (`pageSize`, `pageSizeOptions`,
  `onPageSizeChange`). No corta la lista: eso lo hace la app.
- Iconos internos `chevronLeft` y `chevronRight`.

## 0.5.0 — 2026-11-06

- `SuperAuthTemplate`: plantilla de login y registro. Marca con su frase, el formulario sobre
  vidrio y un fondo de rejilla con dos halos en `primary` y `accent` que se mueven despacio.
  `highlights` pinta chips en carrusel (quietos y sin copia con movimiento reducido). En móvil
  va en una columna; desde `lg`, marca a la izquierda y formulario a la derecha.

## 0.4.2 — 2026-11-06

- `SuperThemeProvider`: en pantallas táctiles, todo `input`, `textarea` y `select` de la app va a
  16px, aunque no sea del design system. Evita el zoom de iOS al enfocar.

## 0.4.1 — 2026-11-06

- `SuperInput`, `SuperTextarea` y demás campos: texto a 16px en pantallas táctiles. Con 14px,
  iOS ampliaba la página al tocar un campo y la dejaba así.

## 0.4.0 — 2026-10-24

Lo que necesitó el dashboard (segunda app migrada) para quedarse sin copias locales.
Retrocompatible.

- `SuperCard`: cabecera opcional (`title`, `subtitle`, `trailing`), `minHeight` y atributos
  ARIA (`role`, `tabIndex`, `aria-*`) para cards interactivas.
- `SuperBadge`: `wrap` (texto largo en varias líneas) y `onRemove` + `removeLabel` (etiqueta
  con X para quitarla).
- `SuperButton`: variante `success` (confirmar algo positivo, mismo patrón que `danger`).
- `SuperInput`: `invalid` (sin mensaje), `mono` (importes, códigos) y `onClear` (X para
  vaciar; su etiqueta sale de `labels.clear`, opcional).
- `SuperModal`: `subtitle` bajo el título.
- `SuperProgressBar`: tono `info`.
- `SuperSkeleton`: `aspectRatio` (gana a `height`).
- `SuperTypography`: `role`, `aria-live` y `aria-label` (mensajes de estado anunciados).

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
