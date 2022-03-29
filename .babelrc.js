/*
 * @Author: caohui
 * @Date: 2020-12-08 16:44:26
 * @LastEditors: caohui
 * @LastEditTime: 2020-12-08 17:27:04
 * @Description: 
 * @FilePath: \bosspay\.babelrc.js
 */


module.exports = {
    "presets": [
        [
            "@babel/preset-env", {
                "useBuiltIns": "entry",
                "corejs": "2",
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        "transform-vue-tsx",
        "@babel/plugin-syntax-dynamic-import",
        ["transform-imports", {
            "pageConfig": {
                "transform": "../../bankConfig/pageConfig.js",
                "preventFullImport": true
            },
            "routerConfig": {
                "transform": "../../bankConfig/routerConfig/index.js",
                "preventFullImport": true
            }
        }],
        [
            "import",
            {
                "libraryName": "sinosun-ui",
                "libraryDirectory": "lib",
                "customName": name => {
                    const prefix = "sn-";
                    if (name.indexOf(prefix) > -1) {
                        return `sinosun-ui/lib/${name.split(prefix)[1]}`;
                    } else if (name === 'transfer-dom') {
                        return `sinosun-ui/lib/directives/transfer-dom`;
                    }
                    return "";
                }
            },
            "sinosun-ui"
        ]
    ]
}