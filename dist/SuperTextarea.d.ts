import { TextareaHTMLAttributes, ReactElement } from 'react';

interface SuperTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
    fullWidth?: boolean;
    /** Con `maxLength`, muestra el contador `n/max`. */
    showCount?: boolean;
    /**
     * Muestra `n/max` sin cortar lo que se escribe (el límite lo hace cumplir la
     * validación al enviar). Útil cuando recortar en vivo haría perder texto.
     */
    maxCount?: number;
    /** Tipografía monoespaciada (markdown, JSON, texto con estructura). */
    mono?: boolean;
}

/** Texto largo con contador opcional. */
declare const SuperTextarea: ({ label, error, hint, fullWidth, showCount, maxCount, mono, id, disabled, className, value, maxLength, ...rest }: SuperTextareaProps) => ReactElement;

export { SuperTextarea, type SuperTextareaProps };
