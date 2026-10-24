export interface SuperLoaderOverlayProps {
  /**
   * Fuerza el estado. Si se omite, lo decide `loaderStore` (peticiones activas).
   * Se monta UNA sola vez en la raíz.
   */
  visible?: boolean;
  /** Espera antes de mostrarse, para no parpadear en peticiones muy rápidas. */
  delayMs?: number;
}
