import { SuperTypography } from './chunk-YEEOPOLF.js';
import { space, fontWeight } from './chunk-HF3T4CF3.js';
import './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var LOGO_PX = { sm: 28, md: 36 };
var Root = styled.span({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
  minWidth: 0,
  maxWidth: "100%"
});
var LogoBox = styled("span", {
  shouldForwardProp: (prop) => !prop.startsWith("$")
})(({ $size }) => ({
  display: "inline-flex",
  flexShrink: 0,
  width: LOGO_PX[$size],
  height: LOGO_PX[$size],
  "& > svg, & > img": { width: "100%", height: "100%", display: "block" }
}));
var Initial = styled("span", {
  shouldForwardProp: (prop) => !prop.startsWith("$")
})(({ $size }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  borderRadius: $size === "md" ? 10 : 8,
  background: v.primary,
  color: v.onPrimary,
  fontWeight: fontWeight.bold,
  fontSize: $size === "md" ? 18 : 15,
  lineHeight: 1
}));
var SuperBrand = ({
  name,
  logo,
  size = "md",
  hideName = false,
  className
}) => /* @__PURE__ */ jsxs(
  Root,
  {
    className,
    role: hideName ? "img" : void 0,
    "aria-label": hideName ? name : void 0,
    children: [
      /* @__PURE__ */ jsx(LogoBox, { $size: size, "aria-hidden": true, children: logo ?? /* @__PURE__ */ jsx(Initial, { $size: size, children: name.trim().charAt(0).toUpperCase() }) }),
      hideName ? null : /* @__PURE__ */ jsx(
        SuperTypography,
        {
          variant: size === "md" ? "h3" : "label",
          weight: size === "md" ? void 0 : "bold",
          as: "span",
          truncate: true,
          children: name
        }
      )
    ]
  }
);

export { SuperBrand };
