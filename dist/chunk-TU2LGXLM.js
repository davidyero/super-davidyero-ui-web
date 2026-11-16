import { space, transition, zIndex } from './chunk-GSUBWCY7.js';
import { v } from './chunk-VQ2WXUA7.js';
import { useId, isValidElement, cloneElement } from 'react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Wrap = styled.span(({ $block }) => ({
  position: "relative",
  display: $block ? "flex" : "inline-flex",
  ...$block ? { width: "100%", minWidth: 0 } : {},
  '&:hover > [role="tooltip"], &:focus-within > [role="tooltip"]': {
    opacity: 1,
    visibility: "visible"
  }
}));
var PLACEMENT = {
  top: { left: "50%", transform: "translateX(-50%)", bottom: `calc(100% + ${space.xs})` },
  bottom: { left: "50%", transform: "translateX(-50%)", top: `calc(100% + ${space.xs})` },
  right: { top: "50%", transform: "translateY(-50%)", left: `calc(100% + ${space.sm})` }
};
var Bubble = styled.span(({ $placement }) => ({
  position: "absolute",
  ...PLACEMENT[$placement],
  zIndex: zIndex.tooltip,
  padding: `${space.xxs} ${space.sm}`,
  borderRadius: v.radius.sm,
  background: v.surfaceElevated,
  border: `1px solid ${v.border}`,
  boxShadow: v.shadow.md,
  color: v.text,
  fontFamily: v.font.base,
  fontSize: "13px",
  lineHeight: 1.35,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  visibility: "hidden",
  transition: `opacity ${transition}`
}));
var SuperTooltip = ({
  label,
  children,
  placement = "top",
  block = false,
  className
}) => {
  const id = useId();
  const trigger = isValidElement(children) ? cloneElement(children, { "aria-describedby": id }) : children;
  return /* @__PURE__ */ jsxs(Wrap, { $block: block, className, children: [
    trigger,
    /* @__PURE__ */ jsx(Bubble, { role: "tooltip", id, $placement: placement, children: label })
  ] });
};

export { SuperTooltip };
