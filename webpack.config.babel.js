/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 20:59:55
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-13 21:46:02
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
    resolve: {
        alias: {// 别名
            root: path.resolve(__dirname, 'src/')
        }
    },
    module: { // 加载器
        rules: [// 规则
            {
                test: /\.js|jsx$/,            // 匹配文件
                exclude: /node_modules/,      // 排除文件夹
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    } // babel 加载器
                ]
            }
        ]
    }
};