/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 17:27:56
 * @Description: 
 * @FilePath: \bosspay\.eslintrc.js
 */


module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript"],
    globals: {
        NativeSupportApi: true,
        BrowserApi: true
    },
    rules: {
        //强制代码中不能使用console
        "no-console": "off",
        "no-irregular-whitespace": "off",
        //任何对未声明的变量的引用都会导致警告
        "no-undef": "off",
        //重复定义
        "no-redeclare": "off",
        //转义字符串，模板文字和正则表达式中的非特殊字符不会产生任何影响
        "no-useless-escape": "off"
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    }
};
