import { useId, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { useSuperLabels } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Backdrop, Body, Close, Dialog, Footer, Header } from './SuperModal.styles';
import type { SuperModalProps } from './SuperModal.types';
import { useSuperModal } from './useSuperModal';

/** Diálogo modal accesible: portal, Escape, trampa de foco y foco de vuelta al cerrar. */
export const SuperModal = ({
  open,
  onClose,
  title,
  subtitle,
  footer,
  align = 'center',
  width = 520,
  padded = true,
  closeOnBackdrop = true,
  children,
}: SuperModalProps): ReactElement | null => {
  const labels = useSuperLabels();
  const titleId = useId();
  const dialogRef = useSuperModal(open, onClose);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <Backdrop
      $align={align}
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onClose();
      }}
    >
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : labels.close}
        tabIndex={-1}
        $width={width}
        $padded={padded}
      >
        <Header>
          {title || subtitle ? (
            <div>
              {title ? (
                <SuperTypography variant="h3" as="h2" id={titleId}>
                  {title}
                </SuperTypography>
              ) : null}
              {subtitle ? (
                <SuperTypography variant="bodySmall" color="textMuted">
                  {subtitle}
                </SuperTypography>
              ) : null}
            </div>
          ) : null}
          <Close type="button" aria-label={labels.close} onClick={onClose}>
            <SuperIcon name="close" size={20} />
          </Close>
        </Header>
        <Body data-sd-modal-body>{children}</Body>
        {footer ? <Footer>{footer}</Footer> : null}
      </Dialog>
    </Backdrop>,
    document.body,
  );
};

export type { SuperModalProps } from './SuperModal.types';
