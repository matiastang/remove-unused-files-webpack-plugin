"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _removeUnusedFilesWebpackPlugin = _interopRequireDefault(require("./plugin/remove-unused-files-webpack-plugin"));

/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 23:32:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-14 14:17:55
 * @Description: webpack入口
 */
var _default = _removeUnusedFilesWebpackPlugin.default;
exports.default = _default;