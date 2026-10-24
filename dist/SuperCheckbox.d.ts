import { ReactElement } from 'react';

interface SuperCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    hint?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
    ariaLabel?: string;
    className?: string;
}

/** Casilla de verificación con label, ayuda y error. */
declare const SuperCheckbox: ({ checked, onChange, label, hint, error, disabled, id, ariaLabel, className, }: SuperCheckboxProps) => ReactElement;

export { SuperCheckbox, type SuperCheckboxProps };
