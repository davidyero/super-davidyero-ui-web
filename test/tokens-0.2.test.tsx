import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SuperTextarea } from '../src/components/SuperTextarea/SuperTextarea';
import { SuperToast } from '../src/components/SuperToast/SuperToast';
import { SuperTypography } from '../src/components/SuperTypography/SuperTypography';
import { toast } from '../src/stores/toastStore';
import { defineTokens, resolveTokens } from '../src/theme/tokens';
import { renderWithTheme } from './renderWithTheme';

const styleText = (): string =>
  Array.from(document.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

afterEach(() => act(() => toast.clear()));

describe('tokens derivados', () => {
  it('accent, accentSoft, onAccent y textSubtle caen a sus equivalentes si la app no los define', () => {
    const t = resolveTokens('light', { primary: '#123456', textMuted: '#777777' });
    expect(t.accent).toBe('#123456');
    expect(t.accentSoft).toBe(t.primarySoft);
    expect(t.onAccent).toBe(t.onPrimary);
    expect(t.textSubtle).toBe('#777777');
  });

  it('respeta accent y textSubtle propios', () => {
    const t = resolveTokens('dark', {
      primary: '#000000',
      accent: '#c4f24a',
      textSubtle: '#4d4d4d',
    });
    expect(t.accent).toBe('#c4f24a');
    expect(t.textSubtle).toBe('#4d4d4d');
  });
});

describe('ajuste tipográfico por app', () => {
  it('escribe las variables de la variante y el componente las usa con su valor por defecto', () => {
    const tokens = defineTokens({
      light: {
        typography: {
          label: { textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 },
        },
      },
      dark: {},
    });
    renderWithTheme(<SuperTypography variant="label">Estado</SuperTypography>, {
      mode: 'light',
      tokens,
    });
    const css = styleText();
    expect(css).toContain('--sd-text-label-transform:uppercase');
    expect(css).toContain('--sd-text-label-tracking:0.08em');
    expect(css).toContain('--sd-text-label-weight:500');
    expect(css).toContain('var(--sd-text-label-transform, none)');
  });
});

describe('SuperTextarea maxCount', () => {
  it('muestra n/max sin cortar lo escrito', () => {
    renderWithTheme(
      <SuperTextarea label="Nota" value="123456" onChange={() => undefined} maxCount={5} />,
    );
    expect(screen.getByText('6/5')).toBeInTheDocument();
    expect(screen.getByLabelText('Nota')).not.toHaveAttribute('maxLength');
  });
});

describe('toast con acción', () => {
  it('pinta la acción, la ejecuta y cierra el toast', async () => {
    const onClick = vi.fn();
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.success('Borrado', { action: { label: 'Deshacer', onClick }, durationMs: 0 });
    });
    await userEvent.click(screen.getByRole('button', { name: 'Deshacer' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Borrado')).not.toBeInTheDocument();
  });

  it('acepta el título como segundo argumento (atajo de la 0.1)', () => {
    renderWithTheme(<SuperToast />);
    act(() => {
      toast.info('Cuerpo', 'Título');
    });
    expect(screen.getByText('Título')).toBeInTheDocument();
  });
});
