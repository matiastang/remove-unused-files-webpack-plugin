/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 20:59:01
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-14 14:33:53
 * @Description: babel配置文件
 */
const presets = [
    ["@babel/preset-env",
        {
            targets: {
                "chrome": "58",
                "ie": "11"
            },
            // 默认为 "auto". "false" 保持 es module 格式.
            modules: process.env.BABEL_ENV === 'esm' ? false : 'commonjs'
        }
    ]
];
const plugins = ["@babel/plugin-transform-runtime"];

module.exports = { presets, plugins };