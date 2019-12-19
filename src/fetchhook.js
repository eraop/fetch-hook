/*
 * author: eraop
 * email: 493214262@qq.com
 * source code: https://github.com/eraop/fetch-hook
 **/
module.exports = function (ob) {
    var realFetch = "RealFetch"
    ob.hookFetch = function (obj) {
        // Avoid double hook
        window[realFetch] = window[realFetch] || fetch
        // 拦截原始的fetch方法 
        window.fetch = function (url, opts) {
            if (typeof obj.urlHook === "function") {
                url = obj.urlHook(url)
            }
            // 定义新的fetch方法，封装原有的fetch方法
            return window[realFetch](url, opts).then(
                res => {
                    return res
                }
            )
        }
    }

    // Cancel hook
    ob.unHookFetch = function () {
        if (window[realFetch]) fetch = window[realFetch];
        window[realFetch] = undefined;
    }
}
