import { v } from './chunk-TRHOZRUW.js';
import './chunk-5HHPKIMZ.js';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var Circle = styled.span(({ $size }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: `${$size}px`,
  height: `${$size}px`,
  borderRadius: "50%",
  overflow: "hidden",
  background: v.primarySoft,
  color: v.primarySoftText,
  fontFamily: v.font.base,
  fontWeight: 700,
  fontSize: `${Math.max(13, Math.round($size * 0.4))}px`,
  lineHeight: 1,
  userSelect: "none"
}));
var Img = styled.img({ width: "100%", height: "100%", objectFit: "cover" });
var initialsOf = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0).toUpperCase()).join("");
var SuperAvatar = ({
  name,
  src,
  size = 36,
  className
}) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const showImage = Boolean(src) && !failed;
  return /* @__PURE__ */ jsx(Circle, { $size: size, className, role: "img", "aria-label": name, children: showImage ? /* @__PURE__ */ jsx(Img, { src, alt: "", onError: () => setFailed(true) }) : /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: initialsOf(name) }) });
};

export { SuperAvatar };
