/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 21:03:03
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-13 21:50:32
 * @Description: 移除无用的文件
 */
import path from "path";
import globAll from "glob-all";// 获取路径下的所有文件和文件夹路径
import shell from 'shelljs';// js执行shell命令
import inquirer from 'inquirer';// CLI交互


/**
 * 同步获取路径下面的文件夹
 * @param {*} patterns 
 * @param {*} options 
 * @returns 
 */
const syncGetDirAllFiles = (patterns, options) => {
    return globAll.sync(
        patterns,
        options
    );
}

/**
 * 同步指令移除文件或文件夹
 * @param {*} unuseds 
 * @param {*} removeDir 
 */
const syncRemoveDirAndFiles = (unuseds, globOptions, removeDir) => {
    // 排序
    let sortUnuseds = unuseds.sort((left, right) => {
        return right.length - left.length
    })
    // 移除
    for (let i = 0; i < sortUnuseds.length; i++) {
        const unused = sortUnuseds[i];
        //
        let splitArr = unused.split('/');
        let isFile = splitArr[splitArr.length - 1].indexOf('.') !== -1;
        if (isFile) {// 文件
            let remove = shell.rm('-r', unused);
            console.log(`删除${unused}文件${remove.code === 0 ? '成功' : '失败'}`);
        } else {// 文件夹
            if (!removeDir) {// 是否移除文件夹
                continue
            }
            let dirFiles = syncGetDirAllFiles([`${unused}/**`], globOptions);
            if (dirFiles.length <= 1 && dirFiles[0] === unused) {
                let remove = shell.rm('-r', unused);
                console.log(`删除${unused}文件夹${remove.code === 0 ? '成功' : '失败'}`);
            } else {
                throw `文件夹${unused}不为空！`;
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
const globOptionsWith = (compiler, globOptions) => {
    return {
        cwd: compiler.context,// 当前路径
        ...globOptions// 配置
    };
}

/**
 * 获取依赖资源文件路径列表
 * @param {*} compilation 
 * @returns 
 */
const getFileDepsMap = (compilation) => {
    /*
    compilation.fileDependencies一个存放模块中包含的源文件路径的数组。它包含了 JavaScript 源文件自身（例如：index.js），和所有被请求（required）的依赖资源文件（样式表，图像等等）。想要知道哪些源文件属于这个模块时，检查这些依赖是有帮助的。
    */
    const fileDepsBy = [...compilation.fileDependencies].reduce(
        (acc, usedFilepath) => {
            acc[usedFilepath] = true;
            return acc;
        },
        {}
    );
    const { assets } = compilation;
    Object.keys(assets).forEach(assetRelpath => {
        const existsAt = assets[assetRelpath].existsAt;
        fileDepsBy[existsAt] = true;
    });
    return fileDepsBy;
}

/**
 * CLI交互询问事件
 * @param {*} unused 未使用文件或文件夹列表
 * @param {*} globOptions 
 */
const syncInquirerPrompt = (unused, globOptions) => {

    /**
     * 询问
     */
    const promptList = [{
        type: "confirm",
        message: "已检测到的未使用的",
        name: "file",
        prefix: "是否删除",
        suffix: "文件？(本地如果rm防护将无法恢复)"
    },{
        type: "confirm",
        message: "已检测到的未使用的",
        name: "dir",
        prefix: "是否删除",
        suffix: "文件夹？(本地如果rm防护将无法恢复)",
        when: function(answers) { // 只有当选择删除文件后才询问是否删除文件夹，否则默认不删除
            return answers.file
        }
    }];

    inquirer.prompt(promptList).then((answers) => {
        if (answers.file) {// 执行删除
            syncRemoveDirAndFiles(unused, globOptions, answers.dir);
        }
    })
};

/**
 * 获取未使用文件及文件夹列表
 * @param {*} compiler 
 * @param {*} compilation 
 * @param {*} plugin 
 */
const syncApplyAfterEmit = (compiler, compilation, plugin) => {
    const globOptions = globOptionsWith(compiler, plugin.globOptions);
    const fileDepsMap = getFileDepsMap(compilation);
    // 获取
    const files = syncGetDirAllFiles(
        plugin.options.patterns,
        globOptions
    );
    /*
    path.join(path1，path2，path3.......)作用：将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径。若任意一个路径片段类型错误，会报错。
    path.resolve([from...],to)作用：把一个路径或路径片段的序列解析为一个绝对路径。相当于执行cd操作。/被解析为根目录。
    */
    // 过滤出未使用的文件或文件夹
    const unused = files.filter(
        it => !fileDepsMap[path.join(globOptions.cwd, it)]
    );
    if (unused.length !== 0) {
        let message = `
        remove-unused-files-webpack-plugin 插件找出的未使用的文件或文件夹如下:
        
        ${unused.join(`\n\t`)}`
        // 命令配置了 bail 参数并传递 true ，错误的时候，退出打包过程。
        if (plugin.options.failOnUnused && compilation.bail) {
            throw message;
        }
        const errorsList = plugin.options.failOnUnused ? compilation.errors : compilation.warnings;
        errorsList.push(new Error(message));
        if (plugin.options.removeUnused) {// 是否配置了删除
            if (plugin.options.removeInquiry) {
                setTimeout(() => {
                    syncInquirerPrompt(unused, globOptions);
                }, 0)
                return
            }
            syncRemoveDirAndFiles(unused, globOptions, true);
        }
    }
    // 没有发现未使用的文件或文件夹 不提示
}

/**
 * 清除没有使用到的文件或文件夹
 */
export class RemoveUnusedFilesWebpackPlugin {

    constructor(options = {}) {
        // 挂载options
        this.options = {
            ...options,
            patterns: options.patterns || [`**/*.*`],
            failOnUnused: options.failOnUnused || false,
            removeUnused: options.removeUnused || false,
            removeInquiry: options.removeInquiry || true
        };
        // 挂载globOptions
        this.globOptions = {
            ignore: `node_modules/**/*`,
            ...options.globOptions
        };
    }

    apply(compiler) {

        // 注册afterEmit处理
        compiler.hooks.afterEmit.tap('remove-unused-files-webpack-plugin', (compilation) => {
            syncApplyAfterEmit(compiler, compilation, this)
        });
    }
}

export default RemoveUnusedFilesWebpackPlugin;