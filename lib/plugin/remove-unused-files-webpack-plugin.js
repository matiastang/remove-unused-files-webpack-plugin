"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _globAll = _interopRequireDefault(require("glob-all"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _inquirer = _interopRequireDefault(require("inquirer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// CLI交互

/**
 * 同步获取路径下面的文件夹
 * @param {*} patterns 
 * @param {*} options 
 * @returns 
 */
var syncGetDirAllFiles = function syncGetDirAllFiles(patterns, options) {
  return _globAll.default.sync(patterns, options);
};
/**
 * 同步指令移除文件或文件夹
 * @param {*} unuseds 
 * @param {*} removeDir 
 */


var syncRemoveDirAndFiles = function syncRemoveDirAndFiles(unuseds, globOptions, removeDir) {
  // 排序
  var sortUnuseds = unuseds.sort(function (left, right) {
    return right.length - left.length;
  }); // 移除

  for (var i = 0; i < sortUnuseds.length; i++) {
    var unused = sortUnuseds[i]; //

    var splitArr = unused.split('/');
    var isFile = splitArr[splitArr.length - 1].indexOf('.') !== -1;

    if (isFile) {
      // 文件
      var remove = _shelljs.default.rm('-r', unused);

      console.log("\u5220\u9664".concat(unused, "\u6587\u4EF6").concat(remove.code === 0 ? '成功' : '失败'));
    } else {
      // 文件夹
      if (!removeDir) {
        // 是否移除文件夹
        continue;
      }

      var dirFiles = syncGetDirAllFiles(["".concat(unused, "/**")], globOptions);

      if (dirFiles.length <= 1 && dirFiles[0] === unused) {
        var _remove = _shelljs.default.rm('-r', unused);

        console.log("\u5220\u9664".concat(unused, "\u6587\u4EF6\u5939").concat(_remove.code === 0 ? '成功' : '失败'));
      } else {
        throw "\u6587\u4EF6\u5939".concat(unused, "\u4E0D\u4E3A\u7A7A\uFF01");
      }
    }
  }
};
/**
 * 组装全局配置
 * @param {*} compiler 
 * @param {*} globOptions 
 * @returns 
 */


var globOptionsWith = function globOptionsWith(compiler, globOptions) {
  return _objectSpread({
    cwd: compiler.context
  }, globOptions);
};
/**
 * 获取依赖资源文件路径列表
 * @param {*} compilation 
 * @returns 
 */


var getFileDepsMap = function getFileDepsMap(compilation) {
  /*
  compilation.fileDependencies一个存放模块中包含的源文件路径的数组。它包含了 JavaScript 源文件自身（例如：index.js），和所有被请求（required）的依赖资源文件（样式表，图像等等）。想要知道哪些源文件属于这个模块时，检查这些依赖是有帮助的。
  */
  var fileDepsBy = (0, _toConsumableArray2.default)(compilation.fileDependencies).reduce(function (acc, usedFilepath) {
    acc[usedFilepath] = true;
    return acc;
  }, {});
  var assets = compilation.assets;
  Object.keys(assets).forEach(function (assetRelpath) {
    var existsAt = assets[assetRelpath].existsAt;
    fileDepsBy[existsAt] = true;
  });
  return fileDepsBy;
};
/**
 * CLI交互询问事件
 * @param {*} unused 未使用文件或文件夹列表
 * @param {*} globOptions 
 */


var syncInquirerPrompt = function syncInquirerPrompt(unused, globOptions) {
  /**
   * 询问
   */
  var promptList = [{
    type: "confirm",
    message: "已检测到的未使用的",
    name: "file",
    prefix: "是否删除",
    suffix: "文件？(本地如果rm防护将无法恢复)"
  }, {
    type: "confirm",
    message: "已检测到的未使用的",
    name: "dir",
    prefix: "是否删除",
    suffix: "文件夹？(本地如果rm防护将无法恢复)",
    when: function when(answers) {
      // 只有当选择删除文件后才询问是否删除文件夹，否则默认不删除
      return answers.file;
    }
  }];

  _inquirer.default.prompt(promptList).then(function (answers) {
    if (answers.file) {
      // 执行删除
      syncRemoveDirAndFiles(unused, globOptions, answers.dir);
    }
  });
};
/**
 * 获取未使用文件及文件夹列表
 * @param {*} compiler 
 * @param {*} compilation 
 * @param {*} plugin 
 */


var syncApplyAfterEmit = function syncApplyAfterEmit(compiler, compilation, plugin) {
  var globOptions = globOptionsWith(compiler, plugin.globOptions);
  var fileDepsMap = getFileDepsMap(compilation); // 获取

  var files = syncGetDirAllFiles(plugin.options.patterns, globOptions);
  /*
  path.join(path1，path2，path3.......)作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。
  path.resolve([from...],to)作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作。/被解析为根目录。
  */
  // 过滤出未使用的文件或文件夹

  var unused = files.filter(function (it) {
    return !fileDepsMap[_path.default.join(globOptions.cwd, it)];
  });

  if (unused.length !== 0) {
    var message = "\n        remove-unused-files-webpack-plugin \u63D2\u4EF6\u627E\u51FA\u7684\u672A\u4F7F\u7528\u7684\u6587\u4EF6\u6216\u6587\u4EF6\u5939\u5982\u4E0B:\n        \n        ".concat(unused.join("\n\t")); // 命令配置了 bail 参数并传递 true ，错误的时候，退出打包过程。

    if (plugin.options.failOnUnused && compilation.bail) {
      throw message;
    }

    var errorsList = plugin.options.failOnUnused ? compilation.errors : compilation.warnings;
    errorsList.push(new Error(message));

    if (plugin.options.removeUnused) {
      // 是否配置了删除
      if (plugin.options.removeInquiry) {
        setTimeout(function () {
          syncInquirerPrompt(unused, globOptions);
        }, 0);
        return;
      }

      syncRemoveDirAndFiles(unused, globOptions, true);
    }
  } // 没有发现未使用的文件或文件夹 不提示

};
/**
 * 清除没有使用到的文件或文件夹
 */


var RemoveUnusedFilesWebpackPlugin = /*#__PURE__*/function () {
  function RemoveUnusedFilesWebpackPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, RemoveUnusedFilesWebpackPlugin);
    // 挂载options
    this.options = _objectSpread(_objectSpread({}, options), {}, {
      patterns: options.patterns || ["**/*.*"],
      failOnUnused: options.failOnUnused || false,
      removeUnused: options.removeUnused || false,
      removeInquiry: options.removeInquiry || true
    }); // 挂载globOptions

    this.globOptions = _objectSpread({
      ignore: "node_modules/**/*"
    }, options.globOptions);
  }

  (0, _createClass2.default)(RemoveUnusedFilesWebpackPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      // 注册afterEmit处理
      compiler.hooks.afterEmit.tap('remove-unused-files-webpack-plugin', function (compilation) {
        syncApplyAfterEmit(compiler, compilation, _this);
      });
    }
  }]);
  return RemoveUnusedFilesWebpackPlugin;
}();

var _default = RemoveUnusedFilesWebpackPlugin;
exports.default = _default;