import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { SuperAuthTemplate } from '../src/components/SuperAuthTemplate/SuperAuthTemplate';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { TEST_LABELS } from './renderWithTheme';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SuperThemeProvider mode="light" labels={TEST_LABELS}>
    {children}
  </SuperThemeProvider>
);

const Template = ({ screenKey, text }: { screenKey: string; text: string }) => (
  <SuperAuthTemplate brand="AP" tagline="Frase" screenKey={screenKey}>
    <p>{text}</p>
  </SuperAuthTemplate>
);

describe('0.12.0', () => {
  it('SuperAuthTemplate mantiene la tarjeta saliente hasta que termina su animación', () => {
    const { rerender } = render(<Template screenKey="/login" text="Login" />, { wrapper });
    rerender(<Template screenKey="/register" text="Registro" />);
    const leaving = screen.getByText('Login').parentElement as HTMLElement;
    expect(leaving).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Registro')).toBeInTheDocument();
    // jsdom no tiene AnimationEvent: React escucha la versión con prefijo.
    fireEvent(leaving, new Event('webkitAnimationEnd', { bubbles: true }));
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});
