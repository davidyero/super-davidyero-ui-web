import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Track = styled.div<{ $fullWidth: boolean }>(({ $fullWidth }) => ({
  display: $fullWidth ? 'flex' : 'inline-flex',
  width: $fullWidth ? '100%' : undefined,
  maxWidth: '100%',
  gap: space.xxs,
  padding: space.xxs,
  border: `1px solid ${v.border}`,
  borderRadius: v.radius.pill,
  background: v.surface,
  overflowX: 'auto',
  scrollbarWidth: 'none',
}));

export const Option = styled.button<{ $active: boolean; $size: 'sm' | 'md'; $fullWidth: boolean }>(
  ({ $active, $size, $fullWidth }) => ({
    flex: $fullWidth ? '1 1 0' : '0 0 auto',
    minHeight: $size === 'sm' ? '36px' : '44px',
    padding: `0 ${$size === 'sm' ? space.md : space.lg}`,
    border: 'none',
    borderRadius: v.radius.pill,
    // Activa: fondo de texto (tinta) con letra de superficie; inactiva: texto sobre superficie.
    background: $active ? v.text : 'transparent',
    color: $active ? v.surface : v.textBody,
    fontFamily: v.font.base,
    fontSize: '14px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: `background ${transition}, color ${transition}`,
    '&:hover:not(:disabled)': { color: $active ? v.surface : v.text },
    '&:disabled': { opacity: 0.55, cursor: 'not-allowed' },
    '&:focus-visible': focusVisible,
  }),
);
