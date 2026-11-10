import { useId, useState } from 'react';
import { describedBy as buildDescribedBy } from '../../styles/field';

interface UseSuperInputArgs {
  id: string | undefined;
  type: string | undefined;
  error: string | undefined;
  hint: string | undefined;
  /** El `aria-describedby` que llega por props: se suma al del error o la ayuda. */
  ariaDescribedBy?: string;
}

/** Ids de accesibilidad y el estado del ojo de contraseña. */
export const useSuperInput = ({ id, type, error, hint, ariaDescribedBy }: UseSuperInputArgs) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const describedBy = buildDescribedBy(inputId, error, hint, ariaDescribedBy);

  return {
    inputId,
    isPassword,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    effectiveType: isPassword && revealed ? 'text' : type,
    describedBy,
  };
};
