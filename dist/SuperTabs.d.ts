import { ReactElement } from 'react';

interface SuperTabItem<TId extends string = string> {
    id: TId;
    label: string;
    icon?: string;
    /** Contador a la derecha del texto. */
    count?: number;
    disabled?: boolean;
}
interface SuperTabsProps<TId extends string = string> {
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

/**
 * Pestañas controladas por `value`. Sin router a propósito: para navegar,
 * llama a tu `navigate` desde `onChange`.
 */
declare const SuperTabs: <TId extends string = string>({ items, value, onChange, ariaLabel, idBase, size, className, }: SuperTabsProps<TId>) => ReactElement;

export { type SuperTabItem, SuperTabs, type SuperTabsProps };
