"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CZeroWaste-master%5Cbackend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CZeroWaste-master%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CZeroWaste-master%5Cbackend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CZeroWaste-master%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_ZeroWaste_master_backend_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\ZeroWaste-master\\\\backend\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_ZeroWaste_master_backend_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDWmVyb1dhc3RlLW1hc3RlciU1Q2JhY2tlbmQlNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNaZXJvV2FzdGUtbWFzdGVyJTVDYmFja2VuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMkI7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lZHVjeWNsZS1iYWNrZW5kLz9hNDc2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXFplcm9XYXN0ZS1tYXN0ZXJcXFxcYmFja2VuZFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcWmVyb1dhc3RlLW1hc3RlclxcXFxiYWNrZW5kXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CZeroWaste-master%5Cbackend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CZeroWaste-master%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\n// NextAuth v4 App Router handler\n// Handles all /api/auth/* routes automatically\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxpQ0FBaUM7QUFDakMsK0NBQStDO0FBQy9DLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL2VkdWN5Y2xlLWJhY2tlbmQvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xuXG4vLyBOZXh0QXV0aCB2NCBBcHAgUm91dGVyIGhhbmRsZXJcbi8vIEhhbmRsZXMgYWxsIC9hcGkvYXV0aC8qIHJvdXRlcyBhdXRvbWF0aWNhbGx5XG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJhdXRoT3B0aW9ucyIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getAuthSession: () => (/* binding */ getAuthSession)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\n\n\n\n\nconst credentialsSchema = zod__WEBPACK_IMPORTED_MODULE_4__.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_4__.string().email(),\n    password: zod__WEBPACK_IMPORTED_MODULE_4__.string().min(6)\n});\n// ─── NextAuth v4 Config ──────────────────────────────────────────────────────\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    providers: [\n        // ── Email / Password ──────────────────────────────────────────────────\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                const parsed = credentialsSchema.safeParse(credentials);\n                if (!parsed.success) return null;\n                const { email, password } = parsed.data;\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email\n                    }\n                });\n                if (!user || !user.hashedPassword) return null;\n                const passwordMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(password, user.hashedPassword);\n                if (!passwordMatch) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    image: user.avatar,\n                    role: user.role,\n                    phoneNumber: user.phoneNumber\n                };\n            }\n        })\n    ],\n    callbacks: {\n        // Attach id, role, phoneNumber to the JWT token\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role ?? \"BUYER\";\n                token.phoneNumber = user.phoneNumber ?? null;\n            }\n            return token;\n        },\n        // Expose id, role, phoneNumber on the session\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.phoneNumber = token.phoneNumber;\n            }\n            return session;\n        },\n        async redirect ({ url, baseUrl }) {\n            // Allow redirecting back to our Vite frontend\n            if (url.startsWith(\"http://localhost:5173\")) return url;\n            if (url.startsWith(\"/\")) return new URL(url, baseUrl).toString();\n            return baseUrl;\n        }\n    },\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        },\n        callbackUrl: {\n            name: `next-auth.callback-url`,\n            options: {\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: false\n            }\n        },\n        csrfToken: {\n            name: \"next-auth.csrf-token\",\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    pages: {\n        signIn: \"http://localhost:5173/login\"\n    },\n    debug: false\n};\n/**\n * Convenience wrapper — call in route handlers to get typed session.\n */ function getAuthSession() {\n    return (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNOQyxRQUFRdkMsa0JBQXlCO1lBQ25DO1FBQ0Y7UUFDQXdDLGFBQWE7WUFDWHBDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztZQUM5QitCLFNBQVM7Z0JBQ1BFLFVBQVU7Z0JBQ1ZDLE1BQU07Z0JBQ05DLFFBQVE7WUFDVjtRQUNGO1FBQ0FFLFdBQVc7WUFDVHJDLE1BQU07WUFDTitCLFNBQVM7Z0JBQ1BDLFVBQVU7Z0JBQ1ZDLFVBQVU7Z0JBQ1ZDLE1BQU07Z0JBQ05DLFFBQVF2QyxrQkFBeUI7WUFDbkM7UUFDRjtJQUNGO0lBRUEwQyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUVBQyxPQUFPO0FBQ1QsRUFBRTtBQUVGOztDQUVDLEdBQ00sU0FBU0M7SUFDZCxPQUFPNUQsMkRBQWdCQSxDQUFDVztBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VkdWN5Y2xlLWJhY2tlbmQvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjtcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5cbi8vIOKUgOKUgOKUgCBUeXBlIGF1Z21lbnRhdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbmRlY2xhcmUgbW9kdWxlIFwibmV4dC1hdXRoXCIge1xuICBpbnRlcmZhY2UgU2Vzc2lvbiB7XG4gICAgdXNlcjoge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIHJvbGU6IHN0cmluZztcbiAgICAgIHBob25lTnVtYmVyPzogc3RyaW5nIHwgbnVsbDtcbiAgICAgIG5hbWU/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgZW1haWw/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgaW1hZ2U/OiBzdHJpbmcgfCBudWxsO1xuICAgIH07XG4gIH1cbiAgaW50ZXJmYWNlIFVzZXIge1xuICAgIHJvbGU/OiBzdHJpbmc7XG4gICAgcGhvbmVOdW1iZXI/OiBzdHJpbmcgfCBudWxsO1xuICB9XG59XG5kZWNsYXJlIG1vZHVsZSBcIm5leHQtYXV0aC9qd3RcIiB7XG4gIGludGVyZmFjZSBKV1Qge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgcm9sZTogc3RyaW5nO1xuICAgIHBob25lTnVtYmVyPzogc3RyaW5nIHwgbnVsbDtcbiAgfVxufVxuXG5jb25zdCBjcmVkZW50aWFsc1NjaGVtYSA9IHoub2JqZWN0KHtcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoKSxcbiAgcGFzc3dvcmQ6IHouc3RyaW5nKCkubWluKDYpLFxufSk7XG5cbi8vIOKUgOKUgOKUgCBOZXh0QXV0aCB2NCBDb25maWcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjogeyBzdHJhdGVneTogXCJqd3RcIiB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcblxuICBwcm92aWRlcnM6IFtcbiAgICAvLyDilIDilIAgRW1haWwgLyBQYXNzd29yZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gY3JlZGVudGlhbHNTY2hlbWEuc2FmZVBhcnNlKGNyZWRlbnRpYWxzKTtcbiAgICAgICAgaWYgKCFwYXJzZWQuc3VjY2VzcykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHBhcnNlZC5kYXRhO1xuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZW1haWwgfSB9KTtcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLmhhc2hlZFBhc3N3b3JkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICBjb25zdCBwYXNzd29yZE1hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXIuaGFzaGVkUGFzc3dvcmQpO1xuICAgICAgICBpZiAoIXBhc3N3b3JkTWF0Y2gpIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGltYWdlOiB1c2VyLmF2YXRhcixcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgcGhvbmVOdW1iZXI6IHVzZXIucGhvbmVOdW1iZXIsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuXG4gIGNhbGxiYWNrczoge1xuICAgIC8vIEF0dGFjaCBpZCwgcm9sZSwgcGhvbmVOdW1iZXIgdG8gdGhlIEpXVCB0b2tlblxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9ICh1c2VyLnJvbGUgPz8gXCJCVVlFUlwiKSBhcyBzdHJpbmc7XG4gICAgICAgIHRva2VuLnBob25lTnVtYmVyID0gdXNlci5waG9uZU51bWJlciA/PyBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgLy8gRXhwb3NlIGlkLCByb2xlLCBwaG9uZU51bWJlciBvbiB0aGUgc2Vzc2lvblxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4gJiYgc2Vzc2lvbi51c2VyKSB7XG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkO1xuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGU7XG4gICAgICAgIHNlc3Npb24udXNlci5waG9uZU51bWJlciA9IHRva2VuLnBob25lTnVtYmVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgICBhc3luYyByZWRpcmVjdCh7IHVybCwgYmFzZVVybCB9KSB7XG4gICAgICAvLyBBbGxvdyByZWRpcmVjdGluZyBiYWNrIHRvIG91ciBWaXRlIGZyb250ZW5kXG4gICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwOi8vbG9jYWxob3N0OjUxNzNcIikpIHJldHVybiB1cmw7XG4gICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCIvXCIpKSByZXR1cm4gbmV3IFVSTCh1cmwsIGJhc2VVcmwpLnRvU3RyaW5nKCk7XG4gICAgICByZXR1cm4gYmFzZVVybDtcbiAgICB9LFxuICB9LFxuXG4gIGNvb2tpZXM6IHtcbiAgICBzZXNzaW9uVG9rZW46IHtcbiAgICAgIG5hbWU6IGBuZXh0LWF1dGguc2Vzc2lvbi10b2tlbmAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzYW1lU2l0ZTogXCJsYXhcIixcbiAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgIHNlY3VyZTogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhbGxiYWNrVXJsOiB7XG4gICAgICBuYW1lOiBgbmV4dC1hdXRoLmNhbGxiYWNrLXVybGAsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjc3JmVG9rZW46IHtcbiAgICAgIG5hbWU6IFwibmV4dC1hdXRoLmNzcmYtdG9rZW5cIixcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICAgIHNhbWVTaXRlOiBcImxheFwiLFxuICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgc2VjdXJlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG5cbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiaHR0cDovL2xvY2FsaG9zdDo1MTczL2xvZ2luXCIsXG4gIH0sXG5cbiAgZGVidWc6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSB3cmFwcGVyIOKAlCBjYWxsIGluIHJvdXRlIGhhbmRsZXJzIHRvIGdldCB0eXBlZCBzZXNzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXV0aFNlc3Npb24oKSB7XG4gIHJldHVybiBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbn1cbiJdLCJuYW1lcyI6WyJnZXRTZXJ2ZXJTZXNzaW9uIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsInoiLCJjcmVkZW50aWFsc1NjaGVtYSIsIm9iamVjdCIsImVtYWlsIiwic3RyaW5nIiwicGFzc3dvcmQiLCJtaW4iLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJsYWJlbCIsInR5cGUiLCJhdXRob3JpemUiLCJwYXJzZWQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZGF0YSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJoYXNoZWRQYXNzd29yZCIsInBhc3N3b3JkTWF0Y2giLCJjb21wYXJlIiwiaWQiLCJpbWFnZSIsImF2YXRhciIsInJvbGUiLCJwaG9uZU51bWJlciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwicmVkaXJlY3QiLCJ1cmwiLCJiYXNlVXJsIiwic3RhcnRzV2l0aCIsIlVSTCIsInRvU3RyaW5nIiwiY29va2llcyIsInNlc3Npb25Ub2tlbiIsIm9wdGlvbnMiLCJodHRwT25seSIsInNhbWVTaXRlIiwicGF0aCIsInNlY3VyZSIsImNhbGxiYWNrVXJsIiwiY3NyZlRva2VuIiwicGFnZXMiLCJzaWduSW4iLCJkZWJ1ZyIsImdldEF1dGhTZXNzaW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\n// Prevent multiple Prisma client instances during hot-reload in development\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsNEVBQTRFO0FBQzVFLE1BQU1DLGtCQUFrQkM7QUFJakIsTUFBTUMsU0FDWEYsZ0JBQWdCRSxNQUFNLElBQ3RCLElBQUlILHdEQUFZQSxDQUFDO0lBQ2ZJLEtBQUtDLEtBQXNDLEdBQUc7UUFBQztRQUFTO1FBQVM7S0FBTyxHQUFHLENBQVM7QUFDdEYsR0FBRztBQUVMLElBQUlBLElBQXFDLEVBQUU7SUFDekNKLGdCQUFnQkUsTUFBTSxHQUFHQTtBQUMzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VkdWN5Y2xlLWJhY2tlbmQvLi9zcmMvbGliL3ByaXNtYS50cz8wMWQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xuXG4vLyBQcmV2ZW50IG11bHRpcGxlIFByaXNtYSBjbGllbnQgaW5zdGFuY2VzIGR1cmluZyBob3QtcmVsb2FkIGluIGRldmVsb3BtZW50XG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IFtcInF1ZXJ5XCIsIFwiZXJyb3JcIiwgXCJ3YXJuXCJdIDogW1wiZXJyb3JcIl0sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWE7XG59XG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/uuid","vendor-chunks/@panva","vendor-chunks/zod","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CZeroWaste-master%5Cbackend%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CZeroWaste-master%5Cbackend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();