import { render, screen } from '@testing-library/react';
import { createRef, type AnchorHTMLAttributes, type ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { SuperButton } from '../src/components/SuperButton/SuperButton';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { SuperTextarea } from '../src/components/SuperTextarea/SuperTextarea';
import { breakpoints, media, space } from '../src/styles/scale';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { renderWithTheme, TEST_LABELS } from './renderWithTheme';

// Hace de `Link` del router: marca el enlace para saber que se usó.
const FakeLink = ({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }): ReactElement => (
  <a {...rest} href={href} data-router-link="true">
    {children}
  </a>
);

const withLink = (ui: ReactElement): ReturnType<typeof render> =>
  render(
    <SuperThemeProvider mode="light" labels={TEST_LABELS} LinkComponent={FakeLink}>
      {ui}
    </SuperThemeProvider>,
  );

describe('0.3.0', () => {
  it('SuperInput y SuperTextarea reenvían el ref al elemento nativo', () => {
    const input = createRef<HTMLInputElement>();
    const area = createRef<HTMLTextAreaElement>();
    renderWithTheme(
      <>
        <SuperInput ref={input} label="Email" />
        <SuperTextarea ref={area} label="Mensaje" />
      </>,
    );
    expect(input.current).toBeInstanceOf(HTMLInputElement);
    expect(area.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('SuperButton con href interno usa el LinkComponent de la app', () => {
    withLink(<SuperButton href="/ajustes">Ajustes</SuperButton>);
    expect(screen.getByRole('link', { name: 'Ajustes' })).toHaveAttribute(
      'data-router-link',
      'true',
    );
  });

  it('los enlaces externos y los inactivos no pasan por el router', () => {
    withLink(
      <>
        <SuperButton href="https://davidyero.com">Web</SuperButton>
        <SuperButton href="/x" disabled>
          Off
        </SuperButton>
      </>,
    );
    const external = screen.getByRole('link', { name: 'Web' });
    expect(external).not.toHaveAttribute('data-router-link');
    expect(external).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Off').closest('a')).not.toHaveAttribute('data-router-link');
  });

  it('exporta espaciado y breakpoints mobile-first', () => {
    expect(space.lg).toBe('16px');
    expect(breakpoints.md).toBe(900);
    expect(media.md).toBe('@media (min-width: 900px)');
  });
});
