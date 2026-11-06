import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperAuthTemplate } from '../src/components/SuperAuthTemplate/SuperAuthTemplate';
import { renderWithTheme } from './renderWithTheme';

describe('0.5.0', () => {
  it('SuperAuthTemplate pinta marca, frase, formulario y pie', () => {
    renderWithTheme(
      <SuperAuthTemplate
        brand={<span>Mi app</span>}
        tagline="Todo en un panel"
        hint="Métricas y más"
        topActions={<button type="button">ES</button>}
        footer={<span>v1.0.0</span>}
      >
        <form aria-label="Entrar" />
      </SuperAuthTemplate>,
    );
    expect(screen.getByText('Mi app')).toBeInTheDocument();
    expect(screen.getByText('Todo en un panel')).toBeInTheDocument();
    expect(screen.getByText('Métricas y más')).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('el carrusel duplica los chips, pero el lector solo oye una copia', () => {
    renderWithTheme(
      <SuperAuthTemplate
        brand="App"
        tagline="Frase"
        highlights={[
          { icon: 'user', label: 'Apps' },
          { icon: 'user', label: 'Dinero' },
        ]}
      >
        <div />
      </SuperAuthTemplate>,
    );
    expect(screen.getAllByText('Apps')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
