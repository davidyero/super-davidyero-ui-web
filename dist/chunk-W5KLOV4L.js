import { SuperLoader } from './chunk-ONWISGSA.js';
import { SuperIcon } from './chunk-F73VLIRK.js';
import { space, focusVisible, transition } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { jsx, jsxs, Fragment } from '@emotion/react/jsx-runtime';

var SIZE = {
  sm: { height: "32px", padX: space.md, font: "13px", gap: space.xs },
  md: { height: "40px", padX: space.lg, font: "14px", gap: space.sm },
  lg: { height: "48px", padX: space.xl, font: "15px", gap: space.sm }
};
var VARIANT = {
  primary: css({
    background: v.primary,
    color: v.onPrimary,
    border: "1px solid transparent",
    '&:hover:not([aria-disabled="true"])': { background: v.primaryHover }
  }),
  secondary: css({
    background: v.primarySoft,
    color: v.primarySoftText,
    border: "1px solid transparent",
    '&:hover:not([aria-disabled="true"])': { borderColor: v.primary }
  }),
  // Gris con borde: acción secundaria sin color de marca.
  neutral: css({
    background: v.surfaceSunken,
    color: v.text,
    border: `1px solid ${v.border}`,
    '&:hover:not([aria-disabled="true"])': { borderColor: v.borderStrong }
  }),
  outline: css({
    background: "transparent",
    color: v.text,
    border: `1px solid ${v.borderStrong}`,
    '&:hover:not([aria-disabled="true"])': { background: v.surfaceSunken }
  }),
  ghost: css({
    background: "transparent",
    color: v.text,
    border: "1px solid transparent",
    '&:hover:not([aria-disabled="true"])': { background: v.surfaceSunken }
  }),
  danger: css({
    background: v.dangerSoft,
    color: v.dangerText,
    border: `1px solid ${v.danger}`,
    '&:hover:not([aria-disabled="true"])': { background: v.danger, color: v.surface }
  })
};
var base = ({ $variant, $size, $fullWidth, $iconOnly }) => {
  const s = SIZE[$size];
  return css(
    {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      minWidth: $iconOnly ? s.height : void 0,
      width: $fullWidth ? "100%" : $iconOnly ? s.height : void 0,
      padding: $iconOnly ? 0 : `0 ${s.padX}`,
      borderRadius: v.radius.md,
      fontFamily: v.font.base,
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      whiteSpace: "nowrap",
      textDecoration: "none",
      cursor: "pointer",
      userSelect: "none",
      transition: `background ${transition}, border-color ${transition}, color ${transition}, opacity ${transition}`,
      "&:focus-visible": focusVisible,
      '&[aria-disabled="true"]': { opacity: 0.55, cursor: "not-allowed" },
      '&[aria-busy="true"]': { cursor: "progress" }
    },
    VARIANT[$variant]
  );
};
var ButtonEl = styled.button(base);
var AnchorEl = styled.a(base);
var Content = styled.span(({ $hidden }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "inherit",
  // opacity y no visibility: el texto sigue dando nombre accesible al botón
  // mientras el spinner ocupa su sitio.
  opacity: $hidden ? 0 : 1
}));
var SpinnerSlot = styled.span({
  position: "absolute",
  inset: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
});
var ICON_PX = { sm: 16, md: 18, lg: 20 };
var SuperButton = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  href,
  external,
  type = "button",
  onClick,
  children,
  ...rest
}) => {
  const inactive = disabled || loading;
  const iconPx = ICON_PX[size];
  const styleProps = { $variant: variant, $size: size, $fullWidth: fullWidth, $iconOnly: iconOnly };
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Content, { $hidden: loading, children: [
      leftIcon ? /* @__PURE__ */ jsx(SuperIcon, { name: leftIcon, size: iconPx }) : null,
      children,
      rightIcon ? /* @__PURE__ */ jsx(SuperIcon, { name: rightIcon, size: iconPx }) : null
    ] }),
    loading ? /* @__PURE__ */ jsx(SpinnerSlot, { children: /* @__PURE__ */ jsx(SuperLoader, { size: "sm", color: "inherit", decorative: true }) }) : null
  ] });
  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    const onAnchorClick = (event) => {
      if (inactive) event.preventDefault();
    };
    return /* @__PURE__ */ jsx(
      AnchorEl,
      {
        ...styleProps,
        href: inactive ? void 0 : href,
        target: isExternal ? "_blank" : void 0,
        rel: isExternal ? "noopener noreferrer" : void 0,
        "aria-disabled": inactive || void 0,
        "aria-busy": loading || void 0,
        "aria-label": rest["aria-label"],
        className: rest.className,
        id: rest.id,
        onClick: onAnchorClick,
        children: content
      }
    );
  }
  const onButtonClick = (event) => {
    if (inactive) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };
  return /* @__PURE__ */ jsx(
    ButtonEl,
    {
      ...rest,
      ...styleProps,
      type,
      "aria-disabled": inactive || void 0,
      "aria-busy": loading || void 0,
      onClick: onButtonClick,
      children: content
    }
  );
};

export { SuperButton };
