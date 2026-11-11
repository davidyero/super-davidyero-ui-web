import { toast } from './chunk-Y3WTWHVJ.js';
import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { css, Global } from '@emotion/react';
import { Toaster, toast as toast$1 } from '@yusufceng1z/ding-react';
import { useEffect } from 'react';
import { jsxs, Fragment, jsx } from '@emotion/react/jsx-runtime';

var dingTheme = css({
  ".tst-viewport.tst-viewport": {
    "--tst-bg": v.surfaceElevated,
    "--tst-fg": v.text,
    "--tst-success": v.success,
    "--tst-error": v.danger,
    "--tst-warning": v.warning,
    "--tst-info": v.info,
    fontFamily: v.font.base
  }
});
var DING_TYPE = {
  success: "success",
  danger: "error",
  warning: "warning",
  info: "info"
};
var forward = (item) => toast$1[DING_TYPE[item.tone]](item.title ?? item.message, {
  ...item.title ? { description: item.message } : {},
  duration: item.durationMs,
  ...item.action ? {
    action: {
      label: item.action.label,
      onClick: () => {
        item.action?.onClick();
        toast.dismiss(item.id);
      }
    }
  } : {}
});
var SuperToast = ({ position = "top-right" }) => {
  const { mode, labels } = useSuperTheme();
  useEffect(() => {
    const shown = /* @__PURE__ */ new Map();
    const sync = () => {
      const items = toast.getAll();
      for (const item of items) if (!shown.has(item.id)) shown.set(item.id, forward(item));
      const alive = new Set(items.map((i) => i.id));
      for (const [id, dingId] of shown)
        if (!alive.has(id)) {
          toast$1.dismiss(dingId);
          shown.delete(id);
        }
    };
    sync();
    return toast.subscribe(sync);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Global, { styles: dingTheme }),
    /* @__PURE__ */ jsx(
      Toaster,
      {
        position,
        theme: mode,
        labels: {
          dismiss: labels.dismiss,
          ...labels.notifications ? { region: labels.notifications } : {}
        }
      }
    )
  ] });
};

export { SuperToast };
