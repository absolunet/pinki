module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pinki", function() { return _index_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

//--------------------------------------------------------
//-- Wrapper for Node.js build
//--------------------------------------------------------




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _lib_vow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
//--------------------------------------------------------
//-- pinki
//--------------------------------------------------------





//-- Load vendor libriaries
const RSVP = __webpack_require__(5);  // eslint-disable-line no-undef






//-- Main
class pinki {


	//-- Promise
	static get Promise() {
		return RSVP.Promise;
	}


	//-- Message
	static get message() {
		return _lib_message_js__WEBPACK_IMPORTED_MODULE_0__["default"];
	}


	//-- Vow
	static get vow() {
		return _lib_vow_js__WEBPACK_IMPORTED_MODULE_1__["default"];
	}

}


//-- Publish
/* harmony default export */ __webpack_exports__["default"] = (pinki);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//--------------------------------------------------------
//-- Message
//--------------------------------------------------------

//-- Load vendor libriaries
const PubSub = __webpack_require__(3);  // eslint-disable-line no-undef


//-- Private
const messages = [];

// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
const messageHasSubscribers = (topic, msgTopic) => {
	let curr     = msgTopic;
	let found    = curr === topic;
	let position = curr.lastIndexOf('.');

	while (!found && position !== -1) {
		curr = curr.substr(0, position);
		position = curr.lastIndexOf('.');
		found = curr === topic;
	}

	return found;
};






//-- Main
class Message {

	//-- Subscribe to a topic
	static subscribe(topic, subscriber, { executePrevious = true } = {})   {
		if (executePrevious) {
			messages.forEach(({ topic:msgTopic, data:msgData }) => {
				if (messageHasSubscribers(topic, msgTopic)) {
					subscriber(msgTopic, msgData);
				}
			});
		}

		return PubSub.subscribe(topic, subscriber);
	}


	//-- Publish a message
	static publish(topic, data) {
		messages.push({ topic, data });

		return PubSub.publish(topic, data);
	}


	//-- Unsubscribe to all topic
	static get unsubscribe() {
		return PubSub.unsubscribe;
	}


	//-- Get all published messages
	static get list() {
		return messages;
	}

}


/* harmony default export */ __webpack_exports__["default"] = (Message);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("pubsub-js");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//--------------------------------------------------------
//-- Vow
//--------------------------------------------------------

//-- Load vendor libriaries
const RSVP = __webpack_require__(5);  // eslint-disable-line no-undef


//-- Private
const vows = {};


const getDeferredVow = (name) => {
	if (!(/^[a-z0-9.-]+$/i).test(name)) {
		throw new Error(`pinki: Invalid vow name '${name}'`);

	} else if (!vows[name]) {
		vows[name] = RSVP.defer();
	}

	return vows[name];
};







//-- Main
class Vow {

	//-- Get all registered vow names
	static get list() {
		return Object.keys(vows);
	}


	//-- When all vows are fulfilled or broke
	static when(...names) {
		const promises = [];

		// Group all vows Promises
		names.forEach((vow) => {
			promises.push(getDeferredVow(vow).promise);
		});

		return RSVP.all(promises);
	}


	//-- Fulfill a vow
	static fulfill(name, data) {
		getDeferredVow(name).resolve(data);
	}

	//-- Break a vow
	static break(name, error) {
		getDeferredVow(name).reject(error);
	}

}


/* harmony default export */ __webpack_exports__["default"] = (Vow);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("rsvp");

/***/ })
/******/ ]);