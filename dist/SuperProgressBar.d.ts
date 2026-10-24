import { ReactElement } from 'react';

type ProgressTone = 'primary' | 'success' | 'warning' | 'danger';
interface SuperProgressBarProps {
    value: number;
    max?: number;
    tone?: ProgressTone;
    size?: 'sm' | 'md';
    /** Texto accesible (obligatorio si no hay una etiqueta visible al lado). */
    label: string;
    /** Muestra el porcentaje a la derecha. */
    showValue?: boolean;
    className?: string;
}

/** Barra de progreso accesible (`role="progressbar"`). */
declare const SuperProgressBar: ({ value, max, tone, size, label, showValue, className, }: SuperProgressBarProps) => ReactElement;

export { type ProgressTone, SuperProgressBar, type SuperProgressBarProps };
