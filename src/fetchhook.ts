import type { FetchProxy } from './types'

/** Stores a reference to the original `window.fetch` when hooked. */
let originalFetch: typeof fetch | null = null

/**
 * Hook the global `fetch` function with the provided proxy callbacks.
 *
 * After calling this function every `fetch()` call in the current browsing
 * context will pass through the hooks you configured before the actual
 * network request is made.
 *
 * Calling `hookFetch` while a hook is already active will silently replace
 * the current proxy with the new one without losing the reference to the
 * original `fetch`.
 *
 * @param proxy - An object containing optional `urlHook` and/or `optionsHook`
 *                callbacks that can inspect and transform the request before
 *                it is dispatched.
 * @returns `true` when the hook was installed successfully, `false` when the
 *          environment does not expose a global `fetch` (e.g. older browsers).
 *
 * @example
 * ```ts
 * hookFetch({
 *   urlHook(url) {
 *     return url + '?v=1'
 *   },
 *   optionsHook(opts) {
 *     return { ...opts, credentials: 'include' }
 *   },
 * })
 * ```
 */
export function hookFetch(proxy: FetchProxy): boolean {
  if (typeof globalThis.fetch !== 'function') {
    return false
  }

  // Preserve the original fetch only on the first call so that chained hooks
  // always restore back to the real implementation.
  if (originalFetch === null) {
    originalFetch = globalThis.fetch
  }

  const _original = originalFetch

  globalThis.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    let url: RequestInfo | URL = input
    let opts: RequestInit | undefined = init

    if (typeof proxy.urlHook === 'function') {
      url = proxy.urlHook(url)
    }

    if (typeof proxy.optionsHook === 'function') {
      opts = proxy.optionsHook(opts)
    }

    return _original(url, opts)
  }

  return true
}

/**
 * Remove the fetch hook and restore the original `fetch` implementation.
 *
 * Safe to call even when no hook is currently active — in that case it is a
 * no-op.
 *
 * @example
 * ```ts
 * unHookFetch()
 * ```
 */
export function unHookFetch(): void {
  if (originalFetch !== null) {
    globalThis.fetch = originalFetch
    originalFetch = null
  }
}
