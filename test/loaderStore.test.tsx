import { act, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SuperLoaderOverlay } from '../src/components/SuperLoaderOverlay/SuperLoaderOverlay';
import { loaderStore } from '../src/stores/loaderStore';
import { renderWithTheme } from './renderWithTheme';

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

afterEach(() => loaderStore.reset());

describe('loaderStore', () => {
  it('cuenta peticiones solapadas y solo baja a 0 cuando acaba la última', async () => {
    const a = deferred<string>();
    const b = deferred<string>();
    const ta = loaderStore.track(a.promise);
    const tb = loaderStore.track(b.promise);
    expect(loaderStore.getActive()).toBe(2);

    a.resolve('a');
    await ta;
    expect(loaderStore.getActive()).toBe(1);

    b.reject(new Error('falló'));
    await expect(tb).rejects.toThrow('falló');
    expect(loaderStore.getActive()).toBe(0);
  });

  it('silent no cuenta (polling, refetch en segundo plano)', async () => {
    const p = loaderStore.track(Promise.resolve(1), { silent: true });
    expect(loaderStore.getActive()).toBe(0);
    await p;
  });

  it('start() devuelve un cierre idempotente y nunca baja de cero', () => {
    const stop = loaderStore.start();
    stop();
    stop();
    loaderStore.stop();
    expect(loaderStore.getActive()).toBe(0);
  });

  it('el overlay aparece con peticiones activas y desaparece al terminar', () => {
    renderWithTheme(<SuperLoaderOverlay delayMs={0} />);
    expect(screen.queryByRole('alert')).toBeNull();
    let stop: () => void = () => undefined;
    act(() => {
      stop = loaderStore.start();
    });
    expect(screen.getByRole('alert', { name: 'Cargando' })).toBeInTheDocument();
    act(() => stop());
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
