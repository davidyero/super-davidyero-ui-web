import { useId, useState } from 'react';

interface UseSuperInputArgs {
  id: string | undefined;
  type: string | undefined;
  error: string | undefined;
  hint: string | undefined;
}

/** Ids de accesibilidad y el estado del ojo de contraseña. */
export const useSuperInput = ({ id, type, error, hint }: UseSuperInputArgs) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';
  const describedBy =
    [error ? `${inputId}-error` : null, !error && hint ? `${inputId}-hint` : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return {
    inputId,
    isPassword,
    revealed,
    toggleReveal: () => setRevealed((r) => !r),
    effectiveType: isPassword && revealed ? 'text' : type,
    describedBy,
  };
};
