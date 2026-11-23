import type { ReactNode } from 'react';

export interface SuperSidebarItem<TId extends string = string> {
  id: TId;
  /** Texto ya traducido. Con la barra plegada sale como tooltip y nombre accesible. */
  label: string;
  /**
   * Nombre de icono. Obligatorio salvo que la entrada lleve `leading`: plegada, el icono
   * es lo único que se ve.
   */
  icon?: string;
  /**
   * Icono propio en lugar de `icon` (gana a `icon`), p. ej. el logo de la app en «Mis apps».
   * Va en una caja de 20×20, la misma que los iconos, también con la barra plegada.
   */
  leading?: ReactNode;
  /** Ruta interna: navega con el `LinkComponent` del provider, sin recargar. */
  href?: string;
  /**
   * `id` de la sección a la que pertenece (ver `sections`). Las entradas de una misma
   * sección se agrupan bajo su encabezado, en el orden en que aparece la primera.
   */
  section?: string;
  /**
   * Fuera de las secciones y siempre visible, al final de la lista (p. ej. «Notas»).
   * Gana a `section`.
   */
  standalone?: boolean;
  /** Contador a la derecha. `0` o sin valor: no se pinta. Más de 99 sale como «99+». */
  badge?: number;
  /**
   * Lo que oye el lector de pantalla para el contador, ya traducido: «3 por leer».
   * Sin él, el número a secas.
   */
  badgeLabel?: string;
  /** Algo propio a la derecha (icono o insignia de la app). Solo con la barra completa. */
  trailing?: ReactNode;
}

export interface SuperSidebarSection {
  /** El que usan las entradas en `section` y la clave con que se recuerda si está plegada. */
  id: string;
  /** Encabezado ya traducido. */
  label: string;
  /** Plegada la primera vez (después manda lo que eligió el usuario). */
  defaultCollapsed?: boolean;
}

export interface SuperSidebarProps<TId extends string = string> {
  items: ReadonlyArray<SuperSidebarItem<TId>>;
  /**
   * Encabezados de las secciones, plegables. Una entrada cuya `section` no esté aquí usa
   * el `id` como encabezado. Con la barra plegada (`collapsed`) cada sección es una raya.
   */
  sections?: ReadonlyArray<SuperSidebarSection>;
  /**
   * Clave con que se recuerda en el navegador qué secciones están plegadas. Cámbiala si
   * hay dos barras con secciones en la misma web. Por defecto, `ariaLabel`.
   */
  storageKey?: string;
  /** Entrada de la página actual: se marca y lleva `aria-current="page"`. */
  activeId?: TId;
  /** Al elegir una entrada sin `href` (o además de navegar). */
  onSelect?: (id: TId) => void;
  /** Nombre accesible de la navegación. */
  ariaLabel: string;
  /**
   * Solo iconos (tablet y Fold abierto). La app decide cuándo, con sus puntos de corte;
   * en móvil la barra va dentro de un `SuperDrawer`.
   */
  collapsed?: boolean;
  /** Arriba: logo o nombre de la app. */
  header?: ReactNode;
  /** Abajo: idioma y tema, usuario, versión. */
  footer?: ReactNode;
  className?: string;
}
