/*
 * Componente ÚNICO del ecosistema para cambiar idioma y tema (web y mobile). No crear
 * alternativas: usar siempre este. Versión móvil: `SuperLocaleThemeSwitch` en cada app RN,
 * misma API y medidas (botón redondo de 44 px, glifo de 22 px, mismos colores de sol y noche).
 */
import styled from '@emotion/styled';
import { space } from '../../styles/scale';

export const Row = styled.div<{ $align: 'start' | 'end' }>(({ $align }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: $align === 'end' ? 'flex-end' : 'flex-start',
  gap: space.sm,
}));
