/**
 * @file:      mock服务逻辑判断
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2017-03-22 18:27:02
 */

var fs         = require('fs');
var chalk      = require('chalk');
var _          = require('lodash');
var config     = require('../../config');
module.exports = {

    /**
     * mockLocal 本地mock逻辑
     *
     * @return {type} description
     */
    mockLocal: function(req, res, next) {
        let base = config.dev.root;
        var XML = req.headers['x-requested-with'];
        if (XML && /XMLHttpRequest/.test(XML)) {
            var url = req.url;
            if (/\?_=/.test(url)) {
                url = url.split('?_=')[0];
            }
            url = base + 'src/mock/' + req.method + url + '/index.json';
            console.log('本地mock数据:' + chalk.green(url));
            var json   = JSON.parse(fs.readFileSync(url, 'utf-8'));
            // var Mock = require('mockjs');
            // var data = Mock.mock(json);
            // 解决返回中文乱码
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            data = JSON.stringify(json, null, 4);
            res.write(data);
            res.end();
        }
        next();
    },

    /**
     * mockRemote 远程服务器
     *
     */
    mockRemote: function (req, res, next) {
        httpProxy = require('http-proxy');
        var base  = config.dev.remote.path;
        var XML = req.headers['x-requested-with'];
        // 如果是XMLHttpRequest則走代理，否則走本地
        if (XML && /XMLHttpRequest/.test(XML)) {
            // var proxy = httpProxy.createProxyServer({
            //     target: base
            // });
            var proxy = httpProxy.createProxyServer({});
            proxy.on('error', function (err, req, res) {
                res.end('Something went wrong. And we are reporting a custom error message.');
            });
            console.log(chalk.yellow('proxy- URL:') + chalk.green(base + req.url));
            req.headers = _.assign(req.headers, config.dev.headers);
            // proxy.web(req, res);
            var location = url.parse(req.url);
            proxy.web(req, res, {
                target: base,
                hots: 'eth.sitenav.net'
            });
        }else {
            next();
        }
    }
};
