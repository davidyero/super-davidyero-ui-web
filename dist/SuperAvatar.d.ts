import { ReactElement } from 'react';

interface SuperAvatarProps {
    /** Nombre de la persona: da las iniciales y el texto alternativo. */
    name: string;
    src?: string;
    /** Lado en px. */
    size?: number;
    className?: string;
}

/** Avatar con foto o, si falta o falla, las iniciales. */
declare const SuperAvatar: ({ name, src, size, className, }: SuperAvatarProps) => ReactElement;

export { SuperAvatar, type SuperAvatarProps };
