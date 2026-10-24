import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { ButtonSize, ButtonVariant } from './SuperButton.types';

const SIZE: Record<ButtonSize, { height: string; padX: string; font: string; gap: string }> = {
  sm: { height: '32px', padX: space.md, font: '13px', gap: space.xs },
  md: { height: '40px', padX: space.lg, font: '14px', gap: space.sm },
  lg: { height: '48px', padX: space.xl, font: '15px', gap: space.sm },
};

// Cada fondo con su texto: onPrimary SOLO sobre primary pleno; los soft con su
// token de texto (regla de contraste del ecosistema).
const VARIANT: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css({
    background: v.primary,
    color: v.onPrimary,
    border: '1px solid transparent',
    '&:hover:not([aria-disabled="true"])': { background: v.primaryHover },
  }),
  secondary: css({
    background: v.primarySoft,
    color: v.primarySoftText,
    border: '1px solid transparent',
    '&:hover:not([aria-disabled="true"])': { borderColor: v.primary },
  }),
  // Gris con borde: acción secundaria sin color de marca.
  neutral: css({
    background: v.surfaceSunken,
    color: v.text,
    border: `1px solid ${v.border}`,
    '&:hover:not([aria-disabled="true"])': { borderColor: v.borderStrong },
  }),
  outline: css({
    background: 'transparent',
    color: v.text,
    border: `1px solid ${v.borderStrong}`,
    '&:hover:not([aria-disabled="true"])': { background: v.surfaceSunken },
  }),
  ghost: css({
    background: 'transparent',
    color: v.text,
    border: '1px solid transparent',
    '&:hover:not([aria-disabled="true"])': { background: v.surfaceSunken },
  }),
  danger: css({
    background: v.dangerSoft,
    color: v.dangerText,
    border: `1px solid ${v.danger}`,
    '&:hover:not([aria-disabled="true"])': { background: v.danger, color: v.surface },
  }),
};

interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $iconOnly: boolean;
}

const base = ({ $variant, $size, $fullWidth, $iconOnly }: ButtonStyleProps) => {
  const s = SIZE[$size];
  return css(
    {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      minWidth: $iconOnly ? s.height : undefined,
      width: $fullWidth ? '100%' : $iconOnly ? s.height : undefined,
      padding: $iconOnly ? 0 : `0 ${s.padX}`,
      borderRadius: v.radius.md,
      fontFamily: v.font.base,
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      transition: `background ${transition}, border-color ${transition}, color ${transition}, opacity ${transition}`,
      '&:focus-visible': focusVisible,
      '&[aria-disabled="true"]': { opacity: 0.55, cursor: 'not-allowed' },
      '&[aria-busy="true"]': { cursor: 'progress' },
    },
    VARIANT[$variant],
  );
};

export const ButtonEl = styled.button<ButtonStyleProps>(base);
// Con `as={LinkComponent}` Emotion pasaría todas las props al componente de la
// app; las de estilo (`$…`) no deben llegar al DOM.
export const AnchorEl = styled('a', {
  shouldForwardProp: (prop) => prop !== 'as' && !prop.startsWith('$'),
})<ButtonStyleProps>(base);

export const Content = styled.span<{ $hidden: boolean }>(({ $hidden }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'inherit',
  // opacity y no visibility: el texto sigue dando nombre accesible al botón
  // mientras el spinner ocupa su sitio.
  opacity: $hidden ? 0 : 1,
}));

export const SpinnerSlot = styled.span({
  position: 'absolute',
  inset: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});
