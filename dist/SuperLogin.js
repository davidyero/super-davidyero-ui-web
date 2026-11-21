import { SuperInput } from './chunk-VU5XM4WZ.js';
import './chunk-SG6MIYR5.js';
import { SuperAuthTemplate } from './chunk-TO26XQ3G.js';
import { SuperTypography } from './chunk-6OHDPNJ7.js';
import { SuperButton } from './chunk-2PIERCDX.js';
import './chunk-5QH3G7FH.js';
import './chunk-DGDXZTZH.js';
import './chunk-2OYI3VCV.js';
import { space } from './chunk-GSUBWCY7.js';
import './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { useState } from 'react';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Header = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: space.xxs,
  marginBottom: space.xl
});
var Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: space.lg
});
var HiddenAccount = styled.input({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0
});
var Extra = styled.div({
  marginTop: space.lg
});

// src/components/SuperLogin/SuperLogin.texts.ts
var SUPER_LOGIN_TEXTS = {
  es: {
    title: "Bienvenido de vuelta",
    subtitle: "La misma contrase\xF1a de todas tus webs.",
    password: "Contrase\xF1a",
    submit: "Entrar"
  },
  en: {
    title: "Welcome back",
    subtitle: "The same password for all your sites.",
    password: "Password",
    submit: "Sign in"
  }
};
var useSuperLogin = (submit, loading, onPasswordChange) => {
  const [password, setPassword] = useState("");
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
    }
  };
};
var SuperLogin = ({
  locale = "es",
  labels: custom,
  onSubmit,
  loading = false,
  error,
  onPasswordChange,
  version,
  credit,
  account,
  extra,
  ...template
}) => {
  const form = useSuperLogin(onSubmit, loading, onPasswordChange);
  const labels = { ...SUPER_LOGIN_TEXTS[locale], ...custom };
  return /* @__PURE__ */ jsxs(
    SuperAuthTemplate,
    {
      ...template,
      footer: /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", color: "textSubtle", mono: true, children: credit ? `v${version} \xB7 ${credit}` : `v${version}` }),
      children: [
        /* @__PURE__ */ jsxs(Header, { children: [
          /* @__PURE__ */ jsx(SuperTypography, { variant: "h3", as: "h1", children: labels.title }),
          labels.subtitle ? /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textMuted", children: labels.subtitle }) : null
        ] }),
        /* @__PURE__ */ jsxs(Form, { onSubmit: form.onSubmit, noValidate: true, children: [
          account ? /* @__PURE__ */ jsx(
            HiddenAccount,
            {
              type: "text",
              name: "username",
              autoComplete: "username",
              value: account,
              readOnly: true,
              tabIndex: -1,
              "aria-hidden": true
            }
          ) : null,
          /* @__PURE__ */ jsx(
            SuperInput,
            {
              type: "password",
              name: "password",
              label: labels.password,
              autoComplete: "current-password",
              autoFocus: true,
              fullWidth: true,
              value: form.password,
              error,
              onChange: form.onChange
            }
          ),
          /* @__PURE__ */ jsx(
            SuperButton,
            {
              type: "submit",
              fullWidth: true,
              rightIcon: "chevronRight",
              loading,
              disabled: !form.canSubmit && !loading,
              children: labels.submit
            }
          )
        ] }),
        extra ? /* @__PURE__ */ jsx(Extra, { children: extra }) : null
      ]
    }
  );
};

export { SUPER_LOGIN_TEXTS, SuperLogin };
