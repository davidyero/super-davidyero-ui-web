import { SuperIcon } from './chunk-34SSRPSU.js';
import './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-IMFSKA2U.js';
import { space, media, fluidText } from './chunk-D42FHLD7.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { useState } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var tint = (color, amount) => `color-mix(in srgb, ${color} ${amount}%, transparent)`;
var drift = keyframes({
  "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
  "100%": { transform: "translate3d(8%, 6%, 0) scale(1.15)" }
});
var scroll = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" }
});
var rise = keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "translateY(0)" }
});
var SHIFT = "72px";
var slideKeyframes = (from, to, fromOpacity, toOpacity) => keyframes({
  "0%": { transform: `translateX(${from})`, opacity: fromOpacity },
  "100%": { transform: `translateX(${to})`, opacity: toOpacity }
});
var SLIDES = {
  "enter-forward": slideKeyframes(SHIFT, "0", 0, 1),
  "enter-back": slideKeyframes(`-${SHIFT}`, "0", 0, 1),
  "exit-forward": slideKeyframes("0", `-${SHIFT}`, 1, 0),
  "exit-back": slideKeyframes("0", SHIFT, 1, 0)
};
var reduced = "@media (prefers-reduced-motion: reduce)";
var Shell = styled.div({
  position: "relative",
  isolation: "isolate",
  minHeight: "100dvh",
  overflow: "hidden",
  background: v.background,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateRows: "auto auto 1fr auto",
  gridTemplateAreas: '"top" "hero" "form" "foot"',
  padding: `calc(env(safe-area-inset-top, 0px) + ${space.lg}) ${space.lg} calc(env(safe-area-inset-bottom, 0px) + ${space.lg})`,
  gap: space.xl,
  [media.lg]: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto 1fr auto",
    gridTemplateAreas: '"hero top" "hero form" "hero foot"',
    padding: 0,
    gap: 0
  }
});
var Backdrop = styled.div({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  pointerEvents: "none",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(${tint(v.border, 70)} 1px, transparent 1px), linear-gradient(90deg, ${tint(v.border, 70)} 1px, transparent 1px)`,
    backgroundSize: "32px 32px",
    maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)",
    [media.lg]: {
      maskImage: "radial-gradient(ellipse 60% 80% at 20% 50%, #000 30%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 20% 50%, #000 30%, transparent 75%)"
    }
  }
});
var Glow = styled.span(({ $tone }) => ({
  position: "absolute",
  width: "70vmax",
  height: "70vmax",
  borderRadius: "50%",
  filter: "blur(60px)",
  background: `radial-gradient(circle, ${tint($tone === "primary" ? v.primary : v.accent, 34)} 0%, transparent 65%)`,
  top: $tone === "primary" ? "-35vmax" : "auto",
  bottom: $tone === "accent" ? "-40vmax" : "auto",
  left: $tone === "primary" ? "-25vmax" : "auto",
  right: $tone === "accent" ? "-30vmax" : "auto",
  animation: `${drift} ${$tone === "primary" ? 18 : 23}s ease-in-out infinite alternate`,
  [reduced]: { animation: "none" }
}));
var Top = styled.div({
  gridArea: "top",
  display: "flex",
  justifyContent: "flex-end",
  gap: space.xxs,
  [media.lg]: { padding: `${space.xl} ${space.xl} 0` }
});
var Hero = styled.section({
  gridArea: "hero",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: space.md,
  animation: `${rise} 420ms ease both`,
  [reduced]: { animation: "none" },
  [media.lg]: {
    alignItems: "flex-start",
    textAlign: "left",
    justifyContent: "flex-start",
    gap: space.xl,
    padding: space.xxxl,
    borderRight: `1px solid ${v.border}`,
    background: tint(v.surface, 55)
  }
});
var BrandSlot = styled.div({
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  // Brillo del color de la app detrás del monograma.
  "& img, & svg": { filter: `drop-shadow(0 6px 18px ${tint(v.primary, 55)})` }
});
var Pitch = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "inherit",
  gap: space.sm,
  maxWidth: "520px",
  minWidth: 0,
  width: "100%",
  // En escritorio la frase va al centro de la columna, no pegada abajo.
  [media.lg]: { margin: "auto 0" }
});
var Tagline = styled.div({
  "& > *": fluidText.hero
});
var Rule = styled.span({
  display: "block",
  width: "56px",
  height: "3px",
  borderRadius: v.radius.pill,
  background: `linear-gradient(90deg, ${v.primary}, ${v.accent})`
});
var Marquee = styled.div({
  width: "100%",
  overflow: "hidden",
  maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
  WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
  [reduced]: { maskImage: "none", WebkitMaskImage: "none" }
});
var Track = styled.ul({
  display: "flex",
  gap: space.sm,
  width: "max-content",
  margin: 0,
  padding: `${space.xxs} 0`,
  listStyle: "none",
  animation: `${scroll} 28s linear infinite`,
  [reduced]: { animation: "none", flexWrap: "wrap", width: "100%", justifyContent: "center" },
  "&:hover": { animationPlayState: "paused" }
});
var Chip = styled.li(({ $copy }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: space.xs,
  flexShrink: 0,
  padding: `${space.xs} ${space.md}`,
  borderRadius: v.radius.pill,
  border: `1px solid ${v.border}`,
  background: tint(v.surface, 80),
  color: v.textMuted,
  whiteSpace: "nowrap",
  "& svg": { color: v.accent },
  // Sin movimiento la lista se queda quieta: la copia del carrusel sobra.
  [reduced]: $copy ? { display: "none" } : {}
}));
var FormArea = styled.main({
  gridArea: "form",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  alignItems: "start",
  justifyItems: "center",
  [media.lg]: { alignItems: "center", padding: space.xl }
});
var Card = styled.div(({ $motion }) => ({
  gridArea: "1 / 1",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: space.lg,
  padding: space.xl,
  borderRadius: v.radius.lg,
  border: `1px solid ${v.border}`,
  background: tint(v.surface, 82),
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: v.shadow.lg,
  animation: $motion === "rise" ? `${rise} 520ms 80ms ease both` : `${SLIDES[$motion]} 360ms cubic-bezier(0.22, 1, 0.36, 1) both`,
  pointerEvents: $motion.startsWith("exit") ? "none" : void 0,
  [reduced]: { animation: "none" }
}));
var Foot = styled.footer({
  gridArea: "foot",
  display: "flex",
  justifyContent: "center",
  [media.lg]: { padding: `0 ${space.xl} ${space.xl}` }
});
var prefersReducedMotion = () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var SuperAuthTemplate = ({
  brand,
  tagline,
  hint,
  highlights = [],
  topActions,
  backdrop,
  footer,
  children,
  screenKey,
  screenDirection = "forward",
  className
}) => {
  const [current, setCurrent] = useState({ key: screenKey, node: children });
  const [leaving, setLeaving] = useState(null);
  const [moved, setMoved] = useState(false);
  if (screenKey !== current.key) {
    setLeaving(prefersReducedMotion() ? null : current);
    setCurrent({ key: screenKey, node: children });
    setMoved(true);
  }
  const enter = moved ? `enter-${screenDirection}` : "rise";
  return /* @__PURE__ */ jsxs(Shell, { className, children: [
    /* @__PURE__ */ jsxs(Backdrop, { "aria-hidden": true, children: [
      /* @__PURE__ */ jsx(Glow, { $tone: "primary" }),
      /* @__PURE__ */ jsx(Glow, { $tone: "accent" }),
      backdrop
    ] }),
    topActions ? /* @__PURE__ */ jsx(Top, { children: topActions }) : null,
    /* @__PURE__ */ jsxs(Hero, { children: [
      /* @__PURE__ */ jsx(BrandSlot, { children: brand }),
      /* @__PURE__ */ jsxs(Pitch, { children: [
        /* @__PURE__ */ jsx(Tagline, { children: /* @__PURE__ */ jsx(SuperTypography, { variant: "display", as: "p", children: tagline }) }),
        /* @__PURE__ */ jsx(Rule, { "aria-hidden": true }),
        hint ? /* @__PURE__ */ jsx(SuperTypography, { variant: "body", color: "textMuted", children: hint }) : null,
        highlights.length > 0 ? /* @__PURE__ */ jsx(Marquee, { children: /* @__PURE__ */ jsx(Track, { children: [false, true].map(
          (copy) => highlights.map((item) => /* @__PURE__ */ jsxs(
            Chip,
            {
              $copy: copy,
              "aria-hidden": copy || void 0,
              children: [
                /* @__PURE__ */ jsx(SuperIcon, { name: item.icon, size: 14 }),
                /* @__PURE__ */ jsx(SuperTypography, { variant: "caption", as: "span", color: "inherit", children: item.label })
              ]
            },
            copy ? `${item.label}-copy` : item.label
          ))
        ) }) }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxs(FormArea, { children: [
      leaving ? /* @__PURE__ */ jsx(
        Card,
        {
          $motion: `exit-${screenDirection}`,
          "aria-hidden": true,
          onAnimationEnd: (event) => {
            if (event.target === event.currentTarget) setLeaving(null);
          },
          children: leaving.node
        },
        leaving.key ?? "leaving"
      ) : null,
      /* @__PURE__ */ jsx(Card, { $motion: enter, children }, current.key ?? "screen")
    ] }),
    footer ? /* @__PURE__ */ jsx(Foot, { children: footer }) : null
  ] });
};

export { SuperAuthTemplate };
