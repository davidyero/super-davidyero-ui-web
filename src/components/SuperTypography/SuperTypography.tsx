import type { ElementType, ReactElement } from 'react';
import type { TextVariant } from '../../styles/scale';
import { defaultColorFor, Text } from './SuperTypography.styles';
import type { SuperTypographyProps } from './SuperTypography.types';

const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  title: 'h2',
  subtitle: 'p',
  body: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'span',
};

/** Todo texto de la app pasa por aquí. La escala vive en un solo sitio y no baja de 13px. */
export const SuperTypography = ({
  variant = 'body',
  as,
  color,
  weight,
  align,
  truncate = false,
  uppercase = false,
  mono = false,
  id,
  title,
  className,
  children,
}: SuperTypographyProps): ReactElement => (
  <Text
    as={as ?? DEFAULT_TAG[variant]}
    $variant={variant}
    $color={color ?? defaultColorFor(variant)}
    $weight={weight}
    $align={align}
    $truncate={truncate}
    $uppercase={uppercase}
    $mono={mono}
    id={id}
    title={title ?? (truncate && typeof children === 'string' ? children : undefined)}
    className={className}
  >
    {children}
  </Text>
);

export type {
  SuperTypographyProps,
  TypographyColor,
  TypographyAlign,
  TextVariant,
} from './SuperTypography.types';
