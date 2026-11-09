import { space, focusVisible, transition } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useRef } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var Track = styled.div(({ $fullWidth }) => ({
  display: $fullWidth ? "flex" : "inline-flex",
  width: $fullWidth ? "100%" : void 0,
  maxWidth: "100%",
  gap: space.xxs,
  padding: space.xxs,
  border: `1px solid ${v.border}`,
  borderRadius: v.radius.pill,
  background: v.surface,
  overflowX: "auto",
  scrollbarWidth: "none"
}));
var Option = styled.button(
  ({ $active, $size, $fullWidth }) => ({
    flex: $fullWidth ? "1 1 0" : "0 0 auto",
    minHeight: $size === "sm" ? "36px" : "44px",
    padding: `0 ${$size === "sm" ? space.md : space.lg}`,
    border: "none",
    borderRadius: v.radius.pill,
    // Activa: fondo de texto (tinta) con letra de superficie; inactiva: texto sobre superficie.
    background: $active ? v.text : "transparent",
    color: $active ? v.surface : v.textBody,
    fontFamily: v.font.base,
    fontSize: "14px",
    fontWeight: 600,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: `background ${transition}, color ${transition}`,
    "&:hover:not(:disabled)": { color: $active ? v.surface : v.text },
    "&:disabled": { opacity: 0.55, cursor: "not-allowed" },
    "&:focus-visible": focusVisible
  })
);
var SuperSegmented = ({
  options,
  value,
  onChange,
  ariaLabel,
  size = "md",
  fullWidth = false,
  className
}) => {
  const refs = useRef(/* @__PURE__ */ new Map());
  const enabled = options.filter((option) => !option.disabled);
  const onKeyDown = (event) => {
    const index = enabled.findIndex((option) => option.value === value);
    const keys = {
      ArrowRight: (index + 1) % enabled.length,
      ArrowLeft: (index - 1 + enabled.length) % enabled.length,
      Home: 0,
      End: enabled.length - 1
    };
    const target = enabled[keys[event.key] ?? -1];
    if (!target) return;
    event.preventDefault();
    onChange(target.value);
    refs.current.get(target.value)?.focus();
  };
  return /* @__PURE__ */ jsx(
    Track,
    {
      role: "tablist",
      "aria-label": ariaLabel,
      onKeyDown,
      $fullWidth: fullWidth,
      className,
      children: options.map((option) => {
        const active = option.value === value;
        return /* @__PURE__ */ jsx(
          Option,
          {
            ref: (el) => {
              if (el) refs.current.set(option.value, el);
              else refs.current.delete(option.value);
            },
            type: "button",
            role: "tab",
            "aria-selected": active,
            tabIndex: active ? 0 : -1,
            disabled: option.disabled,
            $active: active,
            $size: size,
            $fullWidth: fullWidth,
            onClick: () => onChange(option.value),
            children: option.label
          },
          option.value
        );
      })
    }
  );
};

export { SuperSegmented };
