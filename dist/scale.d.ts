/** Espaciado fijo de la librería (no es token: igual en todas las apps). */
declare const space: {
    readonly xxs: "4px";
    readonly xs: "6px";
    readonly sm: "8px";
    readonly md: "12px";
    readonly lg: "16px";
    readonly xl: "24px";
    readonly xxl: "32px";
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
declare const zIndex: {
    readonly dropdown: 800;
    readonly modal: 1000;
    readonly toast: 1200;
    readonly overlay: 1400;
};
declare const transition = "150ms ease";
/** Anillo de foco visible, el mismo en todos los controles. */
declare const focusVisible: {
    readonly outline: "none";
    readonly boxShadow: `0 0 0 3px ${string}`;
};

export { type Breakpoint, type FontWeight, MIN_FONT_SIZE, type TextVariant, breakpoints, focusVisible, fontWeight, media, space, textScale, transition, zIndex };
