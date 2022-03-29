const utils = require('./utils');
const config = require('../config');
let entrys = utils.getMultiEntry(utils.resolve(`/src/${config.webpack.moduleName}/**/*.js`)); // 获得入口js文件
module.exports = entrys;