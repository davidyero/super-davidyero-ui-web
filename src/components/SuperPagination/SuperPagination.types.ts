export interface SuperPaginationLabels {
  /** Nombre accesible del bloque (`<nav>`). */
  navigation: string;
  previous: string;
  next: string;
  /** Texto junto al selector de tamaño, p. ej. «Por página». */
  pageSize: string;
}

export interface SuperPaginationProps {
  /** Página actual, empezando en 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Resumen visible entre las flechas, p. ej. «21–40 de 56». Lo arma la app con su i18n. */
  summary: string;
  labels: SuperPaginationLabels;
  /** Con las dos, aparece el selector de cuántos por página. */
  pageSize?: number;
  pageSizeOptions?: readonly number[];
  onPageSizeChange?: (size: number) => void;
  className?: string;
}
