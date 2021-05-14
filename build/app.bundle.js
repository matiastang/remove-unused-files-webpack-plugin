/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./test/index.js":
/*!***********************!*\
  !*** ./test/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_printTest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/printTest */ \"./test/js/printTest.js\");\n/* harmony import */ var _js_asyncTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/asyncTest */ \"./test/js/asyncTest.js\");\n/*\n * @Author: tangdaoyong\n * @Date: 2021-04-23 17:38:25\n * @LastEditors: tangdaoyong\n * @LastEditTime: 2021-05-13 23:32:24\n * @Description: 测试文件\n */\n\n/**\n * 输出位置\n */\n\n(0,_js_printTest__WEBPACK_IMPORTED_MODULE_0__.testPrint)('测试文件'); // async function asyscTest(message) {\n//     const asyscTestPrint = await import(/* webpackChunkName: \"asyncTest\" */ 'test1/test2')\n//     asyscTestPrint(message)\n// }\n// asyscTest('异步测试')\n\n\n(0,_js_asyncTest__WEBPACK_IMPORTED_MODULE_1__.default)('测试');\n\n//# sourceURL=webpack://remove-unused-files-webpack-plugin/./test/index.js?");

/***/ }),

/***/ "./test/js/asyncTest.js":
/*!******************************!*\
  !*** ./test/js/asyncTest.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*\n * @Author: tangdaoyong\n * @Date: 2021-05-13 21:17:02\n * @LastEditors: tangdaoyong\n * @LastEditTime: 2021-05-13 21:17:41\n * @Description: 异步加载测试\n */\nvar asyscTestPrint = function asyscTestPrint(message) {\n  /**\n   * 打印输入\n   */\n  console.log(message);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (asyscTestPrint);\n\n//# sourceURL=webpack://remove-unused-files-webpack-plugin/./test/js/asyncTest.js?");

/***/ }),

/***/ "./test/js/printTest.js":
/*!******************************!*\
  !*** ./test/js/printTest.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"testPrint\": () => (/* binding */ testPrint),\n/* harmony export */   \"test\": () => (/* binding */ test)\n/* harmony export */ });\n/*\n * @Author: tangdaoyong\n * @Date: 2021-05-13 21:15:50\n * @LastEditors: tangdaoyong\n * @LastEditTime: 2021-05-13 21:16:13\n * @Description: file content\n */\nvar testPrint = function testPrint(message) {\n  /**\n   * 打印输入\n   */\n  console.log(message);\n};\n\nfunction test() {\n  console.dir({\n    will: be,\n    removed: \"true\"\n  });\n  console.log(\"except for this one!\");\n  /*NotClearConsole*/\n}\n\n\n\n//# sourceURL=webpack://remove-unused-files-webpack-plugin/./test/js/printTest.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./test/index.js");
/******/ 	
/******/ })()
;