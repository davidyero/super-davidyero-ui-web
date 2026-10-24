import styled from '@emotion/styled';
import { fontWeight, textScale, type FontWeight, type TextVariant } from '../../styles/scale';
import { textVar, v } from '../../theme/vars';
import type { TypographyAlign, TypographyColor } from './SuperTypography.types';

const DEFAULT_COLOR: Record<TextVariant, TypographyColor> = {
  display: 'text',
  h1: 'text',
  h2: 'text',
  h3: 'text',
  h4: 'text',
  h5: 'text',
  h6: 'text',
  title: 'text',
  subtitle: 'textBody',
  body: 'textBody',
  bodySmall: 'textBody',
  caption: 'textMuted',
  label: 'text',
};

export const defaultColorFor = (variant: TextVariant): TypographyColor => DEFAULT_COLOR[variant];

interface TextProps {
  $variant: TextVariant;
  $color: TypographyColor;
  $weight: FontWeight | undefined;
  $align: TypographyAlign | undefined;
  $truncate: boolean;
  $uppercase: boolean;
  $mono: boolean;
}

export const Text = styled.span<TextProps>(
  ({ $variant, $color, $weight, $align, $truncate, $uppercase, $mono }) => {
    const scale = textScale[$variant];
    return {
      margin: 0,
      fontFamily: $mono ? v.font.mono : scale.heading ? v.font.heading : v.font.base,
      fontSize: scale.fontSize,
      // Peso, interlineado, tracking y mayúsculas admiten ajuste por app (token
      // `typography`); sin él, mandan los valores de la escala.
      lineHeight: textVar($variant, 'lineHeight', scale.lineHeight),
      fontWeight: $weight ? fontWeight[$weight] : textVar($variant, 'fontWeight', scale.fontWeight),
      letterSpacing: $uppercase ? '0.04em' : textVar($variant, 'letterSpacing', 'normal'),
      textTransform: $uppercase ? 'uppercase' : textVar($variant, 'textTransform', 'none'),
      color: $color === 'inherit' ? 'inherit' : v[$color],
      textAlign: $align,
      ...($truncate
        ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }
        : { overflowWrap: 'anywhere' }),
    };
  },
);
