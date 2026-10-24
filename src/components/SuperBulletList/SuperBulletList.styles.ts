import styled from '@emotion/styled';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';

export const List = styled.ul<{ $spacing: 'sm' | 'md' }>(({ $spacing }) => ({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: $spacing === 'sm' ? space.xs : space.sm,
  counterReset: 'sd-list',
}));

export const Item = styled.li<{ $ordered: boolean }>(({ $ordered }) => ({
  position: 'relative',
  paddingLeft: $ordered ? '28px' : '20px',
  fontFamily: v.font.base,
  fontSize: '14px',
  lineHeight: 1.55,
  color: v.textBody,
  counterIncrement: 'sd-list',
  '&::before': $ordered
    ? {
        content: 'counter(sd-list) "."',
        position: 'absolute',
        left: 0,
        fontWeight: 600,
        color: v.primary,
      }
    : {
        content: '""',
        position: 'absolute',
        left: '4px',
        top: '0.62em',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: v.primary,
      },
}));
