import { ReactElement } from 'react';

interface SuperSegmentedOption<TValue extends string = string> {
    value: TValue;
    label: string;
    disabled?: boolean;
}
interface SuperSegmentedProps<TValue extends string = string> {
    /** De 2 a 4 opciones cortas (Mensual/Anual, Todas/Reformer/Barrel, idioma, tema). */
    options: ReadonlyArray<SuperSegmentedOption<TValue>>;
    value: TValue;
    onChange: (value: TValue) => void;
    /** Nombre accesible del grupo. */
    ariaLabel: string;
    size?: 'sm' | 'md';
    /** Ocupa todo el ancho y reparte las opciones a partes iguales. */
    fullWidth?: boolean;
    className?: string;
}

/**
 * Selector segmentado en píldora para 2–4 opciones excluyentes. La activa va en
 * tinta. Flechas, Inicio y Fin mueven la selección (patrón ARIA de tabs).
 */
declare const SuperSegmented: <TValue extends string = string>({ options, value, onChange, ariaLabel, size, fullWidth, className, }: SuperSegmentedProps<TValue>) => ReactElement;

export { SuperSegmented };
export type { SuperSegmentedOption, SuperSegmentedProps };
