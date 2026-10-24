import styled from '@emotion/styled';
import type { ToastTone } from '../../stores/toastStore';
import { focusVisible, space, zIndex } from '../../styles/scale';
import { v } from '../../theme/vars';
import type { SuperToastProps } from './SuperToast.types';

type Position = NonNullable<SuperToastProps['position']>;

const POS: Record<Position, Record<string, string>> = {
  'top-right': { top: space.lg, right: space.lg, alignItems: 'flex-end' },
  'top-center': { top: space.lg, left: '50%', transform: 'translateX(-50%)', alignItems: 'center' },
  'bottom-right': { bottom: space.lg, right: space.lg, alignItems: 'flex-end' },
  'bottom-center': {
    bottom: space.lg,
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
  },
};

export const TOAST_TONE: Record<ToastTone, { accent: string; icon: string }> = {
  success: { accent: v.success, icon: 'success' },
  danger: { accent: v.danger, icon: 'danger' },
  warning: { accent: v.warning, icon: 'warning' },
  info: { accent: v.info, icon: 'info' },
};

export const Viewport = styled.div<{ $position: Position }>(({ $position }) => ({
  position: 'fixed',
  zIndex: zIndex.toast,
  display: 'flex',
  flexDirection: 'column',
  gap: space.sm,
  width: `min(380px, calc(100vw - ${space.xxl}))`,
  pointerEvents: 'none',
  ...POS[$position],
}));

export const Item = styled.div<{ $tone: ToastTone }>(({ $tone }) => ({
  pointerEvents: 'auto',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'flex-start',
  gap: space.md,
  padding: `${space.md} ${space.lg}`,
  borderRadius: v.radius.md,
  borderLeft: `3px solid ${TOAST_TONE[$tone].accent}`,
  background: v.surfaceElevated,
  boxShadow: v.shadow.lg,
  color: v.text,
}));

export const IconSlot = styled.span<{ $tone: ToastTone }>(({ $tone }) => ({
  display: 'inline-flex',
  color: TOAST_TONE[$tone].accent,
}));

export const Texts = styled.div({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  // La acción del toast (p. ej. «Deshacer») no se estira a todo el ancho.
  '& > button': { alignSelf: 'flex-start', marginTop: '4px' },
});

export const Dismiss = styled.button({
  display: 'inline-flex',
  padding: space.xxs,
  margin: `-${space.xxs}`,
  border: 'none',
  borderRadius: v.radius.sm,
  background: 'transparent',
  color: v.textMuted,
  cursor: 'pointer',
  '&:hover': { color: v.text },
  '&:focus-visible': focusVisible,
});
