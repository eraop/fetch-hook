/*
 * author: eraop
 * email: 493214262@qq.com
 * source code: https://github.com/eraop/fetch-hook
 **/
module.exports = function (ob) {
  var realFetch = 'RealFetch'
  ob.hookFetch = function (proxy) {
    // Avoid double hook
    if (window[realFetch] == undefined || window[realFetch] == null) {
      if (typeof fetch == 'function') {
        window[realFetch] = fetch
      } else {
        return false
      }
    }
    window[realFetch] = window[realFetch] || fetch
    // 拦截原始的fetch方法
    window.fetch = function (url, opts) {
      // fetch url拦截
      if (typeof proxy.urlHook === 'function') {
        url = proxy.urlHook.call(this, url)
        // console.log(url)
      }
      // fetch options拦截
      if (typeof proxy.optionsHook === 'function') {
        opts = proxy.optionsHook.call(this, opts)
        // console.log(opts)
      }
      // 定义新的fetch方法，封装原有的fetch方法
      return window[realFetch](url, opts)
    }
  }

  // Cancel hook
  ob.unHookFetch = function () {
    if (window[realFetch]) fetch = window[realFetch]
    window[realFetch] = undefined
  }
}
