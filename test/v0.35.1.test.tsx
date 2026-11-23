import { fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SuperSidebar } from '../src/components/SuperSidebar/SuperSidebar';
import type { SuperSidebarItem } from '../src/components/SuperSidebar/SuperSidebar';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { renderWithTheme, TEST_LABELS } from './renderWithTheme';

const MANY: SuperSidebarItem[] = Array.from({ length: 45 }, (_, i) => ({
  id: `e${i}`,
  label: `Entrada ${i + 1}`,
  icon: 'info',
  section: i < 20 ? 'a' : 'b',
}));

afterEach(() => window.localStorage.clear());

describe('0.35.1 · riel de SuperSidebar', () => {
  it('con 45 entradas plegada, la lista hace scroll y no se sale bajo el pie', () => {
    renderWithTheme(
      <SuperSidebar ariaLabel="Menú" items={MANY} collapsed footer={<span>pie</span>} />,
    );
    const nav = screen.getByRole('navigation', { name: 'Menú' });
    expect(getComputedStyle(nav).overflowY).toBe('auto');
    expect(getComputedStyle(nav).overflowX).toBe('hidden');
    expect(screen.getAllByRole('button')).toHaveLength(45);
  });

  it('el tooltip del riel va con position fixed junto a la entrada, sin que lo recorte el scroll', () => {
    renderWithTheme(<SuperSidebar ariaLabel="Menú" items={MANY.slice(0, 3)} collapsed />);
    const entry = screen.getByRole('button', { name: 'Entrada 2' });
    fireEvent.mouseEnter(entry.parentElement as HTMLElement);
    const bubbles = document.querySelectorAll<HTMLElement>('[role="tooltip"]');
    expect(Array.from(bubbles).some((b) => b.style.position === 'fixed')).toBe(true);
  });
});

describe('0.35.1 · la sección de la página actual se abre sola', () => {
  const items: SuperSidebarItem[] = [
    { id: 'x', label: 'Inicio', icon: 'info' },
    { id: 'y', label: 'Costos', icon: 'info', section: 'datos' },
    { id: 'z', label: 'Usuarios', icon: 'info', section: 'gestion' },
  ];
  const sections = [
    { id: 'datos', label: 'Datos', defaultCollapsed: true },
    { id: 'gestion', label: 'Gestión', defaultCollapsed: true },
  ];
  const ui = (activeId: string) => (
    <SuperThemeProvider mode="light" labels={TEST_LABELS}>
      <SuperSidebar ariaLabel="Menú" items={items} sections={sections} activeId={activeId} />
    </SuperThemeProvider>
  );

  it('al montar y al navegar a otra sección', () => {
    const view = renderWithTheme(
      <SuperSidebar ariaLabel="Menú" items={items} sections={sections} activeId="y" />,
    );
    expect(screen.getByRole('button', { name: 'Datos' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Gestión' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    view.rerender(ui('z'));
    expect(screen.getByRole('button', { name: 'Gestión' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('el usuario puede volver a plegarla mientras está en ella', () => {
    renderWithTheme(
      <SuperSidebar ariaLabel="Menú" items={items} sections={sections} activeId="y" />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Datos' }));
    expect(screen.getByRole('button', { name: 'Datos' })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('0.35.1 · icono propio por entrada (leading)', () => {
  const logo = (name: string) => <img src={`/${name}.png`} alt="" data-testid={`logo-${name}`} />;
  const items: SuperSidebarItem[] = [
    { id: 'splitio', label: 'Splitio', leading: logo('splitio'), icon: 'info' },
    { id: 'gazella', label: 'Gazella', leading: logo('gazella') },
    { id: 'ajustes', label: 'Ajustes', icon: 'info' },
  ];

  it('leading gana a icon, completa y plegada', () => {
    const view = renderWithTheme(<SuperSidebar ariaLabel="Mis apps" items={items} />);
    expect(screen.getByTestId('logo-splitio')).toBeInTheDocument();
    expect(screen.getByTestId('logo-gazella')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Splitio' })).toBeInTheDocument();
    view.unmount();
    renderWithTheme(<SuperSidebar ariaLabel="Mis apps" items={items} collapsed />);
    expect(screen.getByTestId('logo-gazella')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Gazella' })).toBeInTheDocument();
  });
});
