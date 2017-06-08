/**
 * @File:      WV脚手架logo
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2017-06-08 15:13:54
 */

var chalk = require('chalk');
function WVLogo(contex) {
    var version = '';
    try{
        version = contex ? 'v' + contex.pkg.version : '';
    }
    catch (e) {}
    var logo = '\n'
        +     chalk.red('       ♥♥♥♥♥♥♥♥　　　　　♥♥♥　　♥♥♥\n')
        +     chalk.yellow('      ♥♥　♥♥　♥♥　　　　 ♥♥♥　　♥♥　\n')
        +  chalk.green('　     ♥　♥♥　♥　　　　　 ♥♥　　♥　　\n')
        +  chalk.yellow('　      ♥♥♥♥♥♥　　　　　　 ♥♥　♥♥　　\n')
        +   chalk.magenta('　      ♥♥♥♥♥♥　　　　　　   ♥♥♥　　　\n')
        +   chalk.cyan('　      ♥♥♥♥♥♥　　　　　　　 ♥♥♥　　　\n')
        + chalk.magenta('　　     ♥  ♥　　　　　　　　 ♥♥　　\n')
        + chalk.blue('　　     ♥  ♥　　　　　　　　 ♥　　　　\n');

    logo += ('need help?') + chalk.magenta('  ===>  ') + chalk.green('yo wv:h') + '\n';

    if (contex) {
        logo += '\nCMD: '+ chalk.green(contex.rootGeneratorName()) + '\n';
    }

    return logo;
};

exports.WVLogo = WVLogo;