/*
 * @Author: tangdaoyong
 * @Date: 2021-05-13 21:15:50
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-13 21:16:13
 * @Description: file content
 */
const testPrint = (message) => {
    /**
     * 打印输入
     */
    console.log(message)
}
function test(){
    console.dir({ will: be, removed: "true" })
    console.log("except for this one!");/*NotClearConsole*/
}

export {
    testPrint,
    test
}