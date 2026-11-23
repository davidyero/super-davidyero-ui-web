import { fireEvent, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SuperSidebar } from '../src/components/SuperSidebar/SuperSidebar';
import type { SuperSidebarItem } from '../src/components/SuperSidebar/SuperSidebar';
import { renderWithTheme } from './renderWithTheme';

const ITEMS: SuperSidebarItem[] = [
  { id: 'home', label: 'Inicio', icon: 'home' },
  {
    id: 'apps',
    label: 'Apps',
    icon: 'apps',
    section: 'gestion',
    badge: 3,
    badgeLabel: '3 por revisar',
  },
  {
    id: 'users',
    label: 'Usuarios',
    icon: 'users',
    section: 'gestion',
    trailing: <span data-testid="app-icon" />,
  },
  { id: 'costs', label: 'Costos', icon: 'chart', section: 'datos', badge: 0 },
  { id: 'notes', label: 'Notas', icon: 'note', standalone: true, section: 'datos' },
];
const SECTIONS = [
  { id: 'gestion', label: 'Gestión' },
  { id: 'datos', label: 'Datos', defaultCollapsed: true },
];

afterEach(() => window.localStorage.clear());

describe('0.35 · SuperSidebar con secciones, contadores y entradas sueltas', () => {
  it('agrupa por sección con encabezado plegable y deja standalone al final', () => {
    renderWithTheme(<SuperSidebar ariaLabel="Menú" items={ITEMS} sections={SECTIONS} />);
    const gestion = screen.getByRole('button', { name: 'Gestión' });
    expect(gestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Datos' })).toHaveAttribute('aria-expanded', 'false');
    const nav = screen.getByRole('navigation', { name: 'Menú' });
    const buttons = within(nav).getAllByRole('button');
    expect(buttons[buttons.length - 1]).toHaveTextContent('Notas');
  });

  it('recuerda el plegado entre montajes', () => {
    const first = renderWithTheme(
      <SuperSidebar ariaLabel="Menú" items={ITEMS} sections={SECTIONS} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Gestión' }));
    expect(screen.getByRole('button', { name: 'Gestión' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    first.unmount();
    renderWithTheme(<SuperSidebar ariaLabel="Menú" items={ITEMS} sections={SECTIONS} />);
    expect(screen.getByRole('button', { name: 'Gestión' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('el contador se anuncia con badgeLabel, 0 no se pinta y trailing aparece', () => {
    renderWithTheme(<SuperSidebar ariaLabel="Menú" items={ITEMS} sections={SECTIONS} />);
    expect(screen.getByRole('button', { name: 'Apps, 3 por revisar' })).toBeInTheDocument();
    expect(screen.queryByText('0')).toBeNull();
    expect(screen.getByTestId('app-icon')).toBeInTheDocument();
  });

  it('más de 99 sale como 99+', () => {
    renderWithTheme(
      <SuperSidebar
        ariaLabel="Menú"
        items={[{ id: 'a', label: 'Avisos', icon: 'bell', badge: 120 }]}
      />,
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('plegada: cada sección es una raya, sin encabezados, y el contador va en el nombre', () => {
    const { container } = renderWithTheme(
      <SuperSidebar ariaLabel="Menú" items={ITEMS} sections={SECTIONS} collapsed />,
    );
    expect(screen.queryByRole('button', { name: 'Gestión' })).toBeNull();
    expect(container.querySelectorAll('hr')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Apps, 3 por revisar' })).toBeInTheDocument();
    // En la barra plegada las secciones no se pliegan: Costos sigue a mano.
    expect(screen.getByRole('button', { name: 'Costos' })).toBeInTheDocument();
  });

  it('sin secciones, igual que antes', () => {
    renderWithTheme(
      <SuperSidebar
        ariaLabel="Menú"
        items={[
          { id: 'a', label: 'Uno', icon: 'home' },
          { id: 'b', label: 'Dos', icon: 'home' },
        ]}
        activeId="b"
      />,
    );
    expect(screen.getByRole('button', { name: 'Dos' })).toHaveAttribute('aria-current', 'page');
  });
});
