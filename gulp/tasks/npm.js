/*
 * @Author: tangdaoyong
 * @Date: 2021-05-14 14:51:10
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-14 15:01:06
 * @Description: npm 相关
 */
/**
 * 提交到npm
 * @param {*} gulp 
 * @param {*} plugins 
 * @param {*} cb 
 */
const npmPackagePush = async function (gulp, plugins, cb) {
    let chooseNPM = 'nrm use npm ';// 切换源到npm(使用nrm)
    let command = 'npm publish'; // 提交npm
    // 执行指令
    await plugins.shell.exec(`
        ${chooseNPM}
        ${command}
    `, (error, stdout, stderr) => {
        if (error) {
            console.error(`${command} 指令 exec error: ${error}`)
            cb()
            return
        }
        cb()
    });
}

// 导出
module.exports = {
    npmPackagePush
}