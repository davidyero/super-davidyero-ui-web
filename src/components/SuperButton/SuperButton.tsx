import type { MouseEvent, ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperLoader } from '../SuperLoader/SuperLoader';
import { AnchorEl, ButtonEl, Content, SpinnerSlot } from './SuperButton.styles';
import type { ButtonSize, SuperButtonProps } from './SuperButton.types';

const ICON_PX: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

/**
 * Botón del design system. Las variantes visuales van por `variant`/`size`,
 * nunca con un componente nuevo. `loading` bloquea el clic y evita el doble envío.
 */
export const SuperButton = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  href,
  external,
  type = 'button',
  onClick,
  children,
  ...rest
}: SuperButtonProps): ReactElement => {
  const { LinkComponent } = useSuperTheme();
  const inactive = disabled || loading;
  const iconPx = ICON_PX[size];
  const styleProps = { $variant: variant, $size: size, $fullWidth: fullWidth, $iconOnly: iconOnly };

  const content = (
    <>
      <Content $hidden={loading}>
        {leftIcon ? <SuperIcon name={leftIcon} size={iconPx} /> : null}
        {children}
        {rightIcon ? <SuperIcon name={rightIcon} size={iconPx} /> : null}
      </Content>
      {loading ? (
        <SpinnerSlot>
          <SuperLoader size="sm" color="inherit" decorative />
        </SpinnerSlot>
      ) : null}
    </>
  );

  if (href) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    const onAnchorClick = (event: MouseEvent<HTMLAnchorElement>): void => {
      if (inactive) event.preventDefault();
    };
    return (
      <AnchorEl
        {...styleProps}
        as={!isExternal && !inactive && LinkComponent ? LinkComponent : undefined}
        href={inactive ? undefined : href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        aria-disabled={inactive || undefined}
        aria-busy={loading || undefined}
        aria-label={rest['aria-label']}
        className={rest.className}
        id={rest.id}
        onClick={onAnchorClick}
      >
        {content}
      </AnchorEl>
    );
  }

  const onButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (inactive) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <ButtonEl
      {...rest}
      {...styleProps}
      type={type}
      // aria-disabled en vez de disabled: el botón sigue siendo enfocable y el
      // lector anuncia el estado, pero el clic no hace nada.
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      onClick={onButtonClick}
    >
      {content}
    </ButtonEl>
  );
};

export type { SuperButtonProps, ButtonVariant, ButtonSize } from './SuperButton.types';
