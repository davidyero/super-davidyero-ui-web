import { useId, type ReactElement } from 'react';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { Count, List, Tab } from './SuperTabs.styles';
import type { SuperTabsProps } from './SuperTabs.types';
import { useSuperTabs } from './useSuperTabs';

/**
 * Pestañas controladas por `value`. Sin router a propósito: para navegar,
 * llama a tu `navigate` desde `onChange`.
 */
export const SuperTabs = <TId extends string = string>({
  items,
  value,
  onChange,
  ariaLabel,
  idBase,
  size = 'md',
  className,
}: SuperTabsProps<TId>): ReactElement => {
  const autoId = useId();
  const base = idBase ?? autoId;
  const { onKeyDown, register } = useSuperTabs(items, value, onChange);

  return (
    <List role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown} className={className}>
      {items.map((item) => {
        const active = item.id === value;
        return (
          <Tab
            key={item.id}
            ref={register(item.id)}
            type="button"
            role="tab"
            id={`${base}-tab-${item.id}`}
            aria-selected={active}
            aria-controls={`${base}-panel-${item.id}`}
            tabIndex={active ? 0 : -1}
            disabled={item.disabled}
            $active={active}
            $size={size}
            onClick={() => onChange(item.id)}
          >
            {item.icon ? <SuperIcon name={item.icon} size={16} /> : null}
            {item.label}
            {item.count !== undefined ? <Count $active={active}>{item.count}</Count> : null}
          </Tab>
        );
      })}
    </List>
  );
};

export type { SuperTabsProps, SuperTabItem } from './SuperTabs.types';
