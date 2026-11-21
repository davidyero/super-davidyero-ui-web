import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SuperBrand } from '../src/components/SuperBrand/SuperBrand';
import { renderWithTheme } from './renderWithTheme';

describe('SuperBrand', () => {
  it('pinta el nombre y, sin logo, la inicial decorativa', () => {
    const { container } = renderWithTheme(<SuperBrand name="super QA Reports" />);
    expect(screen.getByText('super QA Reports')).toBeTruthy();
    const box = container.querySelector('[aria-hidden]');
    expect(box?.textContent).toBe('S');
  });

  it('usa el logo de la app cuando se lo pasan', () => {
    renderWithTheme(<SuperBrand name="QA" logo={<svg data-testid="logo" />} />);
    expect(screen.getByTestId('logo')).toBeTruthy();
  });

  it('con hideName se anuncia como imagen con el nombre', () => {
    renderWithTheme(<SuperBrand name="QA" hideName size="sm" />);
    expect(screen.getByRole('img', { name: 'QA' })).toBeTruthy();
    expect(screen.queryByText('QA')).toBeNull();
  });
});
