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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//--------------------------------------------------------
//-- Export wrapper for browser build
//--------------------------------------------------------


/* eslint-disable no-restricted-globals,no-undef,no-process-env */
window["pinki"] = __webpack_require__(1).default;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _lib_vow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/**
 * Asynchronous libraries wrapper
 * @module pinki
 */





/** Main entry point */
class Pinki {

	/**
	 * Message
	 * @readonly
	 * @property {object} message
	 */
	get message() {
		return _lib_message__WEBPACK_IMPORTED_MODULE_0__["default"];
	}

	/**
	 * Vow
	 * @readonly
	 * @property {object} vow
	 */
	get vow() {
		return _lib_vow__WEBPACK_IMPORTED_MODULE_1__["default"];
	}

}


/* harmony default export */ __webpack_exports__["default"] = (new Pinki());


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * PubSubJS wrapper with goodies
 * @module pinki/message
 */

const PubSub = __webpack_require__(3);


//-- Private
const messages = [];

// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
const messageHasSubscribers = (topic, messageTopic) => {
	let curr     = messageTopic;
	let found    = curr === topic;
	let position = curr.lastIndexOf('.');

	while (!found && position !== -1) {
		curr = curr.substr(0, position);
		position = curr.lastIndexOf('.');
		found = curr === topic;
	}

	return found;
};






/** Message entry point */
class Message {

	/**
	 * Subscribe to a topic
	 * @param {string} topic - Topic id.
	 * @param {function} subscriber - The callback to execute.
	 * @param {object} [options] - Options
	 * @param {boolean} [options.executePrevious=true] - Execute previously published messages.
	 * @return {string} Unique token
	 */
	subscribe(topic, subscriber, { executePrevious = true } = {})   {
		if (executePrevious) {
			messages.forEach(({ topic: messageTopic, data: messageData }) => {
				if (messageHasSubscribers(topic, messageTopic)) {
					subscriber(messageTopic, messageData);
				}
			});
		}

		return PubSub.subscribe(topic, subscriber);
	}


	/**
	 * Publish a message
	 * @param {string} topic - Topic id.
	 * @param {*} [data] - The data.
	 * @return {boolean} Were they any subscribers already?
	 */
	publish(topic, data) {
		messages.push({ topic, data });

		return PubSub.publish(topic, data);
	}


	/**
	 * Unsubscribe
	 * @param {string|function} value - A token, function or topic to unsubscribe from
	 * @return {boolean} Were they any subscribers?
	 */
	unsubscribe(value) {
		return PubSub.unsubscribe(value);
	}


	/**
	 * Get all published messages
	 * @readonly
	 * @property {object[]} list
	 * @property {string} list[].topic - Topic id.
	 * @property {*} list[].data - Given data.
 	 */
	get list() {
		return messages;
	}

}


/* harmony default export */ __webpack_exports__["default"] = (new Message());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = window.PubSub;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Name-based Promises that can be referenced anytime
 * @module pinki/message
 */

const RSVP = __webpack_require__(5);


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






/** Vow entry point */
class Vow {

	/**
	 * Vows than have been registered.
	 * @readonly
	 * @property {string[]} list - List of vows.
 	 */
	get list() {
		return Object.keys(vows);
	}


	/**
	 * When a or all vows are fulfilled or broke
	 * @param {string|string[]} names - Vow name or array of vow names
	 * @return {promise} Vow's promise or Promise.all() of all vow's promises
	 */
	when(names) {
		if (typeof names === 'string') {
			return getDeferredVow(names).promise;

		} else if (Array.isArray(names)) {
			const promises = [];

			// Group all vows Promises
			names.forEach((vow) => {
				promises.push(getDeferredVow(vow).promise);
			});

			return RSVP.all(promises);
		}

		throw new TypeError('Argument must be a String or an Array');
	}


	/**
	 * Resolve the underlying Promise
	 * @param {string} name - Vow name
	 * @param {*} data - Data to resolve the underlying Promise with
	 */
	fulfill(name, data) {
		getDeferredVow(name).resolve(data);
	}

	/**
	 * Reject the underlying Promise
	 * @param {string} name - Vow name
	 * @param {string} error - Error message to reject the underlying Promise with
	 */
	break(name, error) {
		getDeferredVow(name).reject(error);
	}

}


/* harmony default export */ __webpack_exports__["default"] = (new Vow());


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = window.RSVP;

/***/ })
/******/ ]);