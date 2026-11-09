import { useId, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { useSuperModal } from '../SuperModal/useSuperModal';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Backdrop, Body, Close, Footer, Header, Panel, Titles } from './SuperDrawer.styles';
import type { SuperDrawerProps } from './SuperDrawer.types';

/**
 * Panel lateral derecho (en móvil, pantalla completa) con cabecera, cuerpo con
 * scroll y pie fijo. Mismo comportamiento que `SuperModal`: Escape cierra, el
 * foco no sale del panel y vuelve al elemento que lo abrió.
 */
export const SuperDrawer = ({
  open,
  onClose,
  title,
  subtitle,
  eyebrow,
  footer,
  width = 480,
  children,
}: SuperDrawerProps): ReactElement | null => {
  const labels = useSuperLabels();
  const titleId = useId();
  const panelRef = useSuperModal(open, onClose);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <Backdrop
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : labels.close}
        tabIndex={-1}
        $width={width}
      >
        <Header>
          <Titles>
            {eyebrow}
            {title ? (
              <SuperTypography variant="display" as="h2" id={titleId}>
                {title}
              </SuperTypography>
            ) : null}
            {subtitle ? (
              <SuperTypography variant="bodySmall" color="textMuted">
                {subtitle}
              </SuperTypography>
            ) : null}
          </Titles>
          <Close type="button" aria-label={labels.close} onClick={onClose}>
            <SuperIcon name="close" size={20} />
          </Close>
        </Header>
        <Body>{children}</Body>
        {footer ? <Footer>{footer}</Footer> : null}
      </Panel>
    </Backdrop>,
    document.body,
  );
};

export type { SuperDrawerProps } from './SuperDrawer.types';
