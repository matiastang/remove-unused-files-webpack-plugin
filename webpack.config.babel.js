/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 20:59:55
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-14 11:44:28
 * @Description: Webpack 配置文件
 */
import path from 'path'

/* - 常量 - */

// 入口
const ENTRYPATH = path.resolve(__dirname, './src/index.js');
// 出口
const OUTPUTPATH = path.resolve(__dirname, './build');

/* - 自定义webpack插件 - */

import RemoveUnusedFilesWebpackPlugin from './plugin/remove-unused-files-webpack-plugin';// 清除无用文件

/* - webpack插件 - */

import { CleanWebpackPlugin } from 'clean-webpack-plugin';// 清理构建文件夹

export default {
    entry: {// 入口
        app: ENTRYPATH
    },
    plugins: [
        // 清理构建文件夹
        new CleanWebpackPlugin(),
        // 清除无用文件
        new RemoveUnusedFilesWebpackPlugin({
            patterns: ['src/**'],
            removeUnused: true
        })
    ],
    output: {
        path: OUTPUTPATH,// 出口路径
        filename: '[name].bundle.js'
    },
    /*
    https://ask.csdn.net/questions/7252963
    pnpm run build:dev时node_modules中报错Module not found: Error: Can't resolve '*'
    */
    // node: {
    //     fs: 'empty'
    // },
    resolve: {
        // webpack5 中移除了nodejs核心模块的polyfill自动引入，需要手动引入。
        fallback: {
            "path": require.resolve("path-browserify"),
            "assert": require.resolve("assert/"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "tty": require.resolve("tty-browserify"),
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "os": require.resolve("os-browserify/browser")
        },
        alias: {// 别名
            root: path.resolve(__dirname, 'src/')
        }
    },
    module: { // 加载器
        rules: [// 规则
            {
                test: /\.js|jsx$/,            // 匹配文件
                exclude: /node_modules/,      // 排除文件夹
                // include: [/src/, /plugin/],               // 包含文件
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env',
                                {
                                    "targets": {
                                        "chrome": "58",
                                        "ie": "11"
                                    }
                                }
                            ]]
                        }
                    } // babel 加载器
                ]
            }
        ]
    }
};