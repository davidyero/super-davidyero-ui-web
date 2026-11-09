import { ReactElement } from 'react';

interface SuperStepperProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Texto legible del valor ("6 h antes", "Sin tope"). Por defecto, el número. */
    formatValue?: (value: number) => string;
    /** Nombre accesible del control (p. ej. "Ventana para cancelar"). */
    ariaLabel: string;
    /** Textos accesibles de los botones, desde el i18n de la app. */
    decrementLabel: string;
    incrementLabel: string;
    disabled?: boolean;
    className?: string;
}

/** Número de una regla con − / + y su valor en texto legible ("6 h antes", "Sin tope"). */
declare const SuperStepper: ({ value, onChange, min, max, step, formatValue, ariaLabel, decrementLabel, incrementLabel, disabled, className, }: SuperStepperProps) => ReactElement;

export { SuperStepper };
export type { SuperStepperProps };
