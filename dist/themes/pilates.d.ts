import { SuperThemeTokens } from '../tokens.js';

declare const pilatesTokens: SuperThemeTokens;
/** Puntos de color por tipo de clase (nunca como fondo saturado completo). */
declare const PILATES_TYPE_COLORS: readonly ["#9C5646", "#5E7D63", "#B08A3E", "#5D6F8C"];
/** Hoja de Google Fonts con las dos familias del tema; va en el `<head>` de la app. */
declare const PILATES_FONTS_HREF = "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Manrope:wght@400;500;600;700&display=swap";

export { PILATES_FONTS_HREF, PILATES_TYPE_COLORS, pilatesTokens };
