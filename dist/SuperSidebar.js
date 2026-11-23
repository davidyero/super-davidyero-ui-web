import { SuperTooltip } from './chunk-XPCTM7N5.js';
import { SuperTypography } from './chunk-YEEOPOLF.js';
import { SuperIcon } from './chunk-5FQD532Q.js';
import { useSuperTheme } from './chunk-2OYI3VCV.js';
import { space, focusVisible, transition } from './chunk-HF3T4CF3.js';
import { reducedMotion, transitionOf, timing, ms } from './chunk-KETZYNAG.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useId, Fragment as Fragment$1, useMemo, useState, useCallback } from 'react';
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
  overflowY: "auto",
  overflowX: $collapsed ? "hidden" : void 0,
  overscrollBehavior: "contain"
}));
var ItemWrap = styled.div({ display: "flex", width: "100%" });
var entryStyles = ({ $active, $collapsed }) => ({
  position: "relative",
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
var SectionToggle = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space.sm,
  width: "100%",
  minHeight: "36px",
  marginTop: space.sm,
  padding: `0 ${space.md}`,
  boxSizing: "border-box",
  border: "none",
  borderRadius: v.radius.md,
  background: "transparent",
  color: v.textMuted,
  font: "inherit",
  textAlign: "left",
  cursor: "pointer",
  transition: `color ${transition}, background ${transition}`,
  "&:hover": { color: v.text, background: v.surfaceSunken },
  "&:focus-visible": focusVisible
});
var SectionChevron = styled.span(({ $folded }) => ({
  display: "inline-flex",
  flexShrink: 0,
  transform: $folded ? "rotate(-90deg)" : "none",
  transition: `transform ${timing("fast")}`,
  [reducedMotion]: { transition: "none" }
}));
var SectionBody = styled.div(({ $folded }) => ({
  display: "grid",
  gridTemplateRows: $folded ? "0fr" : "1fr",
  visibility: $folded ? "hidden" : "visible",
  transition: $folded ? `grid-template-rows ${timing("base", "inOut")}, visibility 0s linear ${ms("base")}` : `grid-template-rows ${timing("base", "inOut")}`,
  [reducedMotion]: { transition: "none" },
  "& > div": {
    display: "flex",
    flexDirection: "column",
    gap: space.xxs,
    minHeight: 0,
    overflow: "hidden"
  }
}));
var SectionRule = styled.hr({
  width: "24px",
  margin: `${space.sm} auto`,
  border: "none",
  borderTop: `1px solid ${v.border}`
});
var StandaloneGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: space.xxs,
  marginTop: "auto",
  paddingTop: space.sm,
  borderTop: `1px solid ${v.border}`
});
var Count = styled.span(({ $rail }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  minWidth: "20px",
  height: "20px",
  padding: `0 ${space.xs}`,
  boxSizing: "border-box",
  borderRadius: v.radius.pill,
  background: v.primary,
  color: v.onPrimary,
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: 1,
  fontVariantNumeric: "tabular-nums",
  marginLeft: $rail ? void 0 : "auto",
  ...$rail ? { position: "absolute", top: "2px", right: "2px", minWidth: "18px", height: "18px" } : {}
}));
var Trailing = styled.span({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  marginLeft: "auto"
});
var Leading = styled.span({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "20px",
  height: "20px",
  overflow: "hidden",
  "& > img, & > svg": { width: "100%", height: "100%", objectFit: "contain" }
});
var STORAGE_PREFIX = "sd-sidebar-sections:";
var readStored = (key) => {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};
var writeStored = (key, value) => {
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
  }
};
var useSuperSidebar = (items, sections, storageKey, activeId) => {
  const groups = useMemo(() => {
    const meta = new Map((sections ?? []).map((s) => [s.id, s]));
    const out = [];
    const bySection = /* @__PURE__ */ new Map();
    const standalone = [];
    for (const item of items) {
      if (item.standalone) {
        standalone.push(item);
      } else if (item.section) {
        let group = bySection.get(item.section);
        if (!group) {
          group = {
            section: meta.get(item.section) ?? { id: item.section, label: item.section },
            items: []
          };
          bySection.set(item.section, group);
          out.push(group);
        }
        group.items.push(item);
      } else {
        const last = out[out.length - 1];
        if (last && last.section === null) last.items.push(item);
        else out.push({ section: null, items: [item] });
      }
    }
    return { groups: out, standalone };
  }, [items, sections]);
  const [folded, setFolded] = useState(() => {
    const defaults = Object.fromEntries(
      (sections ?? []).filter((s) => s.defaultCollapsed).map((s) => [s.id, true])
    );
    const stored = typeof window === "undefined" ? null : readStored(storageKey);
    return { ...defaults, ...stored };
  });
  const activeSection = items.find((item) => item.id === activeId && !item.standalone)?.section;
  const [openedFor, setOpenedFor] = useState(void 0);
  const openKey = activeSection ? `${String(activeId)}@${activeSection}` : void 0;
  if (openKey !== openedFor) {
    setOpenedFor(openKey);
    if (activeSection && folded[activeSection]) {
      const next = { ...folded, [activeSection]: false };
      setFolded(next);
      writeStored(storageKey, next);
    }
  }
  const toggle = useCallback(
    (id) => {
      setFolded((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        writeStored(storageKey, next);
        return next;
      });
    },
    [storageKey]
  );
  return { ...groups, isFolded: (id) => Boolean(folded[id]), toggle };
};
var countText = (badge) => badge > 99 ? "99+" : String(badge);
var SuperSidebar = ({
  items,
  sections,
  storageKey,
  activeId,
  onSelect,
  ariaLabel,
  collapsed = false,
  header,
  footer,
  className
}) => {
  const { LinkComponent } = useSuperTheme();
  const baseId = useId();
  const { groups, standalone, isFolded, toggle } = useSuperSidebar(
    items,
    sections,
    storageKey ?? ariaLabel,
    activeId
  );
  const renderEntry = (item) => {
    const active = item.id === activeId;
    const badge = item.badge && item.badge > 0 ? item.badge : 0;
    const badgeSpoken = badge ? item.badgeLabel ?? countText(badge) : "";
    const content = /* @__PURE__ */ jsxs(Fragment, { children: [
      item.leading ? /* @__PURE__ */ jsx(Leading, { "aria-hidden": "true", children: item.leading }) : item.icon ? /* @__PURE__ */ jsx(SuperIcon, { name: item.icon, size: 20 }) : null,
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
      ),
      badge ? /* @__PURE__ */ jsx(Count, { $rail: collapsed, "aria-hidden": "true", children: countText(badge) }) : null,
      !collapsed && item.trailing ? /* @__PURE__ */ jsx(Trailing, { children: item.trailing }) : null
    ] });
    const common = {
      $active: active,
      $collapsed: collapsed,
      "aria-current": active ? "page" : void 0,
      // Con contador, el nombre lo dice entero («Apps, 3 por revisar»); plegada, el nombre
      // es lo único que queda.
      "aria-label": badge ? `${item.label}, ${badgeSpoken}` : collapsed ? item.label : void 0,
      onClick: () => onSelect?.(item.id)
    };
    const entry = item.href ? /* @__PURE__ */ jsx(EntryLink, { ...common, as: LinkComponent, href: item.href, children: content }) : /* @__PURE__ */ jsx(EntryButton, { ...common, type: "button", children: content });
    return /* @__PURE__ */ jsx(ItemWrap, { children: collapsed ? /* @__PURE__ */ jsx(SuperTooltip, { label: item.label, placement: "right", block: true, children: entry }) : entry }, item.id);
  };
  const renderGroup = (group, index) => {
    const { section } = group;
    if (!section) return /* @__PURE__ */ jsx(Fragment$1, { children: group.items.map(renderEntry) }, `loose-${index}`);
    if (collapsed) {
      return /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(SectionRule, { "aria-hidden": "true" }),
        group.items.map(renderEntry)
      ] }, section.id);
    }
    const folded = isFolded(section.id);
    const bodyId = `${baseId}-${section.id}`;
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsxs(
        SectionToggle,
        {
          type: "button",
          "aria-expanded": !folded,
          "aria-controls": bodyId,
          onClick: () => toggle(section.id),
          children: [
            /* @__PURE__ */ jsx(SuperTypography, { variant: "label", color: "inherit", truncate: true, as: "span", children: section.label }),
            /* @__PURE__ */ jsx(SectionChevron, { $folded: folded, "aria-hidden": "true", children: /* @__PURE__ */ jsx(SuperIcon, { name: "chevronDown", size: 16 }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(SectionBody, { id: bodyId, $folded: folded, children: /* @__PURE__ */ jsx("div", { children: group.items.map(renderEntry) }) })
    ] }, section.id);
  };
  return /* @__PURE__ */ jsxs(Aside, { $collapsed: collapsed, className, children: [
    header ? /* @__PURE__ */ jsx(Header, { $collapsed: collapsed, children: header }) : null,
    /* @__PURE__ */ jsxs(NavList, { as: "nav", "aria-label": ariaLabel, $collapsed: collapsed, children: [
      groups.map(renderGroup),
      standalone.length > 0 ? /* @__PURE__ */ jsx(StandaloneGroup, { children: standalone.map(renderEntry) }) : null
    ] }),
    footer ? /* @__PURE__ */ jsx(Footer, { $collapsed: collapsed, children: footer }) : null
  ] });
};

export { SuperSidebar };
