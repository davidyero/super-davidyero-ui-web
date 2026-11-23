import { cloneElement, isValidElement, useId, useState, type ReactElement } from 'react';
import { space } from '../../styles/scale';
import { Bubble, Wrap } from './SuperTooltip.styles';
import type { SuperTooltipProps, TooltipPlacement } from './SuperTooltip.types';

const gap = (token: string): number => Number.parseFloat(token);

/**
 * Coordenadas en pantalla del globo, junto al elemento. Con `position: fixed` no lo
 * recorta ningún contenedor con scroll (el riel de SuperSidebar, una tabla, un modal).
 */
const fixedPosition = (rect: DOMRect, placement: TooltipPlacement) => {
  if (placement === 'right')
    return {
      top: rect.top + rect.height / 2,
      left: rect.right + gap(space.sm),
      transform: 'translateY(-50%)',
    };
  const left = rect.left + rect.width / 2;
  return placement === 'top'
    ? { top: rect.top - gap(space.xs), left, transform: 'translate(-50%, -100%)' }
    : { top: rect.bottom + gap(space.xs), left, transform: 'translateX(-50%)' };
};

/** Ayuda breve al pasar el ratón o enfocar. Nunca guarda información esencial. */
export const SuperTooltip = ({
  label,
  children,
  placement = 'top',
  block = false,
  className,
}: SuperTooltipProps): ReactElement => {
  const id = useId();
  const [fixed, setFixed] = useState<ReturnType<typeof fixedPosition> | null>(null);
  const place = (el: HTMLElement): void =>
    setFixed(fixedPosition(el.getBoundingClientRect(), placement));
  const trigger = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': id })
    : children;
  return (
    <Wrap
      $block={block}
      className={className}
      onMouseEnter={(event) => place(event.currentTarget)}
      onFocus={(event) => place(event.currentTarget)}
    >
      {trigger}
      <Bubble
        role="tooltip"
        id={id}
        $placement={placement}
        style={fixed ? { position: 'fixed', bottom: 'auto', right: 'auto', ...fixed } : undefined}
      >
        {label}
      </Bubble>
    </Wrap>
  );
};

export type { SuperTooltipProps, TooltipPlacement } from './SuperTooltip.types';
