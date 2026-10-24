import { textScale, fontWeight } from './chunk-OJWPWQVY.js';
import { v } from './chunk-BSDVG7PM.js';
import styled from '@emotion/styled';
import { jsx } from '@emotion/react/jsx-runtime';

var DEFAULT_COLOR = {
  display: "text",
  h1: "text",
  h2: "text",
  h3: "text",
  h4: "text",
  h5: "text",
  h6: "text",
  title: "text",
  subtitle: "textBody",
  body: "textBody",
  bodySmall: "textBody",
  caption: "textMuted",
  label: "text"
};
var defaultColorFor = (variant) => DEFAULT_COLOR[variant];
var Text = styled.span(
  ({ $variant, $color, $weight, $align, $truncate, $uppercase, $mono }) => {
    const scale = textScale[$variant];
    return {
      margin: 0,
      fontFamily: $mono ? v.font.mono : scale.heading ? v.font.heading : v.font.base,
      fontSize: scale.fontSize,
      lineHeight: scale.lineHeight,
      fontWeight: $weight ? fontWeight[$weight] : scale.fontWeight,
      color: $color === "inherit" ? "inherit" : v[$color],
      textAlign: $align,
      ...$uppercase ? { textTransform: "uppercase", letterSpacing: "0.04em" } : {},
      ...$truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 } : { overflowWrap: "anywhere" }
    };
  }
);
var DEFAULT_TAG = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  title: "h2",
  subtitle: "p",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "span"
};
var SuperTypography = ({
  variant = "body",
  as,
  color,
  weight,
  align,
  truncate = false,
  uppercase = false,
  mono = false,
  id,
  title,
  className,
  children
}) => /* @__PURE__ */ jsx(
  Text,
  {
    as: as ?? DEFAULT_TAG[variant],
    $variant: variant,
    $color: color ?? defaultColorFor(variant),
    $weight: weight,
    $align: align,
    $truncate: truncate,
    $uppercase: uppercase,
    $mono: mono,
    id,
    title: title ?? (truncate && typeof children === "string" ? children : void 0),
    className,
    children
  }
);

export { SuperTypography };
