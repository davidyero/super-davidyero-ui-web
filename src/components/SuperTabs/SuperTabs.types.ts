export interface SuperTabItem<TId extends string = string> {
  id: TId;
  label: string;
  icon?: string;
  /** Contador a la derecha del texto. */
  count?: number;
  disabled?: boolean;
}

export interface SuperTabsProps<TId extends string = string> {
  items: ReadonlyArray<SuperTabItem<TId>>;
  value: TId;
  onChange: (id: TId) => void;
  /** Nombre accesible del grupo de pestañas. */
  ariaLabel: string;
  /** id base para enlazar cada pestaña con su panel (`<id>-panel-<tabId>`). */
  idBase?: string;
  size?: 'sm' | 'md';
  className?: string;
}
