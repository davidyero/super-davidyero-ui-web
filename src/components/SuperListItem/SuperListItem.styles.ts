import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Item = styled('button', {
  shouldForwardProp: (prop) => prop !== 'as' && !prop.startsWith('$'),
})<{ $hoverable: boolean; $clickable: boolean; $divider: boolean }>(
  ({ $hoverable, $clickable, $divider }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: space.md,
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    padding: `${space.sm} ${space.sm}`,
    border: 'none',
    borderBottom: $divider ? `1px solid ${v.border}` : 'none',
    borderRadius: $divider ? 0 : v.radius.sm,
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'left',
    transition: `background ${transition}`,
    ...($hoverable || $clickable ? { '&:hover': { background: v.surfaceSunken } } : {}),
    ...($clickable ? { cursor: 'pointer', '&:focus-visible': focusVisible } : {}),
  }),
);

export const Leading = styled.span({ display: 'inline-flex', flexShrink: 0 });

export const Content = styled.span({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: 1,
  minWidth: 0,
});

export const SubtitleFocus = styled.span({
  // flex: el texto truncado de dentro necesita ser un bloque para cortar con "…".
  display: 'flex',
  minWidth: 0,
  maxWidth: '100%',
  borderRadius: v.radius.sm,
  '&:focus-visible': focusVisible,
});

export const Meta = styled.span({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: space.xs,
  marginTop: space.xxs,
  minWidth: 0,
});

export const Trailing = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: space.xs,
});
