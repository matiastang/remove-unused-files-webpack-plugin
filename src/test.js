/*
 * @Author: tangdaoyong
 * @Date: 2021-04-23 17:38:25
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-05-13 23:32:24
 * @Description: 测试文件
 */
import { testPrint } from './js/printTest';
/**
 * 输出位置
 */
testPrint('测试文件')

// async function asyscTest(message) {
//     const asyscTestPrint = await import(/* webpackChunkName: "asyncTest" */ 'test1/test2')
//     asyscTestPrint(message)
// }
// asyscTest('异步测试')
import asyscTestPrint from './js/asyncTest';
asyscTestPrint('测试')