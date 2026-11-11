import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { ROLE_BADGE, SuperBadge } from '../src/components/SuperBadge/SuperBadge';
import { SuperIcon } from '../src/components/SuperIcon/SuperIcon';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { TEST_LABELS } from './renderWithTheme';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SuperThemeProvider mode="light" labels={TEST_LABELS}>
    {children}
  </SuperThemeProvider>
);

describe('0.18.0: rol TEST', () => {
  it('SuperIcon pinta el matraz role-test', () => {
    const { container } = render(<SuperIcon name="role-test" />, { wrapper });
    expect(container.querySelector('svg path')).not.toBeNull();
    expect(container.querySelectorAll('svg circle')).toHaveLength(2);
  });

  it('ROLE_BADGE.test usa role-test con tono info', () => {
    expect(ROLE_BADGE.test).toEqual({ icon: 'role-test', tone: 'info' });
  });

  it('SuperBadge role="test" pone el icono del matraz', () => {
    const { container, getByText } = render(<SuperBadge role="test">Test</SuperBadge>, {
      wrapper,
    });
    expect(container.querySelector('[data-icon="role-test"]')).not.toBeNull();
    expect(getByText('Test')).toBeTruthy();
  });
});
