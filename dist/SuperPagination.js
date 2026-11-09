import { SuperDropdown } from './chunk-2MMCYVE3.js';
import './chunk-LXJQ6VGF.js';
import { SuperButton } from './chunk-L5SXGILX.js';
import './chunk-ZVYWI475.js';
import './chunk-34SSRPSU.js';
import './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-IMFSKA2U.js';
import { space, media } from './chunk-D42FHLD7.js';
import './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Root = styled.nav({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: space.sm,
  minWidth: 0,
  [media.sm]: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md
  }
});
var SizeGroup = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: space.sm,
  [media.sm]: { order: -1, justifyContent: "flex-start" }
});
var Pager = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: space.sm,
  minWidth: 0,
  [media.sm]: { justifyContent: "flex-end", marginLeft: "auto" }
});
var SuperPagination = ({
  page,
  pageCount,
  onPageChange,
  summary,
  labels,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  className
}) => {
  const showSizes = pageSize !== void 0 && pageSizeOptions && onPageSizeChange;
  return /* @__PURE__ */ jsxs(Root, { "aria-label": labels.navigation, className, children: [
    /* @__PURE__ */ jsxs(Pager, { children: [
      /* @__PURE__ */ jsx(
        SuperButton,
        {
          variant: "secondary",
          size: "sm",
          iconOnly: true,
          leftIcon: "chevronLeft",
          "aria-label": labels.previous,
          title: labels.previous,
          disabled: page <= 1,
          onClick: () => onPageChange(page - 1)
        }
      ),
      /* @__PURE__ */ jsx(SuperTypography, { variant: "bodySmall", color: "textMuted", as: "span", "aria-live": "polite", children: summary }),
      /* @__PURE__ */ jsx(
        SuperButton,
        {
          variant: "secondary",
          size: "sm",
          iconOnly: true,
          leftIcon: "chevronRight",
          "aria-label": labels.next,
          title: labels.next,
          disabled: page >= pageCount,
          onClick: () => onPageChange(page + 1)
        }
      )
    ] }),
    showSizes && /* @__PURE__ */ jsxs(SizeGroup, { children: [
      /* @__PURE__ */ jsx(SuperTypography, { as: "span", variant: "bodySmall", color: "textMuted", children: labels.pageSize }),
      /* @__PURE__ */ jsx(
        SuperDropdown,
        {
          ariaLabel: labels.pageSize,
          size: "sm",
          value: String(pageSize),
          options: pageSizeOptions.map((n) => ({ value: String(n), label: String(n) })),
          onChange: (v) => onPageSizeChange(Number(v))
        }
      )
    ] })
  ] });
};

export { SuperPagination };
