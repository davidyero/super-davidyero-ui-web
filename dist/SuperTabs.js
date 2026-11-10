import { SuperIcon } from './chunk-34SSRPSU.js';
import './chunk-3YBGSPOJ.js';
import { space, focusVisible, transition } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId, useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var SLIDE = "260ms cubic-bezier(0.22, 1, 0.36, 1)";
var List = styled.div({
  position: "relative",
  display: "flex",
  gap: space.xs,
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "1px",
    background: v.border,
    pointerEvents: "none"
  }
});
var Indicator = styled.span(({ $animate }) => ({
  position: "absolute",
  left: 0,
  bottom: 0,
  height: "2px",
  zIndex: 1,
  borderRadius: "2px",
  background: v.accent,
  pointerEvents: "none",
  transition: $animate ? `transform ${SLIDE}, width ${SLIDE}` : "none",
  "@media (prefers-reduced-motion: reduce)": { transition: "none" }
}));
var Tab = styled.button(
  ({ $active, $size }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: space.xs,
    padding: $size === "sm" ? `${space.xs} ${space.sm}` : `${space.sm} ${space.md}`,
    border: "none",
    background: "transparent",
    color: $active ? v.text : v.textMuted,
    fontFamily: v.font.base,
    fontSize: $size === "sm" ? "13px" : "14px",
    fontWeight: $active ? 600 : 500,
    whiteSpace: "nowrap",
    cursor: "pointer",
    transition: `color ${transition}`,
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
  const listRef = useRef(null);
  const [box, setBox] = useState(null);
  const [animate, setAnimate] = useState(false);
  const measure = useCallback(() => {
    const el = listRef.current?.querySelector('[role="tab"][aria-selected="true"]');
    setBox(el ? { x: el.offsetLeft, width: el.offsetWidth } : null);
  }, []);
  useLayoutEffect(measure, [measure, value, items, size]);
  useEffect(() => {
    if (box && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
    return void 0;
  }, [box, animate]);
  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [measure]);
  return /* @__PURE__ */ jsxs(
    List,
    {
      ref: listRef,
      role: "tablist",
      "aria-label": ariaLabel,
      onKeyDown,
      className,
      children: [
        box ? /* @__PURE__ */ jsx(
          Indicator,
          {
            "aria-hidden": true,
            $animate: animate,
            style: { width: box.width, transform: `translateX(${box.x}px)` }
          }
        ) : null,
        items.map((item) => {
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
        })
      ]
    }
  );
};

export { SuperTabs };
