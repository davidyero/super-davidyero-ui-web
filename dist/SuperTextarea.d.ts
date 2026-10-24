import * as react from 'react';
import { TextareaHTMLAttributes } from 'react';

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
declare const SuperTextarea: react.ForwardRefExoticComponent<SuperTextareaProps & react.RefAttributes<HTMLTextAreaElement>>;

export { SuperTextarea, type SuperTextareaProps };
