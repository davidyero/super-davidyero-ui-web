import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperListItem } from '../src/components/SuperListItem/SuperListItem';
import { SuperSidebar } from '../src/components/SuperSidebar/SuperSidebar';
import { SuperTooltip } from '../src/components/SuperTooltip/SuperTooltip';
import { renderWithTheme } from './renderWithTheme';

const ITEMS = [
  { id: 'users', label: 'Usuarios', icon: 'empty' },
  { id: 'settings', label: 'Ajustes', icon: 'info' },
];

describe('0.26 · tooltips de bloque y foco en filas', () => {
  it('SuperTooltip con block ocupa todo el ancho; sin block, el de su contenido', () => {
    const { rerender } = renderWithTheme(
      <SuperTooltip label="Ayuda" block>
        <button type="button">A</button>
      </SuperTooltip>,
    );
    const wrap = () => screen.getByRole('button').parentElement as HTMLElement;
    expect(getComputedStyle(wrap()).display).toBe('flex');
    expect(getComputedStyle(wrap()).width).toBe('100%');
    rerender(
      <SuperTooltip label="Ayuda">
        <button type="button">A</button>
      </SuperTooltip>,
    );
    expect(getComputedStyle(wrap()).display).toBe('inline-flex');
  });

  it('SuperSidebar plegada lleva tooltip por entrada y la lista hace scroll (0.35.1)', () => {
    const { unmount } = renderWithTheme(
      <SuperSidebar ariaLabel="Principal" collapsed items={ITEMS} />,
    );
    const nav = () => screen.getByRole('navigation', { name: 'Principal' });
    // Desde 0.35.1 el riel también hace scroll; el tooltip va con position fixed.
    expect(getComputedStyle(nav()).overflowY).toBe('auto');
    expect(screen.getAllByRole('tooltip', { hidden: true }).map((t) => t.textContent)).toEqual([
      'Usuarios',
      'Ajustes',
    ]);
    unmount();
    renderWithTheme(<SuperSidebar ariaLabel="Principal" items={ITEMS} />);
    expect(getComputedStyle(nav()).overflowY).toBe('auto');
  });

  it('SuperListItem clicable con subtitleTooltip no mete nada enfocable en el botón', () => {
    renderWithTheme(
      <SuperListItem title="Ana" subtitle="ana@ejemplo.com" subtitleTooltip onClick={vi.fn()} />,
    );
    const button = screen.getByRole('button');
    expect(button.querySelector('[tabindex]')).toBeNull();
    expect(button).toHaveAccessibleName(/ana@ejemplo\.com/);
  });

  it('SuperListItem sin onClick deja enfocar el subtítulo para ver el tooltip', () => {
    renderWithTheme(<SuperListItem title="Ana" subtitle="ana@ejemplo.com" subtitleTooltip />);
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip.textContent).toBe('ana@ejemplo.com');
    expect(document.querySelector('[tabindex="0"]')).not.toBeNull();
  });
});
