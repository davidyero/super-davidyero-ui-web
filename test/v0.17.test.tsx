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

const ROLE_ICONS = [
  'role-owner',
  'role-admin',
  'role-editor',
  'role-viewer',
  'role-reception',
  'role-staff',
  'role-member',
  'role-moderator',
  'role-thanos',
  'role-superthanos',
];

describe('0.17.0', () => {
  it.each(ROLE_ICONS)('SuperIcon pinta el icono propio %s', (name) => {
    const { container } = render(<SuperIcon name={name} />, { wrapper });
    expect(container.querySelector('svg path, svg circle, svg rect')).not.toBeNull();
  });

  it('role-superthanos es el guantelete dorado del plan', () => {
    const { container } = render(<SuperIcon name="role-superthanos" />, { wrapper });
    expect(container.querySelector('linearGradient')).not.toBeNull();
  });

  it('cada rol de ROLE_BADGE apunta a un icono propio', () => {
    for (const { icon } of Object.values(ROLE_BADGE)) expect(ROLE_ICONS).toContain(icon);
  });

  it('SuperBadge con role pone el icono del rol', () => {
    const { container } = render(<SuperBadge role="owner">Dueño</SuperBadge>, { wrapper });
    expect(container.querySelector('[data-icon="role-owner"]')).not.toBeNull();
  });

  it('si llegan plan y role, gana plan', () => {
    const { container } = render(
      <SuperBadge plan="pro" role="viewer">
        Pro
      </SuperBadge>,
      { wrapper },
    );
    expect(container.querySelector('[data-icon="plan-pro"]')).not.toBeNull();
  });
});
