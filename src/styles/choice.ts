import styled from '@emotion/styled';
import { space } from './scale';

/** Piezas comunes de los controles de elección (Checkbox, Switch): label clicable, input nativo oculto y textos. */
export const ChoiceWrap = styled.label<{ $disabled: boolean }>(({ $disabled }) => ({
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: space.sm,
  cursor: $disabled ? 'not-allowed' : 'pointer',
  opacity: $disabled ? 0.55 : 1,
  userSelect: 'none',
}));

/** Input nativo oculto a la vista pero accesible: el control visible va justo después (`input + &`). */
export const ChoiceHiddenInput = styled.input({
  position: 'absolute',
  opacity: 0,
  width: '1px',
  height: '1px',
  margin: 0,
});

export const ChoiceTexts = styled.span({ display: 'flex', flexDirection: 'column', gap: '2px' });
