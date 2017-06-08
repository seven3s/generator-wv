var os = require('os');
var path = require('path');
var fs = require('fs');
var process = require('process');
var generators = require('yeoman-generator');
var logo = require('../h/logo').WVLogo;
module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },
    echoHelp: function () {
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
        console.log(logo(this));
        var txt = [
            '',
            'wv@v' + this.pkg.version,
            'node@v' + process.version.substring(1),
            'os@' + os.type() + ' ' + os.release(),
            '',
            'Yeoman 命令',
            '   yo wc:h       显示帮助',
            '   yo wc         在根目录执行，初始化Project',
            '项目 命令',
            '   npm run dev   本地开发启动命令',
            '   npm run build 本地build',
            '   npm run lint  本地eslint检测',
            '',
            '',
            '工具文档：https://github.com/huarxia/generator-wv',
            'author by @花夏 liubiao@itoxs.com'
        ].join('\n');
        console.log(txt);
    }
});