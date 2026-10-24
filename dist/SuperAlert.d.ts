import { ReactNode, ReactElement } from 'react';

type AlertTone = 'info' | 'success' | 'warning' | 'danger';
interface SuperAlertProps {
    tone?: AlertTone;
    title?: string;
    children: ReactNode;
    /** Muestra la X de cerrar (texto accesible: `labels.dismiss`). */
    dismissible?: boolean;
    onDismiss?: () => void;
    /** Acción opcional bajo el texto. */
    action?: ReactNode;
    className?: string;
}

/** Aviso en línea. Fondo soft con su token de texto en claro y oscuro. */
declare const SuperAlert: ({ tone, title, children, dismissible, onDismiss, action, className, }: SuperAlertProps) => ReactElement;

export { type AlertTone, SuperAlert, type SuperAlertProps };
