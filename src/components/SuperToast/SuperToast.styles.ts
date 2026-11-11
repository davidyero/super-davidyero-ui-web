import { css } from '@emotion/react';
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
  },
});
