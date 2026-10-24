import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const List = styled.div({
  display: 'flex',
  gap: space.xs,
  borderBottom: `1px solid ${v.border}`,
  overflowX: 'auto',
  scrollbarWidth: 'none',
});

export const Tab = styled.button<{ $active: boolean; $size: 'sm' | 'md' }>(
  ({ $active, $size }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.xs,
    padding: $size === 'sm' ? `${space.xs} ${space.sm}` : `${space.sm} ${space.md}`,
    marginBottom: '-1px',
    border: 'none',
    borderBottom: `2px solid ${$active ? v.primary : 'transparent'}`,
    background: 'transparent',
    color: $active ? v.text : v.textMuted,
    fontFamily: v.font.base,
    fontSize: $size === 'sm' ? '13px' : '14px',
    fontWeight: $active ? 600 : 500,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: `color ${transition}, border-color ${transition}`,
    '&:hover:not(:disabled)': { color: v.text },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
    '&:focus-visible': { ...focusVisible, borderRadius: v.radius.sm },
  }),
);

export const Count = styled.span<{ $active: boolean }>(({ $active }) => ({
  minWidth: '20px',
  padding: `1px ${space.xs}`,
  borderRadius: v.radius.pill,
  background: $active ? v.primarySoft : v.surfaceSunken,
  color: $active ? v.primarySoftText : v.textMuted,
  fontSize: '13px',
  fontWeight: 600,
  lineHeight: 1.4,
  textAlign: 'center',
}));
