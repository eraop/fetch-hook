# fetch-hook

English &nbsp;|&nbsp; [中文](#中文)

---

## English

### Introduction

`fetch-hook` is a tiny JavaScript / TypeScript library that lets you intercept and proxy the global `fetch` function. It enables you to uniformly transform the request URL or options before every request is sent — useful for adding auth tokens, injecting headers, logging, etc.

Supports **ESM / CommonJS / Browser Script tag** and ships with full TypeScript type declarations.

**[→ Live Demo](https://eraop.github.io/fetch-hook/)**

### Installation

```bash
npm install @eraop/fetch-hook
```

### Usage

#### ESM (recommended)

```ts
import { hookFetch, unHookFetch } from '@eraop/fetch-hook'

hookFetch({
  // Intercept and modify the request URL (optional)
  urlHook(url) {
    const separator = String(url).includes('?') ? '&' : '?'
    return url + separator + '_token=my-token'
  },
  // Intercept and modify the request options (optional)
  optionsHook(opts) {
    return {
      ...opts,
      headers: {
        ...opts?.headers,
        'X-Custom-Header': 'hello',
      },
    }
  },
})

// Remove the hook and restore the original fetch
unHookFetch()
```

#### CommonJS

```js
const { hookFetch, unHookFetch } = require('@eraop/fetch-hook')
```

#### Browser Script Tag (IIFE)

```html
<script src="https://unpkg.com/@eraop/fetch-hook/dist/index.global.js"></script>
<script>
  FetchHook.hookFetch({
    urlHook(url) {
      return url + '?v=1'
    },
  })
</script>
```

### API

#### `hookFetch(proxy): boolean`

Hooks the global `fetch`. After calling this, every `fetch()` call passes through your configured proxy callbacks.

| Parameter | Type | Description |
|-----------|------|-------------|
| `proxy.urlHook` | `(url: RequestInfo \| URL) => RequestInfo \| URL` | Optional URL interceptor |
| `proxy.optionsHook` | `(opts?: RequestInit) => RequestInit \| undefined` | Optional options interceptor |

Returns `true` on success, `false` if the environment has no `fetch`.

#### `unHookFetch(): void`

Removes the hook and restores the original `fetch`. Safe to call even when no hook is active (no-op).

### Type Definitions

```ts
interface FetchProxy {
  urlHook?: (url: RequestInfo | URL) => RequestInfo | URL
  optionsHook?: (options: RequestInit | undefined) => RequestInit | undefined
}
```

### Notes

- Requires an environment with native `fetch` support (modern browsers or Node.js 18+).
- Calling `hookFetch` multiple times replaces the current proxy but always restores to the one true original `fetch` — no double-wrapping.

### License

MIT © [eraop](https://github.com/eraop)

---

## 中文

[↑ English](#english)

### 简介

\`fetch-hook\` 是一个轻量的 JavaScript/TypeScript 库，用于拦截和代理全局 \`fetch\` 函数。通过它，你可以在请求发出前统一修改请求 URL 或请求配置（如自动附加 token、修改请求头等）。

支持 **ESM / CommonJS / 浏览器 Script 标签** 三种使用方式，并提供完整的 TypeScript 类型声明。

**[→ 在线 Demo](https://eraop.github.io/fetch-hook/)**

### 安装

\`\`\`bash
npm install @eraop/fetch-hook
\`\`\`

### 使用

#### ESM（推荐）

\`\`\`ts
import { hookFetch, unHookFetch } from '@eraop/fetch-hook'

hookFetch({
  // 拦截并修改请求 URL（可选）
  urlHook(url) {
    const separator = String(url).includes('?') ? '&' : '?'
    return url + separator + '_token=my-token'
  },
  // 拦截并修改请求选项（可选）
  optionsHook(opts) {
    return {
      ...opts,
      headers: {
        ...opts?.headers,
        'X-Custom-Header': 'hello',
      },
    }
  },
})

// 取消拦截，恢复原始 fetch
unHookFetch()
\`\`\`

#### CommonJS

\`\`\`js
const { hookFetch, unHookFetch } = require('@eraop/fetch-hook')
\`\`\`

#### 浏览器 Script 标签（IIFE）

\`\`\`html
<script src="https://unpkg.com/@eraop/fetch-hook/dist/index.global.js"></script>
<script>
  FetchHook.hookFetch({
    urlHook(url) {
      return url + '?v=1'
    },
  })
</script>
\`\`\`

### API

#### \`hookFetch(proxy): boolean\`

拦截全局 \`fetch\`。调用后所有通过 \`fetch\` 发起的请求都会经过你配置的 hooks 处理。

| 参数 | 类型 | 说明 |
|------|------|------|
| \`proxy.urlHook\` | \`(url: RequestInfo \| URL) => RequestInfo \| URL\` | URL 拦截回调（可选） |
| \`proxy.optionsHook\` | \`(opts?: RequestInit) => RequestInit \| undefined\` | 请求选项拦截回调（可选） |

返回 \`true\` 表示安装成功；返回 \`false\` 表示当前环境不支持 \`fetch\`。

#### \`unHookFetch(): void\`

取消拦截，恢复原始 \`fetch\`。未安装 hook 时调用此方法为空操作，不会报错。

### 类型定义

\`\`\`ts
interface FetchProxy {
  urlHook?: (url: RequestInfo | URL) => RequestInfo | URL
  optionsHook?: (options: RequestInit | undefined) => RequestInit | undefined
}
\`\`\`

### 注意事项

- 需要在支持原生 \`fetch\` 的浏览器或 Node.js 18+ 环境中运行。
- \`hookFetch\` 可多次调用（会替换当前 proxy），内部只保留一次对原始 \`fetch\` 的引用，不会出现重复嵌套。
