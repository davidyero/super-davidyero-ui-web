# @davidyero/ui-web

Design system web del ecosistema super-davidyero. **Una sola implementación** de cada
componente `Super*` para todas las webs. **Cada app conserva su aspecto** porque los
componentes no traen colores: leen variables CSS (`--sd-*`) que escribe la app con sus
tokens.

> **La regla:** si a tu app le falta un aspecto, añade una **variante** o un **token**
> aquí. Nunca un componente nuevo en la app (`<SuperButton variant="danger" />`, jamás
> `<DeleteButton />`).

## Instalación

Se instala por git, fijando la etiqueta de versión:

```bash
npm i "github:davidyero/super-davidyero-ui-web#v0.3.0"
```

Peers que la app ya tiene: `react` y `react-dom` (≥18), `@emotion/react`,
`@emotion/styled` y `@iconify/react` (≥5).

Cada componente se importa por su subruta (sin barrels):

```ts
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperThemeProvider, defineTokens } from '@davidyero/ui-web/theme';
import { loaderStore } from '@davidyero/ui-web/loader';
import { toast } from '@davidyero/ui-web/toast';
```

## Montaje (una vez, en la raíz)

```tsx
import { useTranslation } from 'react-i18next';
import { SuperThemeProvider } from '@davidyero/ui-web/theme';
import { SuperLoaderOverlay } from '@davidyero/ui-web/SuperLoaderOverlay';
import { SuperToast } from '@davidyero/ui-web/SuperToast';
import { appTokens } from './theme/tokens';
import { appIcons } from './theme/icons';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation('common');
  const mode = useThemeMode(); // 'light' | 'dark', del store de la app
  // useMemo para no reescribir las variables en cada render.
  const labels = useMemo(
    () => ({
      showPassword: t('a11y.showPassword'),
      hidePassword: t('a11y.hidePassword'),
      close: t('a11y.close'),
      loading: t('a11y.loading'),
      dismiss: t('a11y.dismiss'),
    }),
    [t],
  );
  return (
    <SuperThemeProvider tokens={appTokens} mode={mode} labels={labels} icons={appIcons}>
      {children}
      <SuperLoaderOverlay />
      <SuperToast />
    </SuperThemeProvider>
  );
};
```

La librería **no trae textos en ningún idioma**: los textos accesibles (`labels`) salen
del i18n de la app, en EN y ES.

## Tokens: el aspecto de cada app

```ts
import { defineTokens } from '@davidyero/ui-web/theme';

export const appTokens = defineTokens({
  light: {
    primary: '#0f766e',
    primaryHover: '#115e59',
    primarySoft: '#e3f4f1',
    primarySoftText: '#134e4a',
    radius: { md: '14px' },
    fontFamily: { base: 'Inter, sans-serif' },
  },
  dark: {
    primary: '#2dd4bf',
    onPrimary: '#042f2e',
    primarySoft: '#0f2e2b',
    primarySoftText: '#99f6e4',
  },
});
```

Lo que no definas cae a unos valores neutros y legibles. Contrato completo:

| Grupo       | Tokens                                                                                                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Superficies | `background`, `surface`, `surfaceSunken`, `surfaceElevated`                                                                                    |
| Bordes      | `border`, `borderStrong`                                                                                                                       |
| Texto       | `text`, `textBody`, `textMuted`                                                                                                                |
| Marca       | `primary`, `primaryHover`, `onPrimary`, `primarySoft`, `primarySoftText`                                                                       |
| Semánticos  | `success`/`successSoft`/`successText`, `warning`/`warningSoft`/`warningText`, `danger`/`dangerSoft`/`dangerText`, `info`/`infoSoft`/`infoText` |
| Foco        | `focusRing`                                                                                                                                    |
| Fuentes     | `fontFamily.base`, `fontFamily.heading`, `fontFamily.mono`                                                                                     |
| Radios      | `radius.sm`, `radius.md`, `radius.lg`, `radius.pill`                                                                                           |
| Sombras     | `shadow.sm`, `shadow.md`, `shadow.lg`                                                                                                          |

**Contraste:** `onPrimary` es solo para texto sobre `primary` pleno, y cada fondo soft usa
su token de texto (`primarySoft`→`primarySoftText`, `successSoft`→`successText`…).
Comprueba los dos modos. El espaciado y la escala tipográfica son fijos en la librería, y
**ningún texto baja de 13px**.

**Tokens opcionales** (si no los defines, se derivan): `accent`/`accentSoft`/`onAccent`
(color de marca distinto del de acción; por defecto, los de `primary`), `textSubtle` (cuarto
nivel de texto; por defecto `textMuted`) y `surfaceField` (fondo de los campos; por defecto
`surface`).

**Ajuste tipográfico por app** (`typography`): peso, interlineado, tracking y mayúsculas de
cada variante. El tamaño no se toca.

```ts
typography: {
  label: { textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 },
  h1: { fontWeight: 600 },
}
```

## Enlaces internos con el router

```tsx
import { Link } from 'react-router-dom';
import type { SuperLinkComponent } from '@davidyero/ui-web/theme';

const RouterLink: SuperLinkComponent = ({ href, ...rest }) => <Link to={href} {...rest} />;

<SuperThemeProvider LinkComponent={RouterLink} /* … */>
```

Con eso, `<SuperButton href="/ajustes">` navega sin recargar. Los `href` externos
(`https://…`) siguen abriendo en pestaña nueva.

## Estilos de la app

Para que la app no redefina espaciado ni breakpoints:

```ts
import { media, space } from '@davidyero/ui-web/scale';
import { v } from '@davidyero/ui-web/vars';

export const Panel = styled.section({
  padding: space.lg,
  background: v.surface,
  [media.md]: { padding: space.xl },
});
```

## Iconos

`SuperIcon name="settings"` resuelve el nombre en el registro `icons` del provider
(nombre semántico → id de [Iconify](https://icon-sets.iconify.design/)). También acepta un
id directo (`solar:home-2-broken`). La librería trae los suyos (`eye`, `eyeOff`, `close`,
`check`, `chevronDown`, `info`, `success`, `warning`, `danger`, `empty`), y la app puede
sobrescribirlos.

## Loader global en el cliente HTTP

`SuperLoaderOverlay` se enciende mientras `loaderStore` tenga peticiones activas, y aguanta
peticiones solapadas.

```ts
// axios
import { loaderStore } from '@davidyero/ui-web/loader';

api.interceptors.request.use((config) => {
  if (!config.background) config.release = loaderStore.start();
  return config;
});
api.interceptors.response.use(
  (res) => {
    res.config.release?.();
    return res;
  },
  (err) => {
    err.config?.release?.();
    return Promise.reject(err);
  },
);

// fetch
export const http = <T>(url: string, init?: RequestInit, opts?: { background?: boolean }) =>
  loaderStore.track(
    fetch(url, init).then((r) => r.json() as Promise<T>),
    {
      silent: opts?.background,
    },
  );
```

El polling, los refetch en segundo plano y el autosave van con `silent` (o sin `start()`),
para que la app no parpadee sola. Para bloquear la pantalla a mano en una acción crítica:
`const stop = loaderStore.start(); … stop();`.

## Componentes

| Componente                      | Props principales                                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SuperTypography`               | `variant` (display, h1–h6, title, subtitle, body, bodySmall, caption, label), `color`, `weight`, `align`, `truncate`, `as`                              |
| `SuperButton`                   | `variant` (primary, secondary, neutral, outline, ghost, danger), `size`, `loading`, `disabled`, `leftIcon`/`rightIcon`, `iconOnly`, `href`, `fullWidth` |
| `SuperIcon`                     | `name`, `size`, `color`, `spin`, `label`                                                                                                                |
| `SuperCard`                     | `variant` (default, sunken, elevated, outline), `padding`, `interactive`, `as`                                                                          |
| `SuperBadge`                    | `tone` (neutral, primary, success, warning, danger, info), `size`, `icon`, `dot`                                                                        |
| `SuperSkeleton`                 | `variant` (text, block, circle), `width`, `height`, `lines`                                                                                             |
| `SuperLoader`                   | `size`, `layout` (inline/block/page), `color`, `decorative`                                                                                             |
| `SuperLoaderOverlay`            | `visible` (opcional; por defecto lo decide `loaderStore`), `delayMs`                                                                                    |
| `SuperInput`                    | `label`, `error`, `hint`, `leftIcon`/`rightIcon`, `size`, `fullWidth`; `type="password"` trae el ojo                                                    |
| `SuperTextarea`                 | `label`, `error`, `hint`, `showCount` + `maxLength`, `maxCount`, `mono`                                                                                 |
| `SuperSwitch` / `SuperCheckbox` | `checked`, `onChange(checked)`, `label`, `hint`, `ariaLabel`                                                                                            |
| `SuperDropdown`                 | `value`, `onChange`, `options`, `label`, `placeholder`, `error`, `ariaLabel` (select nativo)                                                            |
| `SuperModal`                    | `open`, `onClose`, `title`, `footer`, `width`, `closeOnBackdrop`                                                                                        |
| `SuperTabs`                     | `items` (id, label, icon, count, disabled), `value`, `onChange`, `ariaLabel`                                                                            |
| `SuperToast` + `toast`          | `toast.success/error/warning/info(message, title \| { title, durationMs, action })`, `toast.dismiss(id)`                                                |
| `SuperEmptyState`               | `icon`, `title`, `description`, `action`, `compact`                                                                                                     |
| `SuperAlert`                    | `tone`, `title`, `dismissible`, `onDismiss`, `action`                                                                                                   |
| `SuperProgressBar`              | `value`, `max`, `tone`, `size`, `label`, `showValue`                                                                                                    |
| `SuperAvatar`                   | `name`, `src`, `size`                                                                                                                                   |
| `SuperBulletList`               | `items`, `ordered`, `spacing`                                                                                                                           |
| `SuperTooltip`                  | `label`, `placement`, un único hijo enfocable                                                                                                           |

## Desarrollo

```bash
npm run dev    # playground: todos los componentes, claro/oscuro y dos juegos de tokens
npm run ci     # typecheck, lint, formato, tests, build y check de dist/
```

`dist/` va commiteado (se instala por git): después de tocar `src/`, `npm run build` y
commitea `dist/`. El CI falla si no está al día. Para publicar: sube la versión en
`package.json`, añade la entrada al `CHANGELOG.md` y crea la etiqueta `vX.Y.Z`.
