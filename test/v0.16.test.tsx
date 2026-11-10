import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { SuperBadge } from '../src/components/SuperBadge/SuperBadge';
import { SuperIcon } from '../src/components/SuperIcon/SuperIcon';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { TEST_LABELS } from './renderWithTheme';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SuperThemeProvider mode="light" labels={TEST_LABELS}>
    {children}
  </SuperThemeProvider>
);

describe('0.16.0', () => {
  it.each(['plan-free', 'plan-lite', 'plan-pro', 'plan-thanos', 'plan-superthanos'])(
    'SuperIcon pinta el icono propio %s',
    (name) => {
      const { container } = render(<SuperIcon name={name} />, { wrapper });
      expect(container.querySelector('svg path')).not.toBeNull();
    },
  );

  it('superthanos usa un degradado con id único por instancia', () => {
    const { container } = render(
      <>
        <SuperIcon name="plan-superthanos" />
        <SuperIcon name="plan-superthanos" />
      </>,
      { wrapper },
    );
    const ids = [...container.querySelectorAll('linearGradient')].map((g) => g.id);
    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it('SuperBadge con plan pone el icono del plan', () => {
    const { container } = render(<SuperBadge plan="pro">Pro</SuperBadge>, { wrapper });
    expect(container.querySelector('[data-icon="plan-pro"]')).not.toBeNull();
  });
});
