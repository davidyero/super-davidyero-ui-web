import { css } from '@emotion/react';
import { motion, ms } from '../../styles/motion';
import { v } from '../../theme/vars';

/**
 * Colores y forma del toast de Ding desde los tokens de la app (`--sd-*`), en claro y
 * en oscuro. El selector va doble para ganar a los valores por defecto que Ding
 * inyecta en su propio `<style>`. Nunca un color literal.
 */
export const dingTheme = css({
  '.tst-viewport.tst-viewport': {
    '--tst-bg': v.surfaceElevated,
    '--tst-fg': v.text,
    '--tst-success': v.success,
    '--tst-error': v.danger,
    '--tst-warning': v.warning,
    '--tst-info': v.info,
    fontFamily: v.font.base,
    // Movimiento de Ding desde los tokens: entrada y apilado en `base` con `out`.
    '--tst-pop-dur': ms('base'),
    '--tst-pop': motion.easing.out,
    '--tst-stack-dur': ms('base'),
    '--tst-stack': motion.easing.out,
  },
});
