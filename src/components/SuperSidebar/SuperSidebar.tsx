import { Fragment, useId, type ReactElement } from 'react';
import { useSuperTheme } from '../../theme/SuperThemeContext';
import { SuperIcon } from '../SuperIcon/SuperIcon';
import { SuperTooltip } from '../SuperTooltip/SuperTooltip';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import {
  Aside,
  Count,
  EntryButton,
  EntryLink,
  Footer,
  Header,
  ItemWrap,
  NavList,
  SectionBody,
  SectionChevron,
  SectionRule,
  SectionToggle,
  StandaloneGroup,
  Trailing,
} from './SuperSidebar.styles';
import type { SuperSidebarItem, SuperSidebarProps } from './SuperSidebar.types';
import { useSuperSidebar, type SidebarGroup } from './useSuperSidebar';

const countText = (badge: number): string => (badge > 99 ? '99+' : String(badge));

/**
 * Navegación lateral. Completa en escritorio y solo iconos con `collapsed` (con el nombre
 * en un tooltip). En móvil se mete en un `SuperDrawer`: el mismo componente, no otro.
 *
 * Con `section` en las entradas y `sections`, las agrupa bajo encabezados plegables (se
 * recuerda cuáles están plegados); `standalone` las deja al final, siempre visibles.
 * `badge` pinta un contador y `trailing`, algo propio a la derecha.
 */
export const SuperSidebar = <TId extends string = string>({
  items,
  sections,
  storageKey,
  activeId,
  onSelect,
  ariaLabel,
  collapsed = false,
  header,
  footer,
  className,
}: SuperSidebarProps<TId>): ReactElement => {
  const { LinkComponent } = useSuperTheme();
  const baseId = useId();
  const { groups, standalone, isFolded, toggle } = useSuperSidebar(
    items,
    sections,
    storageKey ?? ariaLabel,
  );

  const renderEntry = (item: SuperSidebarItem<TId>): ReactElement => {
    const active = item.id === activeId;
    const badge = item.badge && item.badge > 0 ? item.badge : 0;
    const badgeSpoken = badge ? (item.badgeLabel ?? countText(badge)) : '';
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
        {badge ? (
          <Count $rail={collapsed} aria-hidden="true">
            {countText(badge)}
          </Count>
        ) : null}
        {!collapsed && item.trailing ? <Trailing>{item.trailing}</Trailing> : null}
      </>
    );
    const common = {
      $active: active,
      $collapsed: collapsed,
      'aria-current': active ? ('page' as const) : undefined,
      // Con contador, el nombre lo dice entero («Apps, 3 por revisar»); plegada, el nombre
      // es lo único que queda.
      'aria-label': badge ? `${item.label}, ${badgeSpoken}` : collapsed ? item.label : undefined,
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
          <SuperTooltip label={item.label} placement="right" block>
            {entry}
          </SuperTooltip>
        ) : (
          entry
        )}
      </ItemWrap>
    );
  };

  const renderGroup = (group: SidebarGroup<TId>, index: number): ReactElement => {
    const { section } = group;
    if (!section) return <Fragment key={`loose-${index}`}>{group.items.map(renderEntry)}</Fragment>;
    if (collapsed) {
      return (
        <Fragment key={section.id}>
          <SectionRule aria-hidden="true" />
          {group.items.map(renderEntry)}
        </Fragment>
      );
    }
    const folded = isFolded(section.id);
    const bodyId = `${baseId}-${section.id}`;
    return (
      <Fragment key={section.id}>
        <SectionToggle
          type="button"
          aria-expanded={!folded}
          aria-controls={bodyId}
          onClick={() => toggle(section.id)}
        >
          <SuperTypography variant="label" color="inherit" truncate as="span">
            {section.label}
          </SuperTypography>
          <SectionChevron $folded={folded} aria-hidden="true">
            <SuperIcon name="chevronDown" size={16} />
          </SectionChevron>
        </SectionToggle>
        <SectionBody id={bodyId} $folded={folded}>
          <div>{group.items.map(renderEntry)}</div>
        </SectionBody>
      </Fragment>
    );
  };

  return (
    <Aside $collapsed={collapsed} className={className}>
      {header ? <Header $collapsed={collapsed}>{header}</Header> : null}
      <NavList as="nav" aria-label={ariaLabel} $collapsed={collapsed}>
        {groups.map(renderGroup)}
        {standalone.length > 0 ? (
          <StandaloneGroup>{standalone.map(renderEntry)}</StandaloneGroup>
        ) : null}
      </NavList>
      {footer ? <Footer $collapsed={collapsed}>{footer}</Footer> : null}
    </Aside>
  );
};

export type {
  SuperSidebarProps,
  SuperSidebarItem,
  SuperSidebarSection,
} from './SuperSidebar.types';
