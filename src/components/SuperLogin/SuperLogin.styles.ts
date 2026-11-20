import styled from '@emotion/styled';
import { space } from '../../styles/scale';

export const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: space.xxs,
  marginBottom: space.xl,
});

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: space.lg,
});

/** Campo de cuenta para el gestor de contraseñas: existe en el DOM, pero no se ve ni se enfoca. */
export const HiddenAccount = styled.input({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

export const Extra = styled.div({
  marginTop: space.lg,
});
