export type StatTrend = 'up' | 'down' | 'neutral';
export type StatCardSize = 'sm' | 'md';

export interface SuperStatCardProps {
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
