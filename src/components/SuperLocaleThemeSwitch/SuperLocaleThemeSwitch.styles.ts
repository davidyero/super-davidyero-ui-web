import styled from '@emotion/styled';
import { space } from '../../styles/scale';

export const Row = styled.div<{ $align: 'start' | 'end' }>(({ $align }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: $align === 'end' ? 'flex-end' : 'flex-start',
  gap: space.sm,
}));
