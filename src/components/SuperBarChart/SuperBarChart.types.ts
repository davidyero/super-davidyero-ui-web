export type BarChartTone = 'primary' | 'accent' | 'success' | 'info';

export interface SuperBarChartItem {
  id: string;
  /** Nombre de la barra (texto ya traducido o nombre propio). */
  label: string;
  value: number;
  /** Nombre de icono a la izquierda del nombre. */
  icon?: string;
}

export interface SuperBarChartProps {
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
