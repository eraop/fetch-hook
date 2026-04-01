# fetch-hook


---


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
