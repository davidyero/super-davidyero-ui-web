import { SuperIcon } from './chunk-ZLC5VFBD.js';
import './chunk-V6RXFFM7.js';
import { space, focusVisible, transition } from './chunk-BJDG5RNM.js';
import { v } from './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import { useId, useRef } from 'react';
import styled from '@emotion/styled';
import { jsx, jsxs } from '@emotion/react/jsx-runtime';

var List = styled.div({
  display: "flex",
  gap: space.xs,
  borderBottom: `1px solid ${v.border}`,
  overflowX: "auto",
  scrollbarWidth: "none"
});
var Tab = styled.button(
  ({ $active, $size }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: space.xs,
    padding: $size === "sm" ? `${space.xs} ${space.sm}` : `${space.sm} ${space.md}`,
    marginBottom: "-1px",
    border: "none",
    borderBottom: `2px solid ${$active ? v.accent : "transparent"}`,
    background: "transparent",
    color: $active ? v.text : v.textMuted,
    fontFamily: v.font.base,
    fontSize: $size === "sm" ? "13px" : "14px",
    fontWeight: $active ? 600 : 500,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: `color ${transition}, border-color ${transition}`,
    "&:hover:not(:disabled)": { color: v.text },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:focus-visible": { ...focusVisible, borderRadius: v.radius.sm }
  })
);
var Count = styled.span(({ $active }) => ({
  minWidth: "20px",
  padding: `1px ${space.xs}`,
  borderRadius: v.radius.pill,
  background: $active ? v.primarySoft : v.surfaceSunken,
  color: $active ? v.primarySoftText : v.textMuted,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: 1.4,
  textAlign: "center"
}));
var useSuperTabs = (items, value, onChange) => {
  const refs = useRef(/* @__PURE__ */ new Map());
  const enabled = items.filter((item) => !item.disabled);
  const move = (to) => {
    if (!to) return;
    onChange(to.id);
    refs.current.get(to.id)?.focus();
  };
  const onKeyDown = (event) => {
    const index = enabled.findIndex((item) => item.id === value);
    if (event.key === "ArrowRight") move(enabled[(index + 1) % enabled.length]);
    else if (event.key === "ArrowLeft")
      move(enabled[(index - 1 + enabled.length) % enabled.length]);
    else if (event.key === "Home") move(enabled[0]);
    else if (event.key === "End") move(enabled[enabled.length - 1]);
    else return;
    event.preventDefault();
  };
  const register = (id) => (el) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };
  return { onKeyDown, register };
};
var SuperTabs = ({
  items,
  value,
  onChange,
  ariaLabel,
  idBase,
  size = "md",
  className
}) => {
  const autoId = useId();
  const base = idBase ?? autoId;
  const { onKeyDown, register } = useSuperTabs(items, value, onChange);
  return /* @__PURE__ */ jsx(List, { role: "tablist", "aria-label": ariaLabel, onKeyDown, className, children: items.map((item) => {
    const active = item.id === value;
    return /* @__PURE__ */ jsxs(
      Tab,
      {
        ref: register(item.id),
        type: "button",
        role: "tab",
        id: `${base}-tab-${item.id}`,
        "aria-selected": active,
        "aria-controls": `${base}-panel-${item.id}`,
        tabIndex: active ? 0 : -1,
        disabled: item.disabled,
        $active: active,
        $size: size,
        onClick: () => onChange(item.id),
        children: [
          item.icon ? /* @__PURE__ */ jsx(SuperIcon, { name: item.icon, size: 16 }) : null,
          item.label,
          item.count !== void 0 ? /* @__PURE__ */ jsx(Count, { $active: active, children: item.count }) : null
        ]
      },
      item.id
    );
  }) });
};

export { SuperTabs };
