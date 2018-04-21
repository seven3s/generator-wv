# generator-wv


[![GitHub issues](https://img.shields.io/github/issues/huarxia/generator-wv.svg)](https://github.com/huarxia/generator-wv/issues)
[![GitHub forks](https://img.shields.io/github/forks/huarxia/generator-wv.svg)](https://github.com/huarxia/generator-wv/network)
[![GitHub stars](https://img.shields.io/github/stars/huarxia/generator-wv.svg)](https://github.com/huarxia/generator-wv/stargazers)
[![GitHub license](https://img.shields.io/github/license/huarxia/generator-wv.svg)](https://github.com/huarxia/generator-wv/blob/master/LICENSE)


# generator-wv 脚手架
命名：wv ---> webpack+vue

> generator-wv

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wv using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
[sudo] npm install -g yo
[sudo] npm install -g generator-wv
```

Then generate your new project:

```bash
yo wv
```
目录生成成功后，请阅读：[README.md](https://github.com/huarxia/generator-wv/blob/master/README.md)

项目架子初始化完成（注意：这时只有index示例页面）,目录结构如下：

    wv
    ├── .gitignore  // 忽略git提交文件
    ├── README.md  // 项目说明
    ├── .babelrc  // babel编译配置
    ├── .editorconfig // 编辑器规范配置
    ├── .eslintignore // eslint代码检查忽略文件配置
    ├── .eslintrc.js  // eslint代码检查配置
    ├── .postcssrc.js // postcss 配置，目前使用sass此项无用
    ├── package.json // 项目依赖配置
    ├── index.html  // 项目视图入口文件
    ├── LICENSE    // 许可证 MIT
    ├── dist      // `npm run build` 后生成的打包目录
    ├── build    // 运行项目等配置
    ├── config  // 通用配置等
    ├── src
    ├── ├── app // 项目相关源码开发目录
    ├── |   ├── components // 公用组件
    ├── |   ├── pages // 具体页面目录
    ├── ├── assets // 静态公用资源
    └── ├── common
        |   ├── ...
        ├── router // 路由配置
        ├── app.vue // 视图入口
        ├── main.js // webpack入口
        └── mock
            ├──GET // 本地mock get
            └──POST // 本地mock post

## 支持功能

    1.本地mock： 更改config/index.js : mockLocal: 1, // 1為本地 \ 0為代理 remote中可配置代理地址
    2.自动获取本地局域方地址（192.*.*.*）方便局域网查看
    3.自动获取端口号(默认8888)，不再为端口号占用烦恼，提高效率
    4.运行 `npm run dev`后自动代开浏览器，不必手动打开，提高效率 更改config/index.js : browser: 'google chrome', // 可配置 firefox \ google chrome \ Safari
    5.支持eslint 本地开发必须符合[代码规范](https://github.com/huarxia/spec),也可以单独运行`npm run lint`

## 感谢这些开源项目

1. [yeoman](http://yeomanjs.org/)
2. [Vue.js](http://vuejs.org/)
3. [webpack](https://webpack.github.io/)

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [花夏](http://www.huar.love)
