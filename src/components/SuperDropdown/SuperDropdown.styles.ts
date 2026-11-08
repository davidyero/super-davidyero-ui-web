import styled from '@emotion/styled';
import { controlBox, controlText } from '../../styles/field';
import { space, transition, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';

const HEIGHT = { sm: '34px', md: '42px', lg: '50px' } as const;

export const Box = styled.div<{ $invalid: boolean; $size: 'sm' | 'md' | 'lg'; $disabled: boolean }>(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    position: 'relative',
    height: HEIGHT[$size],
    opacity: $disabled ? 0.6 : 1,
  }),
);

/** El disparador: un botón con el valor elegido (o el placeholder) y la flecha. */
export const Trigger = styled.button<{ $placeholder: boolean }>(
  controlText,
  ({ $placeholder }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: `0 36px 0 ${space.md}`,
    textAlign: 'left',
    cursor: 'pointer',
    color: $placeholder ? v.textMuted : v.text,
    '&:disabled': { cursor: 'not-allowed' },
  }),
);

export const Value = styled.span({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const Chevron = styled.span<{ $open: boolean }>(({ $open }) => ({
  position: 'absolute',
  right: space.md,
  top: '50%',
  transform: `translateY(-50%) rotate(${$open ? 180 : 0}deg)`,
  transition: `transform ${transition}`,
  display: 'inline-flex',
  pointerEvents: 'none',
  color: v.textMuted,
}));

/** Lista en un portal con posición fija: no la recorta ningún contenedor con scroll. */
export const List = styled.ul<{ $up: boolean }>(({ $up }) => ({
  position: 'fixed',
  zIndex: zIndex.dropdown,
  margin: 0,
  padding: space.xs,
  listStyle: 'none',
  boxSizing: 'border-box',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  borderRadius: v.radius.md,
  border: `1px solid ${v.border}`,
  background: v.surfaceElevated,
  boxShadow: v.shadow.lg,
  transform: $up ? 'translateY(-100%)' : 'none',
  animation: 'sd-dropdown-in 120ms ease',
  '@keyframes sd-dropdown-in': {
    from: { opacity: 0, marginTop: $up ? '4px' : '-4px' },
  },
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
}));

export const Option = styled.li<{ $active: boolean; $selected: boolean; $disabled: boolean }>(
  ({ $active, $selected, $disabled }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    minHeight: '40px',
    padding: `0 ${space.md}`,
    borderRadius: v.radius.sm,
    fontFamily: v.font.base,
    fontSize: '14px',
    fontWeight: $selected ? 600 : 400,
    color: $disabled ? v.textSubtle : $selected ? v.primarySoftText : v.text,
    background: $selected ? v.primarySoft : $active ? v.surfaceSunken : 'transparent',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    // El texto baja de línea antes que salirse de la lista.
    overflowWrap: 'anywhere',
    '@media (pointer: coarse)': { minHeight: '44px', fontSize: '16px' },
  }),
);

export const OptionLabel = styled.span({ flex: 1, minWidth: 0 });

export const Check = styled.span({ display: 'inline-flex', flexShrink: 0 });
