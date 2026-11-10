import { useState, type ReactElement, type ReactNode } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import {
  Backdrop,
  BrandSlot,
  Card,
  Chip,
  Foot,
  FormArea,
  Glow,
  Hero,
  Marquee,
  Pitch,
  Rule,
  Shell,
  Tagline,
  Top,
  Track,
  type CardMotion,
} from './SuperAuthTemplate.styles';
import type { SuperAuthTemplateProps } from './SuperAuthTemplate.types';

interface Screen {
  key: string | undefined;
  node: ReactNode;
}

/**
 * `inert` por el DOM y no como prop: React 18 no la conoce (la descarta con un aviso) y en
 * React 19 es booleana. Así funciona igual en las dos versiones que admite la librería.
 */
const makeInert = (node: HTMLElement | null): void => {
  node?.setAttribute('inert', '');
};

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Plantilla de login y registro: marca con su frase, el formulario sobre vidrio
 * y un fondo de rejilla con halos en los colores de la app. En móvil va todo en
 * una columna; desde `lg`, la marca a la izquierda y el formulario a la derecha.
 * Con `screenKey`, el cambio de pantalla desliza la tarjeta completa.
 */
export const SuperAuthTemplate = ({
  brand,
  tagline,
  hint,
  highlights = [],
  topActions,
  backdrop,
  footer,
  children,
  screenKey,
  screenDirection = 'forward',
  className,
}: SuperAuthTemplateProps): ReactElement => {
  // La tarjeta que sale se queda montada (con su contenido) hasta que termina su
  // animación; la nueva entra por el lado contrario.
  const [current, setCurrent] = useState<Screen>({ key: screenKey, node: children });
  const [leaving, setLeaving] = useState<Screen | null>(null);
  const [moved, setMoved] = useState(false);
  if (screenKey !== current.key) {
    setLeaving(prefersReducedMotion() ? null : current);
    setCurrent({ key: screenKey, node: children });
    setMoved(true);
  }
  const enter: CardMotion = moved ? `enter-${screenDirection}` : 'rise';

  return (
    <Shell className={className}>
      <Backdrop aria-hidden>
        <Glow $tone="primary" />
        <Glow $tone="accent" />
        {backdrop}
      </Backdrop>

      {topActions ? <Top>{topActions}</Top> : null}

      <Hero>
        <BrandSlot>{brand}</BrandSlot>
        <Pitch>
          <Tagline>
            <SuperTypography variant="display" as="p">
              {tagline}
            </SuperTypography>
          </Tagline>
          <Rule aria-hidden />
          {hint ? (
            <SuperTypography variant="body" color="textMuted">
              {hint}
            </SuperTypography>
          ) : null}
          {highlights.length > 0 ? (
            <Marquee>
              <Track>
                {/* Segunda copia para que el carrusel no tenga corte; el lector solo oye la primera. */}
                {[false, true].map((copy) =>
                  highlights.map((item) => (
                    <Chip
                      key={copy ? `${item.label}-copy` : item.label}
                      $copy={copy}
                      aria-hidden={copy || undefined}
                    >
                      <SuperIcon name={item.icon} size={14} />
                      <SuperTypography variant="caption" as="span" color="inherit">
                        {item.label}
                      </SuperTypography>
                    </Chip>
                  )),
                )}
              </Track>
            </Marquee>
          ) : null}
        </Pitch>
      </Hero>

      <FormArea>
        {/* La tarjeta activa va primero en el DOM: si las dos pantallas repiten ids (p. ej.
            id="email"), `getElementById` y los `<label htmlFor>` dan con la activa. */}
        <Card key={current.key ?? 'screen'} $motion={enter}>
          {children}
        </Card>
        {leaving ? (
          <Card
            key={leaving.key ?? 'leaving'}
            ref={makeInert}
            $motion={`exit-${screenDirection}`}
            aria-hidden
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) setLeaving(null);
            }}
          >
            {leaving.node}
          </Card>
        ) : null}
      </FormArea>

      {footer ? <Foot>{footer}</Foot> : null}
    </Shell>
  );
};

export type {
  SuperAuthHighlight,
  SuperAuthScreenDirection,
  SuperAuthTemplateProps,
} from './SuperAuthTemplate.types';
