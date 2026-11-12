import { toast } from './chunk-PNPDL4XQ.js';
import { useSuperTheme } from './chunk-3YBGSPOJ.js';
import { v } from './chunk-VQ2WXUA7.js';
import './chunk-X7SCOXRS.js';
import { css, Global } from '@emotion/react';
import { toast as toast$1, Toaster } from '@yusufceng1z/ding-react';
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
  duration: 0,
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
    let current = null;
    const forwarded = /* @__PURE__ */ new Set();
    const sync = () => {
      const items = toast.getAll();
      for (const item of items)
        if (!forwarded.has(item.id)) {
          forwarded.add(item.id);
          const prev = current;
          current = { id: item.id, dingId: forward(item) };
          if (prev) toast.dismiss(prev.id);
        }
      const alive = new Set(items.map((i) => i.id));
      for (const id of forwarded) if (!alive.has(id)) forwarded.delete(id);
      if (current && !alive.has(current.id)) {
        toast$1.dismiss(current.dingId);
        current = null;
      }
    };
    const syncBack = () => {
      if (!current) return;
      const open = toast$1.getState().toasts.some((t) => t.phase === "enter" || t.phase === "open");
      if (!open) {
        const { id } = current;
        current = null;
        toast.dismiss(id);
      }
    };
    sync();
    const offStore = toast.subscribe(sync);
    const offDing = toast$1.subscribe(syncBack);
    return () => {
      offStore();
      offDing();
    };
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
