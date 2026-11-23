import { SuperTooltip } from './chunk-X3F24Z4J.js';
import { SuperTypography } from './chunk-YEEOPOLF.js';
import { SuperIcon } from './chunk-5FQD532Q.js';
import { useSuperTheme } from './chunk-2OYI3VCV.js';
import { space, focusVisible, transition } from './chunk-HF3T4CF3.js';
import { reducedMotion, transitionOf } from './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx, Fragment } from '@emotion/react/jsx-runtime';

var SIDEBAR_WIDTH = { expanded: "240px", collapsed: "64px" };
var Aside = styled.aside(({ $collapsed }) => ({
  display: "flex",
  flexDirection: "column",
  gap: space.lg,
  boxSizing: "border-box",
  width: $collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded,
  height: "100%",
  padding: $collapsed ? `${space.lg} ${space.sm}` : space.lg,
  background: v.surface,
  borderRight: `1px solid ${v.border}`,
  // El ancho es la única excepción a «solo transform y opacity» (movimiento.md §5).
  transition: transitionOf(["width", "padding"], "slow", "inOut"),
  [reducedMotion]: { transition: "none" }
}));
var Header = styled.div(({ $collapsed }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: $collapsed ? "center" : "flex-start",
  minHeight: "36px",
  minWidth: 0
}));
var NavList = styled.div(({ $collapsed }) => ({
  display: "flex",
  flexDirection: "column",
  gap: space.xxs,
  flex: 1,
  minHeight: 0,
  overflowY: $collapsed ? "visible" : "auto"
}));
var ItemWrap = styled.div({ display: "flex", width: "100%" });
var entryStyles = ({ $active, $collapsed }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: $collapsed ? "center" : "flex-start",
  gap: space.md,
  width: "100%",
  minHeight: "44px",
  boxSizing: "border-box",
  padding: $collapsed ? 0 : `0 ${space.md}`,
  border: "none",
  borderRadius: v.radius.md,
  background: $active ? v.primarySoft : "transparent",
  color: $active ? v.primarySoftText : v.textBody,
  font: "inherit",
  textAlign: "left",
  textDecoration: "none",
  cursor: "pointer",
  transition: `background ${transition}, color ${transition}`,
  "&:hover": {
    background: $active ? v.primarySoft : v.surfaceSunken,
    color: $active ? v.primarySoftText : v.text
  },
  "&:focus-visible": focusVisible
});
var ownProp = (prop) => prop !== "as" && !prop.startsWith("$");
var EntryButton = styled("button", { shouldForwardProp: ownProp })(
  entryStyles
);
var EntryLink = styled("a", { shouldForwardProp: ownProp })(entryStyles);
var Footer = styled.div(({ $collapsed }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: $collapsed ? "center" : "stretch",
  gap: space.sm,
  minWidth: 0
}));
var SuperSidebar = ({
  items,
  activeId,
  onSelect,
  ariaLabel,
  collapsed = false,
  header,
  footer,
  className
}) => {
  const { LinkComponent } = useSuperTheme();
  const renderEntry = (item) => {
    const active = item.id === activeId;
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SuperIcon, { name: item.icon, size: 20 }),
      collapsed ? null : /* @__PURE__ */ jsx(
        SuperTypography,
        {
          variant: "bodySmall",
          weight: active ? "semibold" : "medium",
          color: "inherit",
          truncate: true,
          as: "span",
          children: item.label
        }
      )
    ] });
    const common = {
      $active: active,
      $collapsed: collapsed,
      "aria-current": active ? "page" : void 0,
      "aria-label": collapsed ? item.label : void 0,
      onClick: () => onSelect?.(item.id)
    };
    const entry = item.href ? /* @__PURE__ */ jsx(EntryLink, { ...common, as: LinkComponent, href: item.href, children: content }) : /* @__PURE__ */ jsx(EntryButton, { ...common, type: "button", children: content });
    return /* @__PURE__ */ jsx(ItemWrap, { children: collapsed ? /* @__PURE__ */ jsx(SuperTooltip, { label: item.label, placement: "right", block: true, children: entry }) : entry }, item.id);
  };
  return /* @__PURE__ */ jsxs(Aside, { $collapsed: collapsed, className, children: [
    header ? /* @__PURE__ */ jsx(Header, { $collapsed: collapsed, children: header }) : null,
    /* @__PURE__ */ jsx(NavList, { as: "nav", "aria-label": ariaLabel, $collapsed: collapsed, children: items.map(renderEntry) }),
    footer ? /* @__PURE__ */ jsx(Footer, { $collapsed: collapsed, children: footer }) : null
  ] });
};

export { SuperSidebar };
