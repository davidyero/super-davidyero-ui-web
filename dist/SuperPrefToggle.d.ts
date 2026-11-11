import { ReactElement } from 'react';
import { a as SuperPrefToggleProps } from './SuperPrefToggle.types-BtDC1Jro.js';
export { b as SuperPrefToggleTone, S as SuperPrefToggleVariant } from './SuperPrefToggle.types-BtDC1Jro.js';

declare const PREF_GLYPH_SIZE = 22;
declare const PREF_COLORS: {
    readonly sun: {
        readonly light: "#f28c18";
        readonly dark: "#ffa53a";
    };
    readonly night: "#2d3070";
    readonly moon: "#ffd36b";
    readonly onNight: "#ffffff";
};

/** Preferencia de dos estados en un clic: muestra el actual y cambia al otro. */
declare const SuperPrefToggle: ({ glyph, glyphKey, ariaLabel, label, variant, tone, onClick, className, }: SuperPrefToggleProps) => ReactElement;

export { PREF_COLORS, PREF_GLYPH_SIZE, SuperPrefToggle, SuperPrefToggleProps };
