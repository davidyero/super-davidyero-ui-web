import styled from '@emotion/styled';

export const Slot = styled.div<{ $disabled: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  /* El iframe de Google pinta un fondo blanco opaco cuando la página está en
     color-scheme oscuro y el suyo no: con "light" aquí el iframe queda
     transparente y en oscuro solo se ve el botón filled_black. */
  color-scheme: light;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;
