import { cloneElement, isValidElement, useId, type ReactElement } from 'react';
import { Bubble, Wrap } from './SuperTooltip.styles';
import type { SuperTooltipProps } from './SuperTooltip.types';

/** Ayuda breve al pasar el ratón o enfocar. Nunca guarda información esencial. */
export const SuperTooltip = ({
  label,
  children,
  placement = 'top',
  className,
}: SuperTooltipProps): ReactElement => {
  const id = useId();
  const trigger = isValidElement(children)
    ? cloneElement(children, { 'aria-describedby': id })
    : children;
  return (
    <Wrap className={className}>
      {trigger}
      <Bubble role="tooltip" id={id} $placement={placement}>
        {label}
      </Bubble>
    </Wrap>
  );
};

export type { SuperTooltipProps } from './SuperTooltip.types';
