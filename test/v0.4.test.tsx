import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperBadge } from '../src/components/SuperBadge/SuperBadge';
import { SuperButton } from '../src/components/SuperButton/SuperButton';
import { SuperCard } from '../src/components/SuperCard/SuperCard';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { renderWithTheme } from './renderWithTheme';

describe('0.4.0', () => {
  it('SuperCard pinta la cabecera con título, subtítulo y acción', () => {
    renderWithTheme(
      <SuperCard
        title="Despliegues"
        subtitle="Últimos 7 días"
        trailing={<SuperButton>Ver</SuperButton>}
      >
        Contenido
      </SuperCard>,
    );
    expect(screen.getByText('Despliegues')).toBeInTheDocument();
    expect(screen.getByText('Últimos 7 días')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ver' })).toBeInTheDocument();
  });

  it('SuperBadge con onRemove ofrece una X con su etiqueta', () => {
    const onRemove = vi.fn();
    renderWithTheme(
      <SuperBadge onRemove={onRemove} removeLabel="Quitar claude">
        claude
      </SuperBadge>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Quitar claude' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('SuperInput: invalid marca el campo sin mensaje', () => {
    renderWithTheme(
      <SuperInput aria-label="Importe" value="" onChange={() => undefined} invalid />,
    );
    expect(screen.getByLabelText('Importe')).toHaveAttribute('aria-invalid', 'true');
  });

  it('SuperInput: la X de onClear solo aparece con valor y lo vacía', () => {
    const onClear = vi.fn();
    renderWithTheme(
      <>
        <SuperInput aria-label="Vacío" value="" onChange={() => undefined} onClear={onClear} />
        <SuperInput aria-label="Lleno" value="greta" onChange={() => undefined} onClear={onClear} />
      </>,
    );
    const clears = screen.getAllByRole('button', { name: 'Cerrar' });
    expect(clears).toHaveLength(1);
    fireEvent.click(clears[0]!);
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('SuperModal muestra el subtítulo bajo el título', () => {
    renderWithTheme(
      <SuperModal open onClose={() => undefined} title="Nuevo viaje" subtitle="Ruta y semanas">
        x
      </SuperModal>,
    );
    expect(screen.getByRole('heading', { name: 'Nuevo viaje' })).toBeInTheDocument();
    expect(screen.getByText('Ruta y semanas')).toBeInTheDocument();
  });
});
