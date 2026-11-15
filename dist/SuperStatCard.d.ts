import { ReactElement } from 'react';

type StatTrend = 'up' | 'down' | 'neutral';
type StatCardSize = 'sm' | 'md';
interface SuperStatCardProps {
    /** Qué mide (texto ya traducido). */
    label: string;
    /** Valor ya formateado por la app (`Intl.NumberFormat`). */
    value: string;
    /** Nombre de icono, en un círculo suave arriba a la derecha. */
    icon?: string;
    /** Variación ya formateada (`+12 %`). Sin ella no se pinta la línea del delta. */
    delta?: string;
    /** Sentido del delta: decide el tono (verde, rojo o neutro) y la flecha. */
    trend?: StatTrend;
    /** Contexto del delta (`vs. periodo anterior`). */
    deltaLabel?: string;
    /** `md`: cifra grande (32 px). `sm`: más compacta, para rejillas de 2×2 en móvil. */
    size?: StatCardSize;
    /** Pinta el esqueleto con la misma forma que la card real. */
    loading?: boolean;
    className?: string;
}

/** KPI: etiqueta, cifra y variación. Variantes por `size`, nunca una card nueva. */
declare const SuperStatCard: ({ label, value, icon, delta, trend, deltaLabel, size, loading, className, }: SuperStatCardProps) => ReactElement;

export { SuperStatCard };
export type { StatCardSize, StatTrend, SuperStatCardProps };
