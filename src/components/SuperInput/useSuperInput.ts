import { useId, useState } from 'react';
import { describedBy as buildDescribedBy } from '../../styles/field';

interface UseSuperInputArgs {
  id: string | undefined;
  type: string | undefined;
  error: string | undefined;
  hint: string | undefined;
  /** El `aria-describedby` que llega por props: se suma al del error o la ayuda. */
  ariaDescribedBy?: string;
  invalid?: boolean;
  shakeKey?: string | number;
}

/** Ids de accesibilidad y el estado del ojo de contraseña. */
export const useSuperInput = ({
  id,
  type,
  error,
  hint,
  ariaDescribedBy,
  invalid,
  shakeKey,
}: UseSuperInputArgs) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const describedBy = buildDescribedBy(inputId, error, hint, ariaDescribedBy);

  // Sacudida: cuando aparece o cambia el error, o cuando cambia `shakeKey` con el campo
  // inválido (otro envío con el mismo error). Al montar con error ya puesto, no se mueve.
  const trigger = error || invalid ? `${error ?? ''}|${shakeKey ?? ''}|${invalid ? 1 : 0}` : '';
  const [lastTrigger, setLastTrigger] = useState(trigger);
  const [shaking, setShaking] = useState(false);
  if (trigger !== lastTrigger) {
    setLastTrigger(trigger);
    if (trigger) setShaking(true);
  }

  return {
    inputId,
    isPassword,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    effectiveType: isPassword && revealed ? 'text' : type,
    describedBy,
    shaking,
    stopShaking: () => setShaking(false),
  };
};
