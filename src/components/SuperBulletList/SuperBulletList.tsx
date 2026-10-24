import type { ReactElement } from 'react';
import { Item, List } from './SuperBulletList.styles';
import type { SuperBulletListProps } from './SuperBulletList.types';

/** Lista con viñetas: un único marcador en toda la app (nada de `•` sueltos). */
export const SuperBulletList = ({
  items,
  spacing = 'md',
  ordered = false,
  className,
}: SuperBulletListProps): ReactElement => (
  <List as={ordered ? 'ol' : 'ul'} $spacing={spacing} className={className}>
    {items.map((item, i) => (
      <Item key={i} $ordered={ordered}>
        {item}
      </Item>
    ))}
  </List>
);

export type { SuperBulletListProps } from './SuperBulletList.types';
