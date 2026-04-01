"use strict";
var FetchHook = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    hookFetch: () => hookFetch,
    unHookFetch: () => unHookFetch
  });

  // src/fetchhook.ts
  var originalFetch = null;
  function hookFetch(proxy) {
    if (typeof globalThis.fetch !== "function") {
      return false;
    }
    if (originalFetch === null) {
      originalFetch = globalThis.fetch;
    }
    const _original = originalFetch;
    globalThis.fetch = function(input, init) {
      let url = input;
      let opts = init;
      if (typeof proxy.urlHook === "function") {
        url = proxy.urlHook(url);
      }
      if (typeof proxy.optionsHook === "function") {
        opts = proxy.optionsHook(opts);
      }
      return _original(url, opts);
    };
    return true;
  }
  function unHookFetch() {
    if (originalFetch !== null) {
      globalThis.fetch = originalFetch;
      originalFetch = null;
    }
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=index.global.js.map