import { ElementType, MouseEventHandler, ReactNode, ReactElement } from 'react';

type CardVariant = 'default' | 'sunken' | 'elevated' | 'outline';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
interface SuperCardProps {
    variant?: CardVariant;
    padding?: CardPadding;
    /** Hover y cursor de elemento clicable (usa `as="button"` o un enlace). */
    interactive?: boolean;
    as?: ElementType;
    onClick?: MouseEventHandler<HTMLElement>;
    className?: string;
    id?: string;
    children: ReactNode;
}

/** Contenedor de bloque. Variantes por `variant`/`padding`, nunca una card nueva. */
declare const SuperCard: ({ variant, padding, interactive, as, onClick, className, id, children, }: SuperCardProps) => ReactElement;

export { type CardPadding, type CardVariant, SuperCard, type SuperCardProps };
