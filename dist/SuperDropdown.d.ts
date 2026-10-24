import { ReactElement } from 'react';

interface SuperDropdownOption<TValue extends string = string> {
    value: TValue;
    label: string;
    disabled?: boolean;
}
interface SuperDropdownProps<TValue extends string = string> {
    value: TValue | '';
    onChange: (value: TValue) => void;
    options: ReadonlyArray<SuperDropdownOption<TValue>>;
    label?: string;
    /** Opción vacía inicial (no seleccionable una vez elegido algo). */
    placeholder?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    /** Texto accesible si no hay `label` visible (p. ej. el selector de idioma del login). */
    ariaLabel?: string;
    className?: string;
}

/**
 * Selector. Nativo a propósito: hereda teclado, accesibilidad y el picker del
 * sistema en móvil. Todo selector de la app pasa por aquí.
 */
declare const SuperDropdown: <TValue extends string = string>({ value, onChange, options, label, placeholder, error, hint, disabled, fullWidth, size, id, ariaLabel, className, }: SuperDropdownProps<TValue>) => ReactElement;

export { SuperDropdown, type SuperDropdownOption, type SuperDropdownProps };
