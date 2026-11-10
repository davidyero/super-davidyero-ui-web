import { controlBox, controlText, FieldRoot, FieldLabel, describedBy, FieldMessage } from './chunk-SG6MIYR5.js';
import { SuperIcon } from './chunk-34SSRPSU.js';
import { space, transition, zIndex } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useId, useRef, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var HEIGHT = { sm: "34px", md: "42px", lg: "50px" };
var Box = styled.div(
  ({ $invalid, $size, $disabled }) => ({
    ...controlBox($invalid),
    position: "relative",
    height: HEIGHT[$size],
    opacity: $disabled ? 0.6 : 1
  })
);
var Trigger = styled.button(
  controlText,
  ({ $placeholder }) => ({
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: `0 36px 0 ${space.md}`,
    textAlign: "left",
    cursor: "pointer",
    color: $placeholder ? v.textMuted : v.text,
    "&:disabled": { cursor: "not-allowed" }
  })
);
var Value = styled.span({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});
var Chevron = styled.span(({ $open }) => ({
  position: "absolute",
  right: space.md,
  top: "50%",
  transform: `translateY(-50%) rotate(${$open ? 180 : 0}deg)`,
  transition: `transform ${transition}`,
  display: "inline-flex",
  pointerEvents: "none",
  color: v.textMuted
}));
var List = styled.ul(({ $up }) => ({
  position: "fixed",
  zIndex: zIndex.popover,
  margin: 0,
  padding: space.xs,
  listStyle: "none",
  boxSizing: "border-box",
  width: "max-content",
  overflowY: "auto",
  overscrollBehavior: "contain",
  borderRadius: v.radius.md,
  border: `1px solid ${v.border}`,
  background: v.surfaceElevated,
  boxShadow: v.shadow.lg,
  transform: $up ? "translateY(-100%)" : "none",
  animation: "sd-dropdown-in 120ms ease",
  "@keyframes sd-dropdown-in": {
    from: { opacity: 0, marginTop: $up ? "4px" : "-4px" }
  },
  "@media (prefers-reduced-motion: reduce)": { animation: "none" }
}));
var Option = styled.li(
  ({ $active, $selected, $disabled }) => ({
    display: "flex",
    alignItems: "center",
    gap: space.sm,
    minHeight: "40px",
    padding: `0 ${space.md}`,
    borderRadius: v.radius.sm,
    fontFamily: v.font.base,
    fontSize: "14px",
    fontWeight: $selected ? 600 : 400,
    color: $disabled ? v.textSubtle : $selected ? v.primarySoftText : v.text,
    background: $selected ? v.primarySoft : $active ? v.surfaceSunken : "transparent",
    cursor: $disabled ? "not-allowed" : "pointer",
    // El texto baja de línea antes que salirse de la lista.
    overflowWrap: "anywhere",
    "@media (pointer: coarse)": { minHeight: "44px", fontSize: "16px" }
  })
);
var OptionLabel = styled.span({ flex: 1, minWidth: 0 });
var Check = styled.span({ display: "inline-flex", flexShrink: 0 });
var MAX_LIST_HEIGHT = 280;
var GAP = 6;
var useSuperDropdown = ({
  value,
  options,
  onChange,
  disabled,
  id
}) => {
  const autoId = useId();
  const baseId = id ?? autoId;
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [position, setPosition] = useState(null);
  const typed = useRef({ text: "", at: 0 });
  const selectedIndex = options.findIndex((o) => o.value === value);
  const enabled = (index) => index >= 0 && !options[index]?.disabled;
  const step = (from, delta) => {
    for (let i = from + delta; i >= 0 && i < options.length; i += delta) if (enabled(i)) return i;
    return from;
  };
  const first = () => step(-1, 1);
  const last = () => step(options.length, -1);
  const place = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom - GAP * 2;
    const above = rect.top - GAP * 2;
    const up = below < Math.min(MAX_LIST_HEIGHT, 160) && above > below;
    setPosition({
      top: up ? rect.top - GAP : rect.bottom + GAP,
      left: rect.left,
      width: rect.width,
      maxHeight: Math.max(120, Math.min(MAX_LIST_HEIGHT, up ? above : below)),
      up
    });
  }, []);
  const openList = (index) => {
    if (disabled || options.length === 0) return;
    place();
    setActive(index ?? (enabled(selectedIndex) ? selectedIndex : first()));
    setOpen(true);
  };
  const close = (focusTrigger = true) => {
    setOpen(false);
    setActive(-1);
    if (focusTrigger) triggerRef.current?.focus();
  };
  const choose = (index) => {
    const option = options[index];
    if (!option || option.disabled) return;
    if (option.value !== value) onChange(option.value);
    close();
  };
  useLayoutEffect(() => {
    if (!open) return void 0;
    const onScroll = () => place();
    const onDown = (event) => {
      const target = event.target;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      close(false);
    };
    window.addEventListener("resize", onScroll);
    window.addEventListener("scroll", onScroll, true);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open, place]);
  useEffect(() => {
    if (!open || active < 0) return;
    const node = listRef.current?.querySelector(`[data-index="${active}"]`);
    node?.scrollIntoView?.({ block: "nearest" });
  }, [open, active]);
  const typeahead = (key) => {
    const now = Date.now();
    typed.current.text = now - typed.current.at > 700 ? key : typed.current.text + key;
    typed.current.at = now;
    const text = typed.current.text.toLowerCase();
    const start = open ? active : selectedIndex;
    const order = [...options.keys()].map((_, i) => (start + 1 + i) % options.length);
    const hit = order.find((i) => enabled(i) && options[i]?.label.toLowerCase().startsWith(text));
    return hit ?? null;
  };
  const onKeyDown = (event) => {
    if (disabled) return;
    const { key } = event;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        openList(key === "ArrowUp" && !enabled(selectedIndex) ? last() : void 0);
      } else if (key.length === 1 && /\S/.test(key)) {
        const hit = typeahead(key);
        if (hit !== null) choose(hit);
      }
      return;
    }
    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((i) => step(i, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => step(i, -1));
        break;
      case "Home":
        event.preventDefault();
        setActive(first());
        break;
      case "End":
        event.preventDefault();
        setActive(last());
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (key.length === 1 && /\S/.test(key)) {
          const hit = typeahead(key);
          if (hit !== null) setActive(hit);
        }
    }
  };
  return {
    baseId,
    listId: `${baseId}-list`,
    optionId: (index) => `${baseId}-option-${index}`,
    triggerRef,
    listRef,
    open,
    active,
    setActive,
    position,
    selected: options[selectedIndex] ?? null,
    toggle: () => open ? close() : openList(),
    choose,
    onKeyDown
  };
};
var SuperDropdown = ({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  hint,
  disabled = false,
  fullWidth = false,
  size = "md",
  id,
  ariaLabel,
  className
}) => {
  const { triggerRef, listRef, ...d } = useSuperDropdown({
    value,
    options,
    onChange,
    disabled,
    id
  });
  const labelId = `${d.baseId}-label`;
  return /* @__PURE__ */ jsxs(FieldRoot, { $fullWidth: fullWidth, className, children: [
    label ? /* @__PURE__ */ jsx(FieldLabel, { id: labelId, htmlFor: d.baseId, children: label }) : null,
    /* @__PURE__ */ jsxs(Box, { $invalid: Boolean(error), $size: size, $disabled: disabled, children: [
      /* @__PURE__ */ jsx(
        Trigger,
        {
          ref: triggerRef,
          id: d.baseId,
          type: "button",
          role: "combobox",
          "aria-haspopup": "listbox",
          "aria-expanded": d.open,
          "aria-controls": d.listId,
          "aria-activedescendant": d.open && d.active >= 0 ? d.optionId(d.active) : void 0,
          "aria-labelledby": label ? labelId : void 0,
          "aria-label": label ? void 0 : ariaLabel,
          "aria-invalid": error ? true : void 0,
          "aria-describedby": describedBy(d.baseId, error, hint),
          disabled,
          onClick: d.toggle,
          onKeyDown: d.onKeyDown,
          $placeholder: !d.selected,
          children: /* @__PURE__ */ jsx(Value, { children: d.selected?.label ?? placeholder ?? "" })
        }
      ),
      /* @__PURE__ */ jsx(Chevron, { $open: d.open, children: /* @__PURE__ */ jsx(SuperIcon, { name: "chevronDown", size: 16 }) })
    ] }),
    d.open && d.position ? createPortal(
      /* @__PURE__ */ jsx(
        List,
        {
          ref: listRef,
          id: d.listId,
          role: "listbox",
          "aria-labelledby": label ? labelId : void 0,
          "aria-label": label ? void 0 : ariaLabel,
          $up: d.position.up,
          style: {
            top: d.position.top,
            left: d.position.left,
            // Al menos el ancho del botón; más si una opción lo necesita, sin salirse de la
            // pantalla (ahí el texto baja de línea).
            minWidth: d.position.width,
            maxWidth: `calc(100vw - ${d.position.left + 8}px)`,
            maxHeight: d.position.maxHeight
          },
          children: options.map((option, index) => {
            const selected = option.value === value;
            return /* @__PURE__ */ jsxs(
              Option,
              {
                id: d.optionId(index),
                "data-index": index,
                role: "option",
                "aria-selected": selected,
                "aria-disabled": option.disabled || void 0,
                $active: index === d.active,
                $selected: selected,
                $disabled: Boolean(option.disabled),
                onMouseDown: (event) => {
                  event.preventDefault();
                  d.choose(index);
                },
                onMouseEnter: () => !option.disabled && d.setActive(index),
                children: [
                  /* @__PURE__ */ jsx(OptionLabel, { children: option.label }),
                  selected ? /* @__PURE__ */ jsx(Check, { children: /* @__PURE__ */ jsx(SuperIcon, { name: "check", size: 16 }) }) : null
                ]
              },
              option.value
            );
          })
        }
      ),
      document.body
    ) : null,
    /* @__PURE__ */ jsx(FieldMessage, { id: d.baseId, error, hint })
  ] });
};

export { SuperDropdown };
