import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SuperFlag } from '../src/components/SuperFlag/SuperFlag';
import { SuperSegmented } from '../src/components/SuperSegmented/SuperSegmented';
import { renderWithTheme } from './renderWithTheme';

describe('0.10.0', () => {
  it('SuperSegmented icon: banderas con nombre accesible y cambio al pulsar', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <SuperSegmented
        variant="icon"
        ariaLabel="Idioma"
        value="es"
        onChange={onChange}
        options={[
          { value: 'es', label: 'Español', icon: <SuperFlag country="co" /> },
          { value: 'en', label: 'English', icon: <SuperFlag country="us" /> },
        ]}
      />,
    );
    const es = screen.getByRole('tab', { name: 'Español' });
    expect(es).toHaveAttribute('aria-selected', 'true');
    expect(es).not.toHaveTextContent('Español');
    fireEvent.click(screen.getByRole('tab', { name: 'English' }));
    expect(onChange).toHaveBeenCalledWith('en');
  });

  it('SuperFlag es decorativa sin label y una imagen con label', () => {
    const { container } = renderWithTheme(<SuperFlag country="co" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    renderWithTheme(<SuperFlag country="us" label="Estados Unidos" />);
    expect(screen.getByRole('img', { name: 'Estados Unidos' })).toBeInTheDocument();
  });
});
