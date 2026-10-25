import { ReactNode, ReactElement } from 'react';

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';
interface SuperBadgeProps {
    tone?: BadgeTone;
    size?: BadgeSize;
    /** Nombre de icono a la izquierda. */
    icon?: string;
    /** Punto de estado a la izquierda (el texto sigue siendo obligatorio: nunca solo color). */
    dot?: boolean;
    mono?: boolean;
    /** Deja que un texto largo salte de línea en vez de cortarse. */
    wrap?: boolean;
    /** Si se pasa, la etiqueta lleva una X que la quita. */
    onRemove?: () => void;
    /** aria-label de la X (obligatorio con `onRemove`), desde el i18n de la app. */
    removeLabel?: string;
    className?: string;
    children: ReactNode;
}

/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
declare const SuperBadge: ({ tone, size, icon, dot, mono, wrap, onRemove, removeLabel, className, children, }: SuperBadgeProps) => ReactElement;

export { type BadgeSize, type BadgeTone, SuperBadge, type SuperBadgeProps };
