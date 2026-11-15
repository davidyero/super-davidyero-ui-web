import type { ReactNode } from 'react';

export interface SuperSidebarItem<TId extends string = string> {
  id: TId;
  /** Texto ya traducido. Con la barra plegada sale como tooltip y nombre accesible. */
  label: string;
  /** Nombre de icono (obligatorio: es lo único que se ve plegada). */
  icon: string;
  /** Ruta interna: navega con el `LinkComponent` del provider, sin recargar. */
  href?: string;
}

export interface SuperSidebarProps<TId extends string = string> {
  items: ReadonlyArray<SuperSidebarItem<TId>>;
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
