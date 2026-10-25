import { AriaAttributes, ReactNode, ElementType, MouseEventHandler, ReactElement } from 'react';

type CardVariant = 'default' | 'sunken' | 'elevated' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
interface SuperCardProps extends Pick<AriaAttributes, 'aria-label' | 'aria-labelledby' | 'aria-expanded' | 'aria-controls' | 'aria-pressed'> {
    variant?: CardVariant;
    /** Cabecera opcional: título (etiqueta de sección), subtítulo y una acción a la derecha. */
    title?: ReactNode;
    subtitle?: ReactNode;
    trailing?: ReactNode;
    /** Alto mínimo (p. ej. para alinear cards de una fila). */
    minHeight?: number | string;
    padding?: CardPadding;
    /** Hover y cursor de elemento clicable (usa `as="button"` o un enlace). */
    interactive?: boolean;
    as?: ElementType;
    onClick?: MouseEventHandler<HTMLElement>;
    className?: string;
    id?: string;
    role?: string;
    tabIndex?: number;
    children: ReactNode;
}

/** Contenedor de bloque. Variantes por `variant`/`padding`, nunca una card nueva. */
declare const SuperCard: ({ variant, padding, interactive, title, subtitle, trailing, minHeight, as, onClick, className, id, children, ...aria }: SuperCardProps) => ReactElement;

export { type CardPadding, type CardVariant, SuperCard, type SuperCardProps };
