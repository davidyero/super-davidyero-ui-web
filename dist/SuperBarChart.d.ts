import { ReactElement } from 'react';

type BarChartTone = 'primary' | 'accent' | 'success' | 'info';
interface SuperBarChartItem {
    id: string;
    /** Nombre de la barra (texto ya traducido o nombre propio). */
    label: string;
    value: number;
    /** Nombre de icono a la izquierda del nombre. */
    icon?: string;
}
interface SuperBarChartProps {
    items: ReadonlyArray<SuperBarChartItem>;
    /** Nombre accesible de la gráfica. */
    ariaLabel: string;
    /** Valor visible a la derecha de cada barra (por defecto el número tal cual). */
    formatValue?: (value: number) => string;
    /**
     * Texto del tooltip al pasar el ratón o enfocar una barra. Recibe la cuota sobre el
     * total (0–1) para que la app la formatee con su idioma. Por defecto, el valor.
     */
    tooltip?: (item: SuperBarChartItem, share: number) => string;
    tone?: BarChartTone;
    /** Alto máximo CSS; si las barras no caben, la lista hace scroll vertical. */
    maxHeight?: string;
    /** Pinta `loadingRows` barras de esqueleto. */
    loading?: boolean;
    loadingRows?: number;
    className?: string;
}

/**
 * Barras horizontales con los colores del tema. Sin librería de gráficas: cada barra es
 * su fila (nombre y valor arriba, barra debajo), así cabe igual en un móvil que en
 * escritorio. La más alta ocupa todo el ancho; el tooltip da el detalle.
 */
declare const SuperBarChart: ({ items, ariaLabel, formatValue, tooltip, tone, maxHeight, loading, loadingRows, className, }: SuperBarChartProps) => ReactElement;

export { SuperBarChart };
export type { BarChartTone, SuperBarChartItem, SuperBarChartProps };
