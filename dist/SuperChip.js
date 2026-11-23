import { SuperTypography } from './chunk-YEEOPOLF.js';
import { space, focusVisible, transition } from './chunk-HF3T4CF3.js';
import './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var HEIGHT = { sm: "32px", md: "40px" };
var PAD = { sm: space.sm, md: space.md };
var ChipRoot = styled("button", {
  shouldForwardProp: (prop) => prop !== "as" && !prop.startsWith("$")
})(({ $size, $selected, $leading, $interactive }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
  maxWidth: "100%",
  minHeight: HEIGHT[$size],
  boxSizing: "border-box",
  padding: `0 ${PAD[$size]}`,
  paddingLeft: $leading ? space.xxs : PAD[$size],
  border: `1px solid ${$selected ? v.primarySoftText : v.border}`,
  borderRadius: v.radius.pill,
  background: $selected ? v.primarySoft : "transparent",
  color: $selected ? v.primarySoftText : v.textBody,
  font: "inherit",
  whiteSpace: "nowrap",
  transition: `background ${transition}, border-color ${transition}, color ${transition}`,
  ...$interactive ? {
    cursor: "pointer",
    "&:hover:not(:disabled)": {
      background: $selected ? v.primarySoft : v.surfaceSunken,
      color: $selected ? v.primarySoftText : v.text
    },
    "&:focus-visible": focusVisible,
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" }
  } : {}
}));
var Leading = styled.span({ display: "inline-flex", flexShrink: 0 });
var Group = styled.div({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: space.xs
});
var SuperChip = ({
  children,
  selected,
  onClick,
  leading,
  size = "sm",
  disabled = false,
  className
}) => {
  const interactive = selected !== void 0 || onClick !== void 0;
  return /* @__PURE__ */ jsxs(
    ChipRoot,
    {
      as: interactive ? "button" : "span",
      type: interactive ? "button" : void 0,
      "aria-pressed": selected,
      disabled: interactive ? disabled : void 0,
      onClick: interactive ? onClick : void 0,
      $size: size,
      $selected: selected === true,
      $leading: leading !== void 0,
      $interactive: interactive,
      className,
      children: [
        leading !== void 0 ? /* @__PURE__ */ jsx(Leading, { "aria-hidden": true, children: leading }) : null,
        /* @__PURE__ */ jsx(
          SuperTypography,
          {
            variant: "caption",
            weight: selected ? "semibold" : "medium",
            color: "inherit",
            truncate: true,
            as: "span",
            children
          }
        )
      ]
    }
  );
};
var SuperChipGroup = ({
  ariaLabel,
  children,
  className
}) => /* @__PURE__ */ jsx(Group, { role: "group", "aria-label": ariaLabel, className, children });

export { SuperChip, SuperChipGroup };
