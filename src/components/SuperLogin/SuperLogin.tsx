import type { ReactElement } from 'react';
import { SuperAuthTemplate } from '../SuperAuthTemplate/SuperAuthTemplate';
import { SuperButton } from '../SuperButton/SuperButton';
import { SuperInput } from '../SuperInput/SuperInput';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Extra, Form, Header, HiddenAccount } from './SuperLogin.styles';
import type { SuperLoginProps } from './SuperLogin.types';
import { useSuperLogin } from './useSuperLogin';

/**
 * Login de las webs de uso propio: la misma pantalla en todas, solo con contraseña.
 * Cada web pone su marca, su frase, sus chips, el selector de idioma y tema
 * (`topActions`, con `SuperLocaleThemeSwitch`) y su versión; el aspecto sale de sus tokens.
 * La petición, la sesión y los toasts los lleva la app.
 */
export const SuperLogin = ({
  labels,
  onSubmit,
  loading = false,
  error,
  onPasswordChange,
  version,
  credit,
  account,
  extra,
  ...template
}: SuperLoginProps): ReactElement => {
  const form = useSuperLogin(onSubmit, loading, onPasswordChange);

  return (
    <SuperAuthTemplate
      {...template}
      footer={
        <SuperTypography variant="caption" color="textSubtle" mono>
          {credit ? `v${version} · ${credit}` : `v${version}`}
        </SuperTypography>
      }
    >
      <Header>
        <SuperTypography variant="h3" as="h1">
          {labels.title}
        </SuperTypography>
        {labels.subtitle ? (
          <SuperTypography variant="bodySmall" color="textMuted">
            {labels.subtitle}
          </SuperTypography>
        ) : null}
      </Header>

      <Form onSubmit={form.onSubmit} noValidate>
        {account ? (
          <HiddenAccount
            type="text"
            name="username"
            autoComplete="username"
            value={account}
            readOnly
            tabIndex={-1}
            aria-hidden
          />
        ) : null}
        <SuperInput
          type="password"
          name="password"
          label={labels.password}
          autoComplete="current-password"
          autoFocus
          fullWidth
          value={form.password}
          error={error}
          onChange={form.onChange}
        />
        <SuperButton
          type="submit"
          fullWidth
          rightIcon="chevronRight"
          loading={loading}
          disabled={!form.canSubmit && !loading}
        >
          {labels.submit}
        </SuperButton>
      </Form>

      {extra ? <Extra>{extra}</Extra> : null}
    </SuperAuthTemplate>
  );
};

export type { SuperLoginLabels, SuperLoginProps } from './SuperLogin.types';
