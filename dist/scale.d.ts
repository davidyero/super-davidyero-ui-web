/** Espaciado fijo de la librería (no es token: igual en todas las apps). */
declare const space: {
    readonly xxs: "4px";
    readonly xs: "6px";
    readonly sm: "8px";
    readonly md: "12px";
    readonly lg: "16px";
    readonly xl: "24px";
    readonly xxl: "32px";
    readonly xxxl: "48px";
};
/**
 * Escala tipográfica única. Ningún texto baja de 13px (regla del ecosistema).
 */
declare const textScale: {
    readonly display: {
        readonly fontSize: "32px";
        readonly lineHeight: 1.2;
        readonly fontWeight: 700;
        readonly heading: true;
    };
    readonly h1: {
        readonly fontSize: "24px";
        readonly lineHeight: 1.25;
        readonly fontWeight: 700;
        readonly heading: true;
    };
    readonly h2: {
        readonly fontSize: "20px";
        readonly lineHeight: 1.3;
        readonly fontWeight: 700;
        readonly heading: true;
    };
    readonly h3: {
        readonly fontSize: "17px";
        readonly lineHeight: 1.35;
        readonly fontWeight: 600;
        readonly heading: true;
    };
    readonly h4: {
        readonly fontSize: "16px";
        readonly lineHeight: 1.4;
        readonly fontWeight: 600;
        readonly heading: true;
    };
    readonly h5: {
        readonly fontSize: "15px";
        readonly lineHeight: 1.4;
        readonly fontWeight: 600;
        readonly heading: true;
    };
    readonly h6: {
        readonly fontSize: "14px";
        readonly lineHeight: 1.4;
        readonly fontWeight: 600;
        readonly heading: true;
    };
    readonly title: {
        readonly fontSize: "18px";
        readonly lineHeight: 1.35;
        readonly fontWeight: 600;
        readonly heading: true;
    };
    readonly subtitle: {
        readonly fontSize: "15px";
        readonly lineHeight: 1.45;
        readonly fontWeight: 500;
        readonly heading: false;
    };
    readonly body: {
        readonly fontSize: "14px";
        readonly lineHeight: 1.55;
        readonly fontWeight: 400;
        readonly heading: false;
    };
    readonly bodySmall: {
        readonly fontSize: "13px";
        readonly lineHeight: 1.5;
        readonly fontWeight: 400;
        readonly heading: false;
    };
    readonly caption: {
        readonly fontSize: "13px";
        readonly lineHeight: 1.45;
        readonly fontWeight: 400;
        readonly heading: false;
    };
    readonly label: {
        readonly fontSize: "13px";
        readonly lineHeight: 1.4;
        readonly fontWeight: 600;
        readonly heading: false;
    };
};
type TextVariant = keyof typeof textScale;
/**
 * Titulares fluidos, fuera de la escala fija: crecen con la pantalla. `hero` va de 26px en
 * un móvil a 44px en escritorio (titular de SuperAuthTemplate).
 */
declare const fluidText: {
    readonly hero: {
        readonly fontSize: "clamp(26px, 6vw, 44px)";
        readonly lineHeight: 1.12;
        readonly letterSpacing: "-0.02em";
    };
};
declare const MIN_FONT_SIZE = 13;
declare const fontWeight: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
type FontWeight = keyof typeof fontWeight;
/** Puntos de corte, mobile-first: `media.md` = desde tablet. */
declare const breakpoints: {
    readonly sm: 600;
    readonly md: 900;
    readonly lg: 1200;
    readonly xl: 1536;
};
type Breakpoint = keyof typeof breakpoints;
declare const media: {
    readonly sm: "@media (min-width: 600px)";
    readonly md: "@media (min-width: 900px)";
    readonly lg: "@media (min-width: 1200px)";
    readonly xl: "@media (min-width: 1536px)";
};
/**
 * Capas, de abajo arriba. `dropdown` para menús en el flujo de la página; `popover` para lo
 * que va en un portal sobre todo (la lista de SuperDropdown), así se abre también dentro
 * de un SuperModal o SuperDrawer; `tooltip` por encima de esa lista y bajo los toasts.
 */
declare const zIndex: {
    readonly dropdown: 800;
    readonly modal: 1000;
    readonly popover: 1100;
    readonly tooltip: 1150;
    readonly toast: 1200;
    readonly overlay: 1400;
};
/** Velo neutro bajo SuperModal y SuperDrawer: el mismo en todos los temas. */
declare const scrim = "rgba(0, 0, 0, 0.45)";
/** Deslizamiento de los indicadores (SuperTabs, SuperSegmented). */
declare const slide = "260ms cubic-bezier(0.22, 1, 0.36, 1)";
declare const transition = "150ms ease";
/** Anillo de foco visible, el mismo en todos los controles. */
declare const focusVisible: {
    readonly outline: "none";
    readonly boxShadow: `0 0 0 3px ${string}`;
};

export { MIN_FONT_SIZE, breakpoints, fluidText, focusVisible, fontWeight, media, scrim, slide, space, textScale, transition, zIndex };
export type { Breakpoint, FontWeight, TextVariant };
