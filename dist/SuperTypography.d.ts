import { ElementType, ReactNode, ReactElement } from 'react';
import { TextVariant, FontWeight } from './scale.js';

type TypographyColor = 'text' | 'textBody' | 'textMuted' | 'textSubtle' | 'primary' | 'accent' | 'onAccent' | 'onPrimary' | 'primarySoftText' | 'success' | 'warning' | 'danger' | 'info' | 'inherit';
type TypographyAlign = 'left' | 'center' | 'right';
interface SuperTypographyProps {
    variant?: TextVariant;
    /** Cambia la etiqueta HTML. Por defecto una sensata para cada variante. */
    as?: ElementType;
    color?: TypographyColor;
    weight?: FontWeight;
    align?: TypographyAlign;
    truncate?: boolean;
    uppercase?: boolean;
    mono?: boolean;
    id?: string;
    role?: string;
    'aria-live'?: 'polite' | 'assertive' | 'off';
    'aria-label'?: string;
    title?: string;
    className?: string;
    children: ReactNode;
}

/** Todo texto de la app pasa por aquí. La escala vive en un solo sitio y no baja de 13px. */
declare const SuperTypography: ({ variant, as, color, weight, align, truncate, uppercase, mono, id, title, className, children, ...a11y }: SuperTypographyProps) => ReactElement;

export { SuperTypography, type SuperTypographyProps, TextVariant, type TypographyAlign, type TypographyColor };
