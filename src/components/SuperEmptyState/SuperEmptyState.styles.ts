import styled from '@emotion/styled';
import { space } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Root = styled.div<{ $compact: boolean }>(({ $compact }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: space.sm,
  padding: $compact ? space.lg : `${space.xxl} ${space.lg}`,
  maxWidth: '420px',
  margin: '0 auto',
}));

export const IconCircle = styled.span({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: v.surfaceSunken,
  color: v.textMuted,
  marginBottom: space.xxs,
});

export const Action = styled.div({ marginTop: space.sm });
