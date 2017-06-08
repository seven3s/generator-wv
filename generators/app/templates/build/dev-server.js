
require('./check-versions')()
var IP = require('./lib/getIp');
var getport = require('./lib/getPort');
var config = require('../config')
var mock = require('./lib/mockMiddleware');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
    // automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
    // Define HTTP proxies to your custom API backend
    // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// 在proxy之前加载本地mock 1为本地mock 0为远程mock
app.use(config.dev.mockLocal ? mock.mockLocal : mock.mockRemote);

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./dist'))
    // var uri = 'http://localhost:' + port
var uri = '';
devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
});

// 2017-03-21 17:22:45 动态监测端口，不可用自动++
module.exports = getport.getPort(port, function(port) {
    app.listen(port, function(err) {
        if (err) {
            console.log(err);
            return;
        }

        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            var ip = IP.getIp();

            // 如果未联网则使用本机回环地址：127.0.0.1
            ip = ip || 'localhost';
            uri = 'http://' + ip + ':' + port + config.dev.appPath;
            var browser = config.dev.browser || '';
            opn(uri, {
                app: browser // 以什么浏览器打开
            });
        }
    });
});
