/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 20:59:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-14 11:44:58
 * @Description: babel配置文件
 */
const presets = [
    ["@babel/preset-env",
        {
            "targets": {
                "chrome": "58",
                "ie": "11"
            },
            "modules": "auto"
        }
    ]
];
const plugins = ["@babel/plugin-transform-runtime"];

module.exports = { presets, plugins };