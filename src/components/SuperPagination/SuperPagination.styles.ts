import styled from '@emotion/styled';
import { media, space } from '../../styles/scale';

/**
 * Móvil (y Z Fold cerrado): flechas y resumen a todo el ancho y el selector de tamaño debajo.
 * Desde `sm`, una sola fila: tamaño a la izquierda y flechas a la derecha.
 */
export const Root = styled.nav({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: space.sm,
  minWidth: 0,
  [media.sm]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },
});

export const SizeGroup = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: space.sm,
  [media.sm]: { order: -1, justifyContent: 'flex-start' },
});

export const Pager = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: space.sm,
  minWidth: 0,
  [media.sm]: { justifyContent: 'flex-end', marginLeft: 'auto' },
});
