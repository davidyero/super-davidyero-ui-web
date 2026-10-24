import { ReactElement } from 'react';

interface SuperSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    hint?: string;
    disabled?: boolean;
    id?: string;
    /** Texto accesible si no hay `label` visible (p. ej. en el switch de tema del login). */
    ariaLabel?: string;
    className?: string;
}

/** Interruptor on/off (`role="switch"`). */
declare const SuperSwitch: ({ checked, onChange, label, hint, disabled, id, ariaLabel, className, }: SuperSwitchProps) => ReactElement;

export { SuperSwitch, type SuperSwitchProps };
