/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 14:27:13
 * @Description: 
 * @FilePath: \bosspay\build\custom-theme.js
 */

const customTheme = {
    // sinosun-ui 内置变量
    'theme-color': '#262DD9',
    'title-color': '#ffffff',

    // 业务自定义变量
    "color-pc-bg": "#fff", //背景色
    "warpper-color-bg": "#f2f3f4", //骨架屏背景 warpper 
    "fc-gray": "#191919",  //默认黑色字
    "color-red": "#f83939", //#fa5e3d", // 警告红色
    "color-orange": "#f8a339", //#ff8b03 // 橙色
    "color-green": "#25cb67", //rgb(35, 199, 173) // 绿色
    "color-blue": "#262dd9",   // 蓝色
    "switch-active": "#262DD9",   // 蓝色   账户余额提醒推送设置激活颜色 #262dd9
    "switch-inactive": "#e5e5e5",  // 灰白色  账户余额提醒推送未激活颜色
    "fs-24": "0.24rem", // 0.24rem
    "fs-lowest-normal": "0.28rem", // 0.28rem
    "fs-lower-normal": "0.3rem", // 0.3rem
    "fs-mob-normal": "0.32rem", //手机端通用字体大小
    "head-border-radius": "0.08rem",  //头像圆角
    "card1": 'rgba(81, 0, 200, 1)',  // 企业授权书夹渐变色1   rgba(81, 0, 200, 1)   
    "card2": 'rgba(5, 0, 163, 1)', // 企业授权书夹渐变色2  rgba(5, 0, 163, 1)  
    "color-gray": '#b2b2b2',   // 授权书详情 灰色
};
module.exports = customTheme;
