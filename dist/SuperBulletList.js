import { space } from './chunk-UD6QNXPQ.js';
import { v } from './chunk-TRHOZRUW.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var List = styled.ul(({ $spacing }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: $spacing === "sm" ? space.xs : space.sm,
  counterReset: "sd-list"
}));
var Item = styled.li(({ $ordered }) => ({
  position: "relative",
  paddingLeft: $ordered ? "28px" : "20px",
  fontFamily: v.font.base,
  fontSize: "14px",
  lineHeight: 1.55,
  color: v.textBody,
  counterIncrement: "sd-list",
  "&::before": $ordered ? {
    content: 'counter(sd-list) "."',
    position: "absolute",
    left: 0,
    fontWeight: 600,
    color: v.primary
  } : {
    content: '""',
    position: "absolute",
    left: "4px",
    top: "0.62em",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: v.primary
  }
}));
var SuperBulletList = ({
  items,
  spacing = "md",
  ordered = false,
  className
}) => /* @__PURE__ */ jsx(List, { as: ordered ? "ol" : "ul", $spacing: spacing, className, children: items.map((item, i) => /* @__PURE__ */ jsx(Item, { $ordered: ordered, children: item }, i)) });

export { SuperBulletList };
