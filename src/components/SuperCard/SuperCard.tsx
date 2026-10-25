import type { ReactElement } from 'react';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { CardHeader, CardRoot, CardTitleArea } from './SuperCard.styles';
import type { SuperCardProps } from './SuperCard.types';

/** Contenedor de bloque. Variantes por `variant`/`padding`, nunca una card nueva. */
export const SuperCard = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  title,
  subtitle,
  trailing,
  minHeight,
  as,
  onClick,
  className,
  id,
  children,
  ...aria
}: SuperCardProps): ReactElement => {
  const hasHeader = Boolean(title || subtitle || trailing);
  return (
    <CardRoot
      {...aria}
      as={as}
      $variant={variant}
      $padding={padding}
      $interactive={interactive}
      $minHeight={minHeight}
      onClick={onClick}
      className={className}
      id={id}
    >
      {hasHeader ? (
        <CardHeader $padding={padding}>
          <CardTitleArea>
            {title ? (
              <SuperTypography variant="label" color="textSubtle" as="div">
                {title}
              </SuperTypography>
            ) : null}
            {subtitle ? (
              <SuperTypography variant="caption" color="textSubtle" as="div">
                {subtitle}
              </SuperTypography>
            ) : null}
          </CardTitleArea>
          {trailing}
        </CardHeader>
      ) : null}
      {children}
    </CardRoot>
  );
};

export type { SuperCardProps, CardVariant, CardPadding } from './SuperCard.types';
