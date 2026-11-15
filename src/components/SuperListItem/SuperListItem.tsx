import styled from '@emotion/styled';
import type { ReactElement } from 'react';
import { SuperTooltip } from '../SuperTooltip/SuperTooltip';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Content, Item, Leading, Meta, SubtitleFocus, Trailing } from './SuperListItem.styles';
import type { SuperListItemProps } from './SuperListItem.types';

const FullWidthTooltip = styled(SuperTooltip)({ display: 'flex', minWidth: 0, maxWidth: '100%' });

/** Fila de lista: avatar, dos líneas de texto, metadatos y un extremo derecho. */
export const SuperListItem = ({
  title,
  subtitle,
  subtitleTooltip = false,
  leading,
  meta,
  trailing,
  hoverable = false,
  onClick,
  divider = false,
  className,
}: SuperListItemProps): ReactElement => {
  const subtitleText = subtitle ? (
    <SuperTypography variant="caption" color="textMuted" truncate as="span">
      {subtitle}
    </SuperTypography>
  ) : null;

  return (
    <Item
      as={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      $hoverable={hoverable}
      $clickable={Boolean(onClick)}
      $divider={divider}
      className={className}
    >
      {leading ? <Leading>{leading}</Leading> : null}
      <Content>
        <SuperTypography variant="bodySmall" color="text" weight="semibold" truncate as="span">
          {title}
        </SuperTypography>
        {subtitle && subtitleTooltip ? (
          <FullWidthTooltip label={subtitle}>
            <SubtitleFocus tabIndex={0}>{subtitleText}</SubtitleFocus>
          </FullWidthTooltip>
        ) : (
          subtitleText
        )}
        {meta ? <Meta>{meta}</Meta> : null}
      </Content>
      {trailing ? <Trailing>{trailing}</Trailing> : null}
    </Item>
  );
};

export type { SuperListItemProps } from './SuperListItem.types';
