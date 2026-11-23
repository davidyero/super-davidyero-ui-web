import { useCallback, useMemo, useState } from 'react';
import type { SuperSidebarItem, SuperSidebarSection } from './SuperSidebar.types';

const STORAGE_PREFIX = 'sd-sidebar-sections:';

export interface SidebarGroup<TId extends string> {
  /** `null`: entradas sueltas, sin encabezado, en su sitio. */
  section: SuperSidebarSection | null;
  items: Array<SuperSidebarItem<TId>>;
}

const readStored = (key: string): Record<string, boolean> | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, boolean>) : null;
  } catch {
    return null;
  }
};

const writeStored = (key: string, value: Record<string, boolean>): void => {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): se pliega igual, solo que no se recuerda.
  }
};

/**
 * Agrupa las entradas por sección (en el orden de la primera de cada una), deja las
 * sueltas en su sitio y las `standalone` al final, y recuerda qué secciones están plegadas.
 */
export const useSuperSidebar = <TId extends string>(
  items: ReadonlyArray<SuperSidebarItem<TId>>,
  sections: ReadonlyArray<SuperSidebarSection> | undefined,
  storageKey: string,
) => {
  const groups = useMemo(() => {
    const meta = new Map((sections ?? []).map((s) => [s.id, s]));
    const out: Array<SidebarGroup<TId>> = [];
    const bySection = new Map<string, SidebarGroup<TId>>();
    const standalone: Array<SuperSidebarItem<TId>> = [];
    for (const item of items) {
      if (item.standalone) {
        standalone.push(item);
      } else if (item.section) {
        let group = bySection.get(item.section);
        if (!group) {
          group = {
            section: meta.get(item.section) ?? { id: item.section, label: item.section },
            items: [],
          };
          bySection.set(item.section, group);
          out.push(group);
        }
        group.items.push(item);
      } else {
        const last = out[out.length - 1];
        if (last && last.section === null) last.items.push(item);
        else out.push({ section: null, items: [item] });
      }
    }
    return { groups: out, standalone };
  }, [items, sections]);

  const [folded, setFolded] = useState<Record<string, boolean>>(() => {
    const defaults = Object.fromEntries(
      (sections ?? []).filter((s) => s.defaultCollapsed).map((s) => [s.id, true]),
    );
    const stored = typeof window === 'undefined' ? null : readStored(storageKey);
    return { ...defaults, ...stored };
  });

  const toggle = useCallback(
    (id: string) => {
      setFolded((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        writeStored(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  return { ...groups, isFolded: (id: string) => Boolean(folded[id]), toggle };
};
