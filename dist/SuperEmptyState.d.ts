import { ReactNode, ReactElement } from 'react';

interface SuperEmptyStateProps {
    /** Nombre de icono (por defecto `empty`). */
    icon?: string;
    title: string;
    description?: string;
    /** Acción principal (normalmente un `SuperButton`). */
    action?: ReactNode;
    compact?: boolean;
    className?: string;
}

/** Estado vacío: qué pasa aquí y qué puede hacer el usuario. */
declare const SuperEmptyState: ({ icon, title, description, action, compact, className, }: SuperEmptyStateProps) => ReactElement;

export { SuperEmptyState, type SuperEmptyStateProps };
