import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { SuperIcon } from '../src/components/SuperIcon/SuperIcon';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { TEST_LABELS } from './renderWithTheme';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SuperThemeProvider mode="light" labels={TEST_LABELS}>
    {children}
  </SuperThemeProvider>
);

describe('0.13.0', () => {
  it('SuperIcon pinta el guantelete propio para thanos, sin Iconify', () => {
    const { container } = render(<SuperIcon name="thanos" size={16} label="Thanos" />, { wrapper });
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(container.querySelector('[role="img"]')).toHaveAttribute('aria-label', 'Thanos');
  });

  it('superthanos es el guantelete con un destello de más', () => {
    const thanos = render(<SuperIcon name="thanos" />, { wrapper }).container;
    const superthanos = render(<SuperIcon name="superthanos" />, { wrapper }).container;
    const count = (c: HTMLElement) => c.querySelectorAll('path').length;
    expect(count(superthanos)).toBe(count(thanos) + 1);
  });
});
