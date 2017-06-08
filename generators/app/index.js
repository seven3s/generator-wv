/**
 * @File:      任务主文件
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-06-06 23:54:35
 */
// 'use strict';
var generators = require('yeoman-generator');
// var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var logo = require('../../h/logo').WVLogo;
module.exports = generators.Base.extend({
    /**
     * constructor 构造函数
     *
     */
    constructor: function() {
        // 调用父类构造函数
        generators.Base.apply(this, arguments);
        // 读取json文件并转换为JSON格式存起来
        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));
        this.log(logo(this));
        this.directory('build', 'build');
        this.directory('config', 'config');
        this.directory('src', 'src');
        this.copy('README.md', 'README.md');
        this.copy('_babelrc', '.babelrc');
        this.copy('_editorconfig', '.editorconfig');
        this.copy('_eslintignore', '.eslintignore');
        this.copy('_eslintrc.js', '.eslintrc.js');
        this.copy('_gitignore', '.gitignore');
        this.copy('_postcssrc.js', '.postcssrc.js');
        this.copy('index.html', 'index.html');
        this.on('error', function (err) {
            console.log('err:', err);
        });
        this.on('end', function () {
            var cb = this.async();
            this.prompt([
                {
                    'name'   : 'npm_install',
                    'message': 'Install node_modules for npm run dev now?',
                    'default': 'N/y',
                    'warning': ''
                }
            ], function (props) {

                this.isNpmInstall = (/^y/i).test(props.npm_install);
                if (this.isNpmInstall) {
                    this.npmInstall('', {}, function (err) {

                        if (err) {
                            return this.log('\n' + chalk.red('please run "sudo npm install"\n'));
                        }

                        console.log(chalk.green('\n\nnpm was installed successful. \n\n'));
                    });
                } else {
                    console.log(chalk.red('\n\nplease run "npm install" before npm run dev\n'));
                    console.log(chalk.green('\ndone!\n'));
                    console.log(chalk.green('\n进入目录运行：npm run dev\n'));
                }
                cb();
            }.bind(this));

        }.bind(this));
    },
    prompting: function() {
        // Have LG greet the user.
        // 获取当前文件夹名称
        var folderName = path.basename(process.cwd());
        var gitConfig = require('git-config');
        var curGitUser = gitConfig.sync().user || {};
        var curUserName = curGitUser.name || '';
        var curUserEmail = curGitUser.email || '';
        var prompts = [{
            'name'   : 'projectName',
            'message': 'Name of Project?',
            'default': folderName,
            'warning': ''
        }, {
            'name'   : 'version',
            'message': 'Version:',
            'default': '1.0.0',
            'warning': ''
        }, {
            'name'   : 'author',
            'message': 'Author Name:',
            'default': curUserName,
            'warning': ''
        },
        {
            'name'   : 'email',
            'message': 'Author Email:',
            'default': curUserEmail,
            'warning': ''
        },
        {
            type: 'list',
            name: 'License',
            message: 'Please choose license:',
            choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
        },{
            'type': 'input',
            'name': 'isSupportGit',
            'message': '是否支持git?',
            'default': 'Y/n'
        }];
        // 当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法
        var done = this.async();
        this.prompt(prompts, function (props) {
            this.packageName = props.projectName;
            this.version = props.version;
            this.author = props.author;
            this.email = props.email;
            this.License = props.License;
            this.isSupportGit = /^y/i.test(props.isSupportGit);
            done();
        }.bind(this));
    },
    packageJSON: function () {
        this.template('package.json', 'package.json');
    },

    supportGit: function () {
        if (this.isSupportGit) {
            this.copy('_gitignore', '.gitignore');
        }
    }
});