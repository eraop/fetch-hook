/**
 * Created by weiyi on 19/12/19.
 */
var path = require('path');
var fs = require("fs");
var webpack = require('webpack');
module.exports = {
    entry: {
        // "ajaxhook": "./src/ajaxhook.js",
        "fetchhook": "./dist.js"
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist',
        filename: '[name].min.js'
    },
}
