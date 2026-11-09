import styled from '@emotion/styled';
import { focusVisible, space, transition } from '../../styles/scale';
import { v } from '../../theme/vars';

export const Root = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  gap: space.xxs,
  padding: space.xxs,
  border: `1px solid ${v.borderStrong}`,
  borderRadius: v.radius.pill,
  background: v.surface,
});

export const StepButton = styled.button({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  border: 'none',
  borderRadius: v.radius.pill,
  background: 'transparent',
  color: v.text,
  fontFamily: v.font.base,
  fontSize: '18px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: `background ${transition}`,
  '&:hover:not(:disabled)': { background: v.surfaceSunken },
  '&:disabled': { opacity: 0.4, cursor: 'not-allowed' },
  '&:focus-visible': focusVisible,
});

export const Value = styled.output({
  minWidth: '96px',
  padding: `0 ${space.xs}`,
  textAlign: 'center',
  color: v.text,
  fontFamily: v.font.base,
  fontSize: '14px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
});
