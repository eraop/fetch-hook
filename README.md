中文简体|[English](./README-EN.md)

# fetch-hook

## 简介

fetch-hook是一个用于拦截Fetch全局对象的库，它可以在XMLHttpRequest对象发起请求之前和收到响应内容之后获得处理权。通过它你可以在底层对请求进行统一的操作。

## 使用

### 安装

- 引入

  ```html
  <script src="../dist/ajaxhook.min.js"></script>
  ```
 

### 拦截`fetch`回调和方法

```javascript
hookFetch({
  urlHook: function(input) {
    if (input.indexOf('?') !== -1) {
      input += '&_token=test'
    } else {
      input += '?_token=test'
    }
    console.log('url：'+input)
    return input
  }
})


```
这样拦截就生效了，拦截的全局的`fetch`，所以，无论你使用的是哪种JavaScript http请求库，只要最终是使用`fetch`发起的网络请求，那么拦截都会生效。下面我们用jQuery发起一个请求：

```javascript
// 获取当前页面的源码(Chrome中测试)
  fetch('http://localhost:9001/api/notice/unread/count').then(res=>{console.log(res)})
```

输出:

```
> url:http://localhost:9001/api/notice/unread/count?_token=test

  



## API

### hookFetch(proxy)

拦截全局`fetch`，此方法调用后，浏览器原生的`fetch`将会被代理，直到调用`unHookFetch()`后才会取消代理。


### unHookFetch()

- 取消拦截；取消后`fetch`将不会再被代理



## 注意

- 本库需要在支持ES5的浏览器环境中运行(不支持IE8)，但本库并不依赖ES6新特性。

## 最后

只是个人研究所用，实现了一个fetch拦截的核心，并非一个完整可商用的项目。如果你喜欢，欢迎Star，如果有问题，欢迎提Issue， 如果你想打赏或想请作者喝杯咖啡，请扫描下面二维码：





