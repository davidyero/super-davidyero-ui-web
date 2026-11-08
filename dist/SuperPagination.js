import { SuperDropdown } from './chunk-6CWG6ZIN.js';
import './chunk-HH3V5BHF.js';
import { SuperButton } from './chunk-YJ4DF3YR.js';
import './chunk-XZLNSH22.js';
import './chunk-SMPTWZST.js';
import './chunk-3YBGSPOJ.js';
import { SuperTypography } from './chunk-EVE5RNUX.js';
import { space } from './chunk-MULP5OKD.js';
import './chunk-524J7YGQ.js';
import './chunk-5HHPKIMZ.js';
import styled from '@emotion/styled';
import { jsxs, jsx } from '@emotion/react/jsx-runtime';

var Root = styled.nav({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: space.md,
  minWidth: 0
});
var SizeGroup = styled.div({
  display: "flex",
  alignItems: "center",
  gap: space.sm
});
var Pager = styled.div({
  display: "flex",
  alignItems: "center",
  gap: space.sm,
  marginLeft: "auto"
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
    ] }),
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
    ] })
  ] });
};

export { SuperPagination };
