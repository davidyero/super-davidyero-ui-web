import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SuperChip, SuperChipGroup } from '../src/components/SuperChip/SuperChip';
import { resolveTokens } from '../src/theme/tokens';
import { renderWithTheme } from './renderWithTheme';

const rgb = (hex: string): string => {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};

describe('0.27 · SuperChip', () => {
  it('con selected es un interruptor con aria-pressed', () => {
    const Harness = () => {
      const [on, setOn] = useState(false);
      return (
        <SuperChipGroup ariaLabel="Filtrar por pagador">
          <SuperChip selected={on} onClick={() => setOn((x) => !x)}>
            Ana
          </SuperChip>
        </SuperChipGroup>
      );
    };
    renderWithTheme(<Harness />);
    expect(screen.getByRole('group', { name: 'Filtrar por pagador' })).toBeInTheDocument();
    const chip = screen.getByRole('button', { name: 'Ana' });
    expect(chip).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(chip);
    expect(chip).toHaveAttribute('aria-pressed', 'true');
  });

  it('solo con onClick es un botón sin aria-pressed', () => {
    const onClick = vi.fn();
    renderWithTheme(<SuperChip onClick={onClick}>Añadir</SuperChip>);
    const chip = screen.getByRole('button', { name: 'Añadir' });
    expect(chip).not.toHaveAttribute('aria-pressed');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('sin onClick ni selected es una etiqueta, no un botón', () => {
    renderWithTheme(<SuperChip>Pro</SuperChip>);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('deshabilitado no dispara onClick', () => {
    const onClick = vi.fn();
    renderWithTheme(
      <SuperChip selected={false} disabled onClick={onClick}>
        Luis
      </SuperChip>,
    );
    const chip = screen.getByRole('button', { name: 'Luis' });
    expect(chip).toBeDisabled();
    fireEvent.click(chip);
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each(['light', 'dark'] as const)(
    'marcado en %s usa el fondo soft con su texto, nunca onPrimary',
    (mode) => {
      renderWithTheme(
        <SuperChip selected onClick={vi.fn()}>
          Marta
        </SuperChip>,
        { mode },
      );
      const t = resolveTokens(mode);
      const style = getComputedStyle(screen.getByRole('button', { name: 'Marta' }));
      expect(style.backgroundColor).toBe(rgb(t.primarySoft));
      expect(style.color).toBe(rgb(t.primarySoftText));
    },
  );
});
