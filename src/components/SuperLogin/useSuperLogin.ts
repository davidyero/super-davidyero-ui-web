import { useState, type ChangeEvent, type FormEvent } from 'react';

interface UseSuperLogin {
  password: string;
  canSubmit: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const useSuperLogin = (
  submit: (password: string) => void,
  loading: boolean,
  onPasswordChange?: (password: string) => void,
): UseSuperLogin => {
  const [password, setPassword] = useState('');
  const canSubmit = password.length > 0 && !loading;

  return {
    password,
    canSubmit,
    onChange: (event) => {
      setPassword(event.target.value);
      onPasswordChange?.(event.target.value);
    },
    onSubmit: (event) => {
      event.preventDefault();
      if (canSubmit) submit(password);
    },
  };
};
