import type { ReactElement } from 'react';
import { Slot } from './SuperGoogleButton.styles';
import type { SuperGoogleButtonProps } from './SuperGoogleButton.types';
import { useSuperGoogleButton } from './useSuperGoogleButton';

/**
 * "Continuar con Google": el botón oficial de Google Identity Services (su diseño
 * lo fija Google y sigue el tema claro/oscuro). Entrega el ID token por
 * `onCredential`. Sin `clientId` no se pinta.
 */
export const SuperGoogleButton = ({
  clientId,
  onCredential,
  locale,
  disabled = false,
  className,
}: SuperGoogleButtonProps): ReactElement | null => {
  const { slot, available } = useSuperGoogleButton(clientId, locale, onCredential);
  if (!available) return null;
  return <Slot ref={slot} $disabled={disabled} className={className} />;
};

export type { SuperGoogleButtonProps } from './SuperGoogleButton.types';
