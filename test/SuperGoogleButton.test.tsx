import { act, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GoogleIdentityServices } from '../src/components/SuperGoogleButton/SuperGoogleButton.types';
import type { SuperThemeMode } from '../src/theme/tokens';
import { TEST_LABELS } from './renderWithTheme';

const GSI = 'https://accounts.google.com/gsi/client';

type InitOptions = Parameters<GoogleIdentityServices['accounts']['id']['initialize']>[0];

// El hook guarda la carga del script en una variable de módulo (`loading`): cada test
// importa de cero el componente y el proveedor (que comparten contexto) para no
// depender del orden.
const load = async () => {
  vi.resetModules();
  const [{ SuperGoogleButton }, { SuperThemeProvider }] = await Promise.all([
    import('../src/components/SuperGoogleButton/SuperGoogleButton'),
    import('../src/theme/SuperThemeProvider'),
  ]);
  const ui = (
    props: { clientId?: string; locale?: string; mode?: SuperThemeMode },
    onCredential: (token: string) => void = () => undefined,
  ): ReactElement => (
    <SuperThemeProvider mode={props.mode ?? 'light'} labels={TEST_LABELS}>
      <SuperGoogleButton
        clientId={props.clientId}
        locale={props.locale ?? 'es'}
        onCredential={onCredential}
        className="gsi-slot"
      />
    </SuperThemeProvider>
  );
  return { ui };
};

const gsiScripts = (): HTMLScriptElement[] =>
  Array.from(document.head.querySelectorAll<HTMLScriptElement>(`script[src="${GSI}"]`));

const lastScript = (): HTMLScriptElement => {
  const script = gsiScripts().at(-1);
  if (!script) throw new Error('no se añadió el script de Google');
  return script;
};

/** Dispara el `load`/`error` del script y deja correr las promesas del efecto. */
const settle = async (script: HTMLScriptElement, event: 'load' | 'error'): Promise<void> => {
  await act(async () => {
    script.dispatchEvent(new Event(event));
    await Promise.resolve();
  });
};

const initialize = vi.fn<(options: InitOptions) => void>();
const renderButton = vi.fn<GoogleIdentityServices['accounts']['id']['renderButton']>((parent) => {
  const btn = document.createElement('div');
  btn.dataset.testid = 'gsi-button';
  parent.append(btn);
});

describe('SuperGoogleButton (0.22)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.google = { accounts: { id: { initialize, renderButton } } };
  });
  afterEach(() => {
    gsiScripts().forEach((s) => s.remove());
    delete window.google;
  });

  it('sin clientId no pinta nada, no carga el script ni inicializa Google', async () => {
    const { ui } = await load();
    const { container } = render(ui({ clientId: undefined }));
    await act(async () => {
      await Promise.resolve();
    });
    expect(container.querySelector('.gsi-slot')).toBeNull();
    expect(gsiScripts()).toHaveLength(0);
    expect(initialize).not.toHaveBeenCalled();
    expect(renderButton).not.toHaveBeenCalled();
  });

  it('con clientId carga el script una vez (async), inicializa en popup y pinta el botón', async () => {
    const { ui } = await load();
    const { container } = render(ui({ clientId: 'web-client' }));
    expect(gsiScripts()).toHaveLength(1);
    expect(lastScript().async).toBe(true);
    expect(initialize).not.toHaveBeenCalled();

    await settle(lastScript(), 'load');

    expect(initialize).toHaveBeenCalledTimes(1);
    expect(initialize.mock.calls[0]?.[0]).toMatchObject({
      client_id: 'web-client',
      ux_mode: 'popup',
    });
    const slot = container.querySelector('.gsi-slot');
    expect(renderButton).toHaveBeenCalledWith(slot, {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      text: 'continue_with',
      width: 360,
      locale: 'es',
    });
    expect(slot?.querySelectorAll('[data-testid="gsi-button"]')).toHaveLength(1);
  });

  it('entrega el ID token por onCredential (el último callback) e ignora respuestas sin credential', async () => {
    const { ui } = await load();
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender } = render(ui({ clientId: 'web-client' }, first));
    await settle(lastScript(), 'load');
    rerender(ui({ clientId: 'web-client' }, latest));

    const callback = initialize.mock.calls[0]?.[0].callback;
    callback?.({});
    callback?.({ credential: 'jwt.id.token' });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
    expect(latest).toHaveBeenCalledWith('jwt.id.token');
    // Cambiar solo el callback no vuelve a pintar el botón.
    expect(renderButton).toHaveBeenCalledTimes(1);
  });

  it('si el script falla no pinta el botón y el siguiente montaje reintenta la carga', async () => {
    const { ui } = await load();
    const { container, unmount } = render(ui({ clientId: 'web-client' }));
    await settle(lastScript(), 'error');

    expect(initialize).not.toHaveBeenCalled();
    expect(renderButton).not.toHaveBeenCalled();
    // Queda el hueco (el login normal sigue), sin botón de Google dentro.
    expect(container.querySelector('.gsi-slot')?.childElementCount).toBe(0);
    unmount();

    render(ui({ clientId: 'web-client' }));
    expect(gsiScripts()).toHaveLength(2);
    await settle(lastScript(), 'load');
    expect(initialize).toHaveBeenCalledTimes(1);
    expect(renderButton).toHaveBeenCalledTimes(1);
  });

  it('si se desmonta antes de que cargue el script, no inicializa ni pinta', async () => {
    const { ui } = await load();
    const { unmount } = render(ui({ clientId: 'web-client' }));
    unmount();
    await settle(lastScript(), 'load');
    expect(initialize).not.toHaveBeenCalled();
    expect(renderButton).not.toHaveBeenCalled();
  });

  it('el script se carga una sola vez aunque haya varios botones', async () => {
    const { ui } = await load();
    render(ui({ clientId: 'web-client' }));
    render(ui({ clientId: 'web-client' }));
    expect(gsiScripts()).toHaveLength(1);
    await settle(lastScript(), 'load');
    expect(renderButton).toHaveBeenCalledTimes(2);
  });

  it('vuelve a pintar el botón al cambiar el tema y el idioma, sin duplicarlo', async () => {
    const { ui } = await load();
    const { container, rerender } = render(ui({ clientId: 'web-client', mode: 'light' }));
    await settle(lastScript(), 'load');
    expect(renderButton).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ theme: 'outline', locale: 'es' }),
    );

    await act(async () => {
      rerender(ui({ clientId: 'web-client', mode: 'dark' }));
      await Promise.resolve();
    });
    expect(renderButton).toHaveBeenCalledTimes(2);
    expect(renderButton).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ theme: 'filled_black', locale: 'es' }),
    );

    await act(async () => {
      rerender(ui({ clientId: 'web-client', mode: 'dark', locale: 'en' }));
      await Promise.resolve();
    });
    expect(renderButton).toHaveBeenCalledTimes(3);
    expect(renderButton).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.objectContaining({ theme: 'filled_black', locale: 'en' }),
    );
    // El script no se vuelve a pedir y el hueco se vacía antes de cada pintado.
    expect(gsiScripts()).toHaveLength(1);
    expect(container.querySelectorAll('[data-testid="gsi-button"]')).toHaveLength(1);
  });
});
