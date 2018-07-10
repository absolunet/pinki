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


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.pinki = _index2.default; // eslint-disable-line
//--------------------------------------------------------
//-- Wrapper for web build
//--------------------------------------------------------

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //--------------------------------------------------------
//-- pinki
//--------------------------------------------------------

var _message = __webpack_require__(2);

var _message2 = _interopRequireDefault(_message);

var _vow = __webpack_require__(4);

var _vow2 = _interopRequireDefault(_vow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//-- Load vendor libriaries
var RSVP = __webpack_require__(5); // eslint-disable-line no-undef


//-- Main

var pinki = function () {
	function pinki() {
		_classCallCheck(this, pinki);
	}

	_createClass(pinki, null, [{
		key: 'Promise',


		//-- Promise
		get: function get() {
			return RSVP.Promise;
		}

		//-- Message

	}, {
		key: 'message',
		get: function get() {
			return _message2.default;
		}

		//-- Vow

	}, {
		key: 'vow',
		get: function get() {
			return _vow2.default;
		}
	}]);

	return pinki;
}();

//-- Publish


exports.default = pinki;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//--------------------------------------------------------
//-- Message
//--------------------------------------------------------

//-- Load vendor libriaries
var PubSub = __webpack_require__(3); // eslint-disable-line no-undef


//-- Private
var messages = [];

// Logic copied from https://github.com/mroderick/PubSubJS/blob/master/src/pubsub.js
var messageHasSubscribers = function messageHasSubscribers(topic, msgTopic) {
	var curr = msgTopic;
	var found = curr === topic;
	var position = curr.lastIndexOf('.');

	while (!found && position !== -1) {
		curr = curr.substr(0, position);
		position = curr.lastIndexOf('.');
		found = curr === topic;
	}

	return found;
};

//-- Main

var Message = function () {
	function Message() {
		_classCallCheck(this, Message);
	}

	_createClass(Message, null, [{
		key: 'subscribe',


		//-- Subscribe to a topic
		value: function subscribe(topic, subscriber) {
			var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
			    _ref$executePrevious = _ref.executePrevious,
			    executePrevious = _ref$executePrevious === undefined ? true : _ref$executePrevious;

			if (executePrevious) {
				messages.forEach(function (_ref2) {
					var msgTopic = _ref2.topic,
					    msgData = _ref2.data;

					if (messageHasSubscribers(topic, msgTopic)) {
						subscriber(msgTopic, msgData);
					}
				});
			}

			return PubSub.subscribe(topic, subscriber);
		}

		//-- Publish a message

	}, {
		key: 'publish',
		value: function publish(topic, data) {
			messages.push({ topic: topic, data: data });

			return PubSub.publish(topic, data);
		}

		//-- Unsubscribe to all topic

	}, {
		key: 'unsubscribe',
		get: function get() {
			return PubSub.unsubscribe;
		}

		//-- Get all published messages

	}, {
		key: 'list',
		get: function get() {
			return messages;
		}
	}]);

	return Message;
}();

exports.default = Message;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = PubSub;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//--------------------------------------------------------
//-- Vow
//--------------------------------------------------------

//-- Load vendor libriaries
var RSVP = __webpack_require__(5); // eslint-disable-line no-undef


//-- Private
var vows = {};

var getDeferredVow = function getDeferredVow(name) {
	if (!/^[a-z0-9.-]+$/i.test(name)) {
		throw new Error('pinki: Invalid vow name \'' + name + '\'');
	} else if (!vows[name]) {
		vows[name] = RSVP.defer();
	}

	return vows[name];
};

//-- Main

var Vow = function () {
	function Vow() {
		_classCallCheck(this, Vow);
	}

	_createClass(Vow, null, [{
		key: 'when',


		//-- When all vows are fulfilled or broke
		value: function when() {
			var promises = [];

			// Group all vows Promises

			for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
				names[_key] = arguments[_key];
			}

			names.forEach(function (vow) {
				promises.push(getDeferredVow(vow).promise);
			});

			return RSVP.all(promises);
		}

		//-- Fulfill a vow

	}, {
		key: 'fulfill',
		value: function fulfill(name, data) {
			getDeferredVow(name).resolve(data);
		}

		//-- Break a vow

	}, {
		key: 'break',
		value: function _break(name, error) {
			getDeferredVow(name).reject(error);
		}
	}, {
		key: 'list',


		//-- Get all registered vow names
		get: function get() {
			return Object.keys(vows);
		}
	}]);

	return Vow;
}();

exports.default = Vow;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = RSVP;

/***/ })
/******/ ]);