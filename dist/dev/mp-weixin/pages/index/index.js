"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_ant_button = common_vendor.resolveComponent("ant-button");
  const _component_ant_container = common_vendor.resolveComponent("ant-container");
  (_component_ant_button + _component_ant_container)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref("Hello");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "primary",
          ["bind:tap"]: "handleTap"
        }),
        b: common_vendor.p({
          type: "default",
          ["bind:tap"]: "handleTap"
        }),
        c: common_vendor.p({
          type: "text",
          ["bind:tap"]: "handleTap"
        }),
        d: common_vendor.p({
          title: "按钮类型",
          className: "list"
        }),
        e: common_vendor.p({
          type: "primary",
          subText: "副标题",
          ["bind:tap"]: "handleTap"
        }),
        f: common_vendor.p({
          type: "default",
          subText: "副标题",
          ["bind:tap"]: "handleTap"
        }),
        g: common_vendor.p({
          type: "text",
          subText: "副标题",
          ["bind:tap"]: "handleTap"
        }),
        h: common_vendor.p({
          title: "带辅助文案按钮",
          className: "list"
        }),
        i: common_vendor.p({
          type: "primary",
          disabled: true
        }),
        j: common_vendor.p({
          type: "default",
          disabled: true
        }),
        k: common_vendor.p({
          type: "text",
          disabled: true
        }),
        l: common_vendor.p({
          title: "禁用",
          className: "list"
        }),
        m: common_vendor.p({
          type: "primary",
          loading: true
        }),
        n: common_vendor.p({
          type: "default",
          loading: true
        }),
        o: common_vendor.p({
          type: "text",
          loading: true
        }),
        p: common_vendor.p({
          title: "加载状态",
          className: "list"
        }),
        q: common_vendor.p({
          type: "primary",
          danger: true,
          ["bind:tap"]: "handleTap"
        }),
        r: common_vendor.p({
          type: "default",
          danger: true,
          ["bind:tap"]: "handleTap"
        }),
        s: common_vendor.p({
          type: "text",
          danger: true,
          ["bind:tap"]: "handleTap"
        }),
        t: common_vendor.p({
          title: "危险",
          className: "list"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/code/fe/programs/washington-washing/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
