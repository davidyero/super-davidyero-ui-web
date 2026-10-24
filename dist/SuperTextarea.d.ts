import { TextareaHTMLAttributes, ReactElement } from 'react';

interface SuperTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    fullWidth?: boolean;
    /** Con `maxLength`, muestra el contador `n/max`. */
    showCount?: boolean;
}

/** Texto largo con contador opcional. */
declare const SuperTextarea: ({ label, error, hint, fullWidth, showCount, id, disabled, className, value, maxLength, ...rest }: SuperTextareaProps) => ReactElement;

export { SuperTextarea, type SuperTextareaProps };
