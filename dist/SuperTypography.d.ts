import { ElementType, ReactNode, ReactElement } from 'react';

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
declare const fontWeight: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
type FontWeight = keyof typeof fontWeight;

type TypographyColor = 'text' | 'textBody' | 'textMuted' | 'textSubtle' | 'primary' | 'accent' | 'onAccent' | 'onPrimary' | 'primarySoftText' | 'success' | 'warning' | 'danger' | 'info' | 'inherit';
type TypographyAlign = 'left' | 'center' | 'right';
interface SuperTypographyProps {
    variant?: TextVariant;
    /** Cambia la etiqueta HTML. Por defecto una sensata para cada variante. */
    as?: ElementType;
    color?: TypographyColor;
    weight?: FontWeight;
    align?: TypographyAlign;
    truncate?: boolean;
    uppercase?: boolean;
    mono?: boolean;
    id?: string;
    title?: string;
    className?: string;
    children: ReactNode;
}

/** Todo texto de la app pasa por aquí. La escala vive en un solo sitio y no baja de 13px. */
declare const SuperTypography: ({ variant, as, color, weight, align, truncate, uppercase, mono, id, title, className, children, }: SuperTypographyProps) => ReactElement;

export { SuperTypography, type SuperTypographyProps, type TextVariant, type TypographyAlign, type TypographyColor };
