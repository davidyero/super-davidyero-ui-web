import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTooltip } from '../SuperTooltip/SuperTooltip';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import {
  Aside,
  EntryButton,
  EntryLink,
  Footer,
  Header,
  ItemWrap,
  NavList,
} from './SuperSidebar.styles';
import type { SuperSidebarItem, SuperSidebarProps } from './SuperSidebar.types';

const BlockTooltip = styled(SuperTooltip)({ display: 'flex', width: '100%' });

/**
 * Navegación lateral. Completa en escritorio y solo iconos con `collapsed` (con el nombre
 * en un tooltip). En móvil se mete en un `SuperDrawer`: el mismo componente, no otro.
 */
export const SuperSidebar = <TId extends string = string>({
  items,
  activeId,
  onSelect,
  ariaLabel,
  collapsed = false,
  header,
  footer,
  className,
}: SuperSidebarProps<TId>): ReactElement => {
  const { LinkComponent } = useSuperTheme();

  const renderEntry = (item: SuperSidebarItem<TId>): ReactElement => {
    const active = item.id === activeId;
    const content = (
      <>
        <SuperIcon name={item.icon} size={20} />
        {collapsed ? null : (
          <SuperTypography
            variant="bodySmall"
            weight={active ? 'semibold' : 'medium'}
            color="inherit"
            truncate
            as="span"
          >
            {item.label}
          </SuperTypography>
        )}
      </>
    );
    const common = {
      $active: active,
      $collapsed: collapsed,
      'aria-current': active ? ('page' as const) : undefined,
      'aria-label': collapsed ? item.label : undefined,
      onClick: () => onSelect?.(item.id),
    };
    const entry = item.href ? (
      <EntryLink {...common} as={LinkComponent} href={item.href}>
        {content}
      </EntryLink>
    ) : (
      <EntryButton {...common} type="button">
        {content}
      </EntryButton>
    );
    return (
      <ItemWrap key={item.id}>
        {collapsed ? (
          <BlockTooltip label={item.label} placement="right">
            {entry}
          </BlockTooltip>
        ) : (
          entry
        )}
      </ItemWrap>
    );
  };

  return (
    <Aside $collapsed={collapsed} className={className}>
      {header ? <Header $collapsed={collapsed}>{header}</Header> : null}
      <NavList as="nav" aria-label={ariaLabel}>
        {items.map(renderEntry)}
      </NavList>
      {footer ? <Footer $collapsed={collapsed}>{footer}</Footer> : null}
    </Aside>
  );
};

export type { SuperSidebarProps, SuperSidebarItem } from './SuperSidebar.types';
