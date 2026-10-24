import styled from '@emotion/styled';
import { focusVisible, space } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { AlertTone } from './SuperAlert.types';

export const ALERT_TONE: Record<
  AlertTone,
  { bg: string; fg: string; accent: string; icon: string }
> = {
  info: { bg: v.infoSoft, fg: v.infoText, accent: v.info, icon: 'info' },
  success: { bg: v.successSoft, fg: v.successText, accent: v.success, icon: 'success' },
  warning: { bg: v.warningSoft, fg: v.warningText, accent: v.warning, icon: 'warning' },
  danger: { bg: v.dangerSoft, fg: v.dangerText, accent: v.danger, icon: 'danger' },
};

export const Root = styled.div<{ $tone: AlertTone }>(({ $tone }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: space.md,
  padding: `${space.md} ${space.lg}`,
  borderRadius: v.radius.md,
  borderLeft: `3px solid ${ALERT_TONE[$tone].accent}`,
  background: ALERT_TONE[$tone].bg,
  color: ALERT_TONE[$tone].fg,
}));

export const Body = styled.div({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: space.xxs,
});

export const Close = styled.button({
  display: 'inline-flex',
  padding: space.xxs,
  margin: `-${space.xxs}`,
  border: 'none',
  borderRadius: v.radius.sm,
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  '&:focus-visible': focusVisible,
});
