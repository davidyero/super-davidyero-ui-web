import styled from '@emotion/styled';
import { space } from '../../styles/scale';

/** Tamaño a la izquierda y flechas a la derecha; en móvil estrecho, una fila debajo de otra. */
export const Root = styled.nav({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: space.md,
  minWidth: 0,
});

export const SizeGroup = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
});

export const Pager = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: space.sm,
  marginLeft: 'auto',
});
