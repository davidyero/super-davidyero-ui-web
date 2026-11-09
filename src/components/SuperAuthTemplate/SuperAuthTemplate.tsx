import type { ReactElement } from 'react';
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
} from './SuperAuthTemplate.styles';
import type { SuperAuthTemplateProps } from './SuperAuthTemplate.types';

/**
 * Plantilla de login y registro: marca con su frase, el formulario sobre vidrio
 * y un fondo de rejilla con halos en los colores de la app. En móvil va todo en
 * una columna; desde `lg`, la marca a la izquierda y el formulario a la derecha.
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
  className,
}: SuperAuthTemplateProps): ReactElement => (
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
      <Card>{children}</Card>
    </FormArea>

    {footer ? <Foot>{footer}</Foot> : null}
  </Shell>
);

export type { SuperAuthHighlight, SuperAuthTemplateProps } from './SuperAuthTemplate.types';
