import type { FC } from 'react';
import { SuperButton } from '../SuperButton/SuperButton';
import { SuperDropdown } from '../SuperDropdown/SuperDropdown';
import { SuperTypography } from '../SuperTypography/SuperTypography';
import { Pager, Root, SizeGroup } from './SuperPagination.styles';
import type { SuperPaginationProps } from './SuperPagination.types';

/**
 * Paginación de una lista: anterior, resumen y siguiente, más el selector de
 * cuántos por página. No pagina nada por sí misma: la app corta la lista.
 */
export const SuperPagination: FC<SuperPaginationProps> = ({
  page,
  pageCount,
  onPageChange,
  summary,
  labels,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  className,
}) => {
  const showSizes = pageSize !== undefined && pageSizeOptions && onPageSizeChange;

  return (
    <Root aria-label={labels.navigation} className={className}>
      <Pager>
        <SuperButton
          variant="secondary"
          size="sm"
          iconOnly
          leftIcon="chevronLeft"
          aria-label={labels.previous}
          title={labels.previous}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        <SuperTypography variant="bodySmall" color="textMuted" as="span" aria-live="polite">
          {summary}
        </SuperTypography>
        <SuperButton
          variant="secondary"
          size="sm"
          iconOnly
          leftIcon="chevronRight"
          aria-label={labels.next}
          title={labels.next}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </Pager>
      {showSizes && (
        <SizeGroup>
          <SuperTypography as="span" variant="bodySmall" color="textMuted">
            {labels.pageSize}
          </SuperTypography>
          <SuperDropdown
            ariaLabel={labels.pageSize}
            size="sm"
            value={String(pageSize)}
            options={pageSizeOptions.map((n) => ({ value: String(n), label: String(n) }))}
            onChange={(v) => onPageSizeChange(Number(v))}
          />
        </SizeGroup>
      )}
    </Root>
  );
};
