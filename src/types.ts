/**
 * Callback to intercept and optionally transform the fetch URL.
 *
 * @param url - The original request URL string or URL object.
 * @returns The (possibly modified) URL to use for the actual request.
 */
export type UrlHook = (url: RequestInfo | URL) => RequestInfo | URL

/**
 * Callback to intercept and optionally transform the fetch options.
 *
 * @param options - The original RequestInit options, or undefined if none were provided.
 * @returns The (possibly modified) RequestInit options.
 */
export type OptionsHook = (options: RequestInit | undefined) => RequestInit | undefined

/**
 * Proxy configuration passed to `hookFetch`.
 * Both hooks are optional — omit any that you do not need.
 */
export interface FetchProxy {
  /**
   * Intercept the request URL before the fetch is issued.
   * Return a (possibly modified) URL.
   */
  urlHook?: UrlHook

  /**
   * Intercept the request options before the fetch is issued.
   * Return (possibly modified) options.
   */
  optionsHook?: OptionsHook
}
