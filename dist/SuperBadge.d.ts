import { ReactNode, ReactElement } from 'react';

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';
/** Los 5 planes del ecosistema, iguales en todas las apps. */
type SuperPlan = 'free' | 'lite' | 'pro' | 'thanos' | 'superthanos';
interface SuperBadgeProps {
    tone?: BadgeTone;
    /**
     * Insignia de plan: pone el icono y el tono del plan (se pueden sobrescribir con
     * `icon`/`tone`). El texto lo da la app, traducido.
     */
    plan?: SuperPlan;
    size?: BadgeSize;
    /** Nombre de icono a la izquierda. */
    icon?: string;
    /** Punto de estado a la izquierda (el texto sigue siendo obligatorio: nunca solo color). */
    dot?: boolean;
    mono?: boolean;
    /** Deja que un texto largo salte de línea en vez de cortarse. */
    wrap?: boolean;
    /** Si se pasa, la etiqueta lleva una X que la quita. */
    onRemove?: () => void;
    /** aria-label de la X (obligatorio con `onRemove`), desde el i18n de la app. */
    removeLabel?: string;
    className?: string;
    children: ReactNode;
}

/** Icono y tono de cada plan: de más neutro (free) a más marcado (superthanos). */
declare const PLAN_BADGE: Readonly<Record<SuperPlan, {
    icon: string;
    tone: BadgeTone;
}>>;
/** Etiqueta/pill. El tono va por `tone`; el texto nunca depende solo del color. */
declare const SuperBadge: ({ plan, tone, size, icon, dot, mono, wrap, onRemove, removeLabel, className, children, }: SuperBadgeProps) => ReactElement;

export { PLAN_BADGE, SuperBadge };
export type { BadgeSize, BadgeTone, SuperBadgeProps, SuperPlan };
