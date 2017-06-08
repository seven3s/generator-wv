/**
 * @file    util 工具
 * @authors 花夏 (liubiao@itoxs.com)
 *
 * @version 1.0.0
 * @date    2017-04-27 17:50:20
 */

var obj = {

    /**
     * assign 合并对象
     *
     * @param  {Object} argument 需要合并的对象
     *
     */
    assign: function(argument) {
        if (!Object.assign) {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function(target, firstSource) {
                    if (target === 'undefined' || target === 'null') {
                        throw new TypeError('Cannot convert first argument to object');
                    }
                    var to = Object(target);
                    for (var i = 1; i < arguments.length; i++) {
                        var nextSource = arguments[i];
                        if (nextSource === 'undefined' || nextSource === 'null') {
                            continue;
                        }
                        var keysArray = Object.keys(Object(nextSource));
                        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                            var nextKey = keysArray[nextIndex];
                            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                            if (desc !== 'undefined' && desc.enumerable) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                    return to;
                }
            });
        }
    },

    /**
     * 根据传入正则生成正则对象
     *
     * @param  {String} text 正则式
     *
     * @return {Object}      返回正则对象
     */
    getRegExpObject: (text = '') => {
        let matchedText = text.match(/^\/(.*?)\/([gmiy]*)$/);
        let reg;
        if (!matchedText || !matchedText[1]) {
            return null;
        }
        try {
            reg = new RegExp(matchedText[1], matchedText[2] || '');
        } catch (e) {
            reg = e ? null : null;
        }
        return reg;
    }
};

export default obj;
