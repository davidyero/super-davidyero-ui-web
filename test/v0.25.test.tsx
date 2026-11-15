import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperBarChart } from '../src/components/SuperBarChart/SuperBarChart';
import { SuperListItem } from '../src/components/SuperListItem/SuperListItem';
import { SuperSidebar } from '../src/components/SuperSidebar/SuperSidebar';
import { SuperStatCard } from '../src/components/SuperStatCard/SuperStatCard';
import { renderWithTheme } from './renderWithTheme';

describe('0.25 · bloques de dashboard', () => {
  it('SuperStatCard pinta etiqueta, valor y delta; en loading, solo el esqueleto', () => {
    const { rerender } = renderWithTheme(
      <SuperStatCard
        label="Usuarios"
        value="1.234"
        delta="+12 %"
        trend="up"
        deltaLabel="vs. antes"
      />,
    );
    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('1.234')).toBeInTheDocument();
    expect(screen.getByText('+12 %')).toBeInTheDocument();
    rerender(<SuperStatCard label="Usuarios" value="1.234" loading />);
    expect(screen.queryByText('1.234')).toBeNull();
  });

  it('SuperBarChart escala a la barra más alta y da el tooltip de la app', () => {
    renderWithTheme(
      <SuperBarChart
        ariaLabel="Usuarios por app"
        items={[
          { id: 'a', label: 'Splitio', value: 300 },
          { id: 'b', label: 'Gazella', value: 100 },
        ]}
        tooltip={(item, share) => `${item.value} · ${Math.round(share * 100)}%`}
      />,
    );
    expect(screen.getByRole('list', { name: 'Usuarios por app' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('img', { name: 'Gazella: 100 · 25%' })).toBeInTheDocument();
  });

  it('SuperListItem clicable es un botón y muestra metadatos', () => {
    const onClick = vi.fn();
    renderWithTheme(
      <SuperListItem title="Ana" subtitle="ana@x.com" meta={<span>Pro</span>} onClick={onClick} />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('SuperSidebar marca la entrada activa y, plegada, nombra los iconos', () => {
    const onSelect = vi.fn();
    renderWithTheme(
      <SuperSidebar
        ariaLabel="Principal"
        collapsed
        activeId="users"
        onSelect={onSelect}
        items={[
          { id: 'users', label: 'Usuarios', icon: 'empty' },
          { id: 'settings', label: 'Ajustes', icon: 'info' },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: 'Usuarios' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Ajustes' }));
    expect(onSelect).toHaveBeenCalledWith('settings');
  });
});
