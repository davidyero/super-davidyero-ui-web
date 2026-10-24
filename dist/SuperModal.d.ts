import { ReactNode, ReactElement } from 'react';

interface SuperModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    /** Pie con acciones (normalmente `SuperButton`s). */
    footer?: ReactNode;
    align?: 'center' | 'top';
    /** Ancho máximo en px. */
    width?: number;
    padded?: boolean;
    /** Cerrar al pulsar fuera. Desactívalo en formularios largos. */
    closeOnBackdrop?: boolean;
    children: ReactNode;
}

/** Diálogo modal accesible: portal, Escape, trampa de foco y foco de vuelta al cerrar. */
declare const SuperModal: ({ open, onClose, title, footer, align, width, padded, closeOnBackdrop, children, }: SuperModalProps) => ReactElement | null;

export { SuperModal, type SuperModalProps };
