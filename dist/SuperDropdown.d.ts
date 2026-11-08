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
 * Selector propio (no el nativo): la misma apariencia en todos los navegadores y en el
 * tema de cada app. Teclado y lectores de pantalla siguen el patrón de WAI-ARIA para un
 * combobox de solo selección. Todo selector de la app pasa por aquí.
 */
declare const SuperDropdown: <TValue extends string = string>({ value, onChange, options, label, placeholder, error, hint, disabled, fullWidth, size, id, ariaLabel, className, }: SuperDropdownProps<TValue>) => ReactElement;

export { SuperDropdown };
export type { SuperDropdownOption, SuperDropdownProps };
